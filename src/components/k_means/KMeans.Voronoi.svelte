<script>
  import { getContext } from "svelte";
  import { Delaunay, schemeSet3, schemePastel1, ascending } from "d3";
  import { fade, scale, draw } from "svelte/transition";
  import { cubicOut, cubicIn } from "svelte/easing";
  import { spring } from "svelte/motion";
  import uid from "$utils/uid";

  const { scrollyIndex } = getContext("Scrolly");
  const { width, height, xGet, yGet } = getContext("LayerCake");

  export let centroids;

  // let introEnded = false;

  const centroidsScaled = spring(undefined);
  const colorScheme = schemePastel1;

  // TODO: Sort the centroids so that the colors are somewhat consistent?
  // Project the points onto 1d plane
  // Assign each color to a specific quadrant / area?
  $: $centroidsScaled = centroids
    .map((d) => [$xGet(d), $yGet(d)])
    .sort((a, b) => ascending(a[0], b[0]));

  // Compute data
  $: data = computeData($centroidsScaled);
  function computeData(centroidsScaled) {
    // Compute voronoi here
    const voronoi = Delaunay.from(centroidsScaled).voronoi([0, 0, $width, $height]);

    return centroidsScaled.map((c, i) => ({
      c,
      d: voronoi.renderCell(i),
      id: uid("cell")
    }));
  }
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
  {#if ($scrollyIndex >= 3 && $scrollyIndex <= 3) || ($scrollyIndex >= 5 && $scrollyIndex <= 5)}
    <g clip-path={d.id}>
      <circle
        in:scale={{
          duration: $scrollyIndex === 5 ? 2000 : 500,
          easing: cubicOut,
          delay: $scrollyIndex === 5 ? 1000 : 0
        }}
        out:scale={{
          duration: $scrollyIndex === 5 ? 800 : 350,
          easing: cubicIn
        }}
        class="centroid"
        fill={colorScheme[i]}
        r={$scrollyIndex === 5 ? $width : 120}
        style:transform={`translate(${d.c[0]}px, ${d.c[1]}px)`}
      />
    </g>
  {/if}

  <!-- FIXME: Should I leave the path stroke in? -->
  <!-- So that changes in the boundary would be more obvious -->
  {#if $scrollyIndex >= 5 && $scrollyIndex <= 5}
    <path
      in:draw={{ duration: 1500 }}
      out:fade={{ duration: 350 }}
      class="voronoi-cell"
      d={d.d}
      fill-opacity={0}
      stroke={colorScheme[i]}
    />
    <!-- <path
      in:draw={{ duration: 1500 }}
      out:fade
      on:introend={() => (introEnded = true)}
      on:outroend={() => (introEnded = false)}
      class="voronoi-cell"
      d={d.d}
      fill={colorScheme[i]}
      fill-opacity={introEnded ? 0 : 0}
      stroke={colorScheme[i]}
      stroke-opacity={introEnded ? 1 : 1}
    /> -->
  {/if}
{/each}

<style>
  .centroid {
    transform-box: fill-box;
    transform-origin: center;
    pointer-events: none;

    fill-opacity: 0.25;
  }

  .voronoi-cell {
    stroke-width: 2;
    /* fill-opacity: 0.25; */

    pointer-events: none;
    transition: fill-opacity 500ms, stroke-opacity 500ms;
  }
</style>
