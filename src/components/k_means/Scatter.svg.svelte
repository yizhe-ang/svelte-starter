<script>
  import { getContext } from "svelte";

  const { xGet, yGet, xScale, yScale } = getContext("LayerCake");

  export let data;
  export let r = 10;
  export let fill = "black";
  export let stroke = "#000";
  export let strokeWidth = 0;
</script>

<g>
  {#each data as d}
    {@const cx = $xGet(d)}
    {@const cy = $yGet(d)}
    <circle
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
    pointer-events: none;
  }
</style>
