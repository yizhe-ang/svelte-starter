<script>
  import { drag, select } from "d3";
  import { clamp } from "$utils/helpers.js";
  import { spring } from "svelte/motion";
  import { getContext } from "svelte";
  import { slide, scale, fade } from "svelte/transition";
  import { backOut, backIn, cubicIn } from "svelte/easing";

  const { width, height, xGet, yGet, xScale, yScale } = getContext("LayerCake");
  const { data } = getContext("KMeans");

  export let d;

  // Every circle has its own spring store as its state
  // TODO: Adjust the spring parameters
  const position = spring(undefined);
  // const position = spring([0, 0]);
  $: $position = [$xGet(d), $yGet(d)];

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
</script>

<circle
  in:scale={{ duration: 500, easing: backOut }}
  out:scale={{ duration: 350, easing: cubicIn }}
  on:click={() => {
    // Remove selected data point
    data.update((s) => s.filter((datum) => !Object.is(datum, d)));
  }}
  on:mouseover={() => console.log(d)}
  use:draggable={d}
  style:transform={`translate(${$position[0]}px, ${$position[1]}px)`}
/>

<style>
  circle {
    transform-box: fill-box;
    transform-origin: center;
    pointer-events: auto;

    r: 5;
    fill: #ccc;
    fill-opacity: 0.5;
    stroke: #000;
    stroke-width: 1;
    stroke-opacity: 0.3;
  }
</style>
