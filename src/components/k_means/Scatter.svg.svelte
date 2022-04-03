<script>
  // TODO: Transitions
  import { getContext } from "svelte";
  import { slide, scale } from "svelte/transition";

  const { data, xGet, yGet, xScale, yScale } = getContext("LayerCake");

  export let r = 4;
  export let fill = "#ccc";
  export let stroke = "#000";
  export let strokeWidth = 0;
</script>

<g>
  {#each $data as d (d)}
    {@const cx = $xGet(d)}
    {@const cy = $yGet(d)}
    <circle
      in:scale={{ duration: 2000 }}
      {cx}
      {cy}
      {r}
      {fill}
      {stroke}
      stroke-width={strokeWidth}
    />
  {/each}
</g>
