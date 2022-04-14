<script>
  import { getContext } from "svelte";
  import { Delaunay, schemeSet3, schemePastel1, ascending } from "d3";
  import { scale } from "svelte/transition";
  import { cubicOut, cubicIn } from "svelte/easing";
  import uid from "$utils/uid";

  const { scrollyIndex } = getContext("Scrolly")
  const { width, height, xGet, yGet } = getContext("LayerCake");

  export let centroids;

  const colorScheme = schemePastel1;

  // TODO: Sort the centroids so that the colors are somewhat consistent?
  // Project the points onto 1d plane
  // Assign each color to a specific quadrant / area?
  $: centroidsScaled = centroids.map((d) => [$xGet(d), $yGet(d)])
    .sort((a, b) => ascending(a[0], b[0]))
  $: voronoi = Delaunay.from(centroidsScaled).voronoi([0, 0, $width, $height]);

  $: data = centroidsScaled.map((c, i) => ({
    c,
    d: voronoi.renderCell(i),
    id: uid("cell")
  }));
</script>

<!-- Clip paths -->
<defs>
  {#each data as d}
    <clipPath id={d.id.id}>
      <path d={d.d} />
    </clipPath>
  {/each}
</defs>

{#each data as d, i}
  <!-- Clipped centroids -->
  <!-- Using the voronoi cells as the clip path -->
  <!-- TODO: Can this just replace the cluster centroids? -->
  {#if $scrollyIndex >= 3}
    <g clip-path={d.id}>
      <circle
        in:scale={{ duration: 500, easing: cubicOut }}
        out:scale={{ duration: 350, easing: cubicIn }}
        class="centroid"
        fill={colorScheme[i]}
        style:transform={`translate(${d.c[0]}px, ${d.c[1]}px)`}
      />
    </g>
  {/if}

  <!-- FIXME: Just render the entire voronoi as a single path? -->
  <!-- Should each voronoi cell have a spring state too? -->
  {#if false}
    <path class="voronoi-cell" d={d.d} fill={colorScheme[i]} />
  {/if}
{/each}

<style>
  .centroid {
    transform-box: fill-box;
    transform-origin: center;
    pointer-events: none;

    r: 120;
    fill-opacity: 0.5;
  }

  .voronoi-cell {
    pointer-events: none;
    stroke: 1;
    fill-opacity: 0.4;
  }
</style>
