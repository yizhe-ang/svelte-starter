<script>
  // TODO: Transitions
  // TODO: Use spring motion for drag events? Have to use svelte-motion?
  // Or make every single data point a spring?
  // FIXME: Should I switch to canvas?
  import { drag, select } from "d3";
  import { spring } from "svelte/motion";
  import { clamp } from "$utils/helpers.js";
  import { getContext } from "svelte";
  import { slide, scale, fade } from "svelte/transition";
  import { backOut, backIn, cubicIn } from "svelte/easing";

  const { width, height, xGet, yGet, x, y, xScale, yScale } = getContext("LayerCake");
  const { data } = getContext("KMeans");

  export let r = 5;
  export let fill = "#ccc";
  export let stroke = "#000";
  export let strokeWidth = 0;

  // HACK: Apply spring physics
  // const dataSpringed = spring(undefined)
  // $: $dataSpringed = $data
  // $: console.log($data.length)
  // $: console.log($dataSpringed.length)

  // To apply drag behavior as an action
  function draggable(node, d) {
    const dragBehavior = drag().on("drag", (e) => {
      // Bring dragged element to the front
      select(node).raise();

      // Modify data point, while clamping to valid bounds
      d[0] = $xScale.invert(clamp(e.x, 0, $width));
      d[1] = $yScale.invert(clamp(e.y, 0, $height));

      // Activate reactivity
      $data = $data;
    });

    select(node).call(dragBehavior);
  }

  $: console.log($data.map((d) => [$x(d), $y(d)]));
  $: console.log($xScale.domain());
</script>

<g>
  {#each $data as d (d)}
    {@const cx = $xGet(d)}
    {@const cy = $yGet(d)}
    <circle
      in:scale={{ duration: 500, easing: backOut }}
      out:scale={{ duration: 350, easing: cubicIn }}
      on:click={(_) => {
        // Remove selected data point
        data.update((s) => s.filter((datum) => !Object.is(datum, d)));
      }}
      use:draggable={d}
      style:transform={`translate(${cx}px, ${cy}px)`}
      {r}
      {fill}
      {stroke}
      stroke-width={strokeWidth}
    />
  {/each}
</g>

<style>
  circle {
    /* To make transform transitions anchored on the center of the element */
    transform-box: fill-box;
    transform-origin: center;

    pointer-events: auto;

    fill-opacity: 0.5;
    stroke-opacity: 0.3;
  }
</style>
