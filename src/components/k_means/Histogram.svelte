<script>
  import { select, brushX, histogram, scaleLinear, extent, area, curveBasis } from "d3";
  import { getContext } from "svelte";

  const { width, height, xScale, yScale, xGet, yGet } = getContext("LayerCake");

  export let data = [0, 0];
  export let type = "x";
  export let inset;
  export let brushExtent = [0, 1];

  const accessor = type === "x" ? (d) => d.x : type === "y" ? (d) => d.y : null;
  $: histogramXScale = $xScale;

  $: dataExtents = extent($data, accessor);
  $: dataExtentsScaled = dataExtents.map(histogramXScale);

  $: console.log(dataExtentsScaled);

  const histogramHeight = 70;
  const thresholds = 15;

  $: dataExtent = extent(data, accessor);
  $: dataExtentScaled = dataExtent.map(histogramXScale);

  // Draw histogram
  // FIXME: Should I use KDE instead?
  $: histogramGenerator = histogram()
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
  const brushResizePath = function (d) {
    var e = +(d.type == "e"),
      x = e ? 1 : -1,
      y = height / 2;
    return (
      "M" +
      0.5 * x +
      "," +
      y +
      "A6,6 0 0 " +
      e +
      " " +
      6.5 * x +
      "," +
      (y + 6) +
      "V" +
      (2 * y - 6) +
      "A6,6 0 0 " +
      e +
      " " +
      0.5 * x +
      "," +
      2 * y +
      "Z" +
      "M" +
      2.5 * x +
      "," +
      (y + 8) +
      "V" +
      (2 * y - 8) +
      "M" +
      4.5 * x +
      "," +
      (y + 8) +
      "V" +
      (2 * y - 8)
    );
  };

  $: brush = brushX()
    .extent([
      [0, 0],
      [$height, histogramHeight]
    ])
    .on("start brush end", ({ sourceEvent, selection }) => {
      // If brush.move called programmatically, don't update
      if (!sourceEvent) {
        return;
      } else {
        brushed({ selection });
      }
    });

  function brushed({ selection }) {
    const extents = selection.map($xScale.invert);
    extents[0] += inset;
    extents[1] -= inset;

    brushExtent = extents;

    // FIXME: Update dataset on brushed
  }

  function brushable(node, move) {
    const selection = select(node)
      .call(brush)
      // FIXME: Have to update as dataset changes
      // .call(brush.move, [0, $height])
      .call(brush.move, move);

    // Remove overlay pointer-events
    selection.select(".overlay").attr("pointer-events", "none");

    // Add resize handles
    // const bottomHeight = 10;

    // selection
    //   .selectAll(".v-brush-handle")
    //   .data([{ type: "w" }, { type: "e" }])
    //   .enter()
    //   .append("path")
    //   .classed("v-brush-handle", true)
    //   .attr("cursor", "ew-resize")
    //   .attr("d", (d) => {
    //     const e = +(d.type === "e");
    //     const h = bottomHeight;
    //     const x = e ? 1 : -1;
    //     const y = (bottomHeight - h) / 2;
    //     return [
    //       `M ${0.5 * x} ${y}`,
    //       `A 6 6 0 0 ${e} ${6.5 * x} ${y + 6}`,
    //       `V ${y + h - 6}`,
    //       `A 6 6 0 0 ${e} ${0.5 * x} ${y + h}`,
    //       "Z",
    //       `M ${2.5 * x} ${y + 8}`,
    //       `V ${y + h - 8}`,
    //       `M ${4.5 * x} ${y + 8}`,
    //       `V ${y + h - 8}`
    //     ].join(" ");
    //   });

    return {
      update: (move) => {
        selection.call(brush.move, move);
      }
    };
  }
</script>

<g class="wrapper" style:transform transform-origin={transformOrigin}>
  <path {d} />
  <g use:brushable={dataExtentScaled} class="brush" />
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
