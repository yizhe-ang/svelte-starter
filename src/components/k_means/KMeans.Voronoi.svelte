<script>
  import { getContext, createEventDispatcher } from "svelte";
  import { Delaunay } from "d3";

  const { width, height, xGet, yGet } = getContext("LayerCake");

  export let stroke = undefined;
  export let centroids;

  $: centroidsScaled = centroids.map((d) => [$xGet(d), $yGet(d)]);
  $: voronoi = Delaunay.from(centroidsScaled).voronoi([0, 0, $width, $height]);
</script>

{#each centroids as point, i}
  <!-- FIXME: Just render the entire voronoi as a single path? -->
  <!-- TODO: Give different colors to each cell -->
  <path style:stroke class="voronoi-cell" d={voronoi.renderCell(i)} />
{/each}

<style>
  .voronoi-cell {
    fill: none;
    pointer-events: none;
  }
</style>
