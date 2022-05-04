<script>
  import { select, brushX, histogram, scaleLinear, extent, area, curveBasis } from "d3";
  import { getContext } from "svelte";

  // FIXME: Should not update in response to brush events
  // const { data } = getContext("KMeans");
  const { width, height, xScale, yScale, xGet, yGet } = getContext("LayerCake");

  export let data = [0];
  export let type = "x";
  export let inset;
  export let brushExtent = [0, 1];

  $: console.log(data);

  const accessor = type === "x" ? (d) => d.x : type === "y" ? (d) => d.y : null;
  // $: histogramXScale = type === "x" ? $xScale : type === "y" ? $yScale : null;
  $: histogramXScale = $xScale;

  const histogramHeight = 70;
  const thresholds = 15;

  $: dataExtent = extent(data, accessor);
  $: dataExtentScaled = dataExtent.map(histogramXScale);

  // Draw histogram
  // FIXME: Should I use KDE instead?
  $: histogramGenerator = histogram()
    // FIXME: Should I use a different scale / domain?
    .domain(histogramXScale.domain())
    .value(accessor)
    .thresholds(thresholds);

  $: histogramBins = histogramGenerator(data);

  $: histogramYScale = scaleLinear()
    .domain(extent(histogramBins, (d) => d.length))
    .range([histogramHeight, 0]);

  $: lineGenerator = area()
    .x((d) => histogramXScale((d.x0 + d.x1) / 2))
    .y0(histogramHeight)
    .y1((d) => histogramYScale(d.length))
    .curve(curveBasis);

  $: d = lineGenerator(histogramBins);

  $: transform =
    type === "x"
      ? `translate(${0}px, ${$height - histogramHeight - 6}px) scale(1, -1)`
      : type === "y"
      ? `translate(${-$width}px, ${-histogramHeight - 7}px) rotate(-90deg) scale(1, 1)`
      : null;

  $: transformOrigin = type === "x" ? "bottom" : type === "y" ? "bottom right" : null;

  // Init brush
  $: brush = brushX()
    .extent([
      [0, 0],
      [$height, histogramHeight]
    ])
    .on("start brush end", brushed);

  function brushed({ selection }) {
    const extents = selection.map($xScale.invert);
    extents[0] += inset;
    extents[1] -= inset;

    brushExtent = extents;

    // FIXME: Update dataset on brushed
  }

  function brushable(node) {
    // const extents = extent($data, accessor).map($xScale.invert)

    select(node)
      .call(brush)
      // FIXME: Have to update as dataset changes
      // .call(brush.move, [0, $height])
      .call(brush.move, dataExtentScaled)
      // Remove overlay pointer-events
      .select(".overlay")
      .attr("pointer-events", "none");
  }
</script>

<g class="wrapper" style:transform transform-origin={transformOrigin}>
  <path {d} />
  <g use:brushable class="brush" />
</g>

<style>
  .wrapper {
    transform-box: fill-box;
  }

  path {
    /* FIXME: Should this be springed? */
    transition: d 200ms;
    fill: lightgrey;
  }

  .brush .overlay {
    pointer-events: none;
  }
</style>
