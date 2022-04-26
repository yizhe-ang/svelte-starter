<script>
  import { getContext } from "svelte";
  import { Delaunay, schemeSet3, schemePastel1, ascending } from "d3";
  import { clusterColors } from "$stores/misc";
  import { fade, scale, draw } from "svelte/transition";
  import { cubicOut, cubicIn, backOut } from "svelte/easing";
  import { spring } from "svelte/motion";
  import uid from "$utils/uid";
  import Line from "$components/k_means/Line.svelte";

  const { scrollyIndex } = getContext("Scrolly");
  const { data } = getContext("KMeans");
  const { width, height, xScale, yScale, xGet, yGet } = getContext("LayerCake");

  export let centroids;
  export let clusterIds;

  // The positions of the centroids are springed
  const centroidsScaled = spring(undefined);
  $: $centroidsScaled = centroids.map((d) => [$xGet(d), $yGet(d)]);

  // Compute data
  $: centroidData = computeData($centroidsScaled);
  function computeData(centroidsScaled) {
    // Compute voronoi here
    const voronoi = Delaunay.from(centroidsScaled).voronoi([0, 0, $width, $height]);

    return centroidsScaled.map((c, i) => ({
      x: c[0],
      y: c[1],
      d: voronoi.renderCell(i),
      id: uid("cell"),
      clusterId: centroids[i].clusterId
    }));
  }

  $: idToCentroid = new Map(centroids.map((d) => [d.clusterId, d]));

  console.log($data);
</script>

<!-- Clip paths -->
<defs>
  {#each centroidData as d (d.clusterId)}
    <clipPath id={d.id.id}>
      <path d={d.d} />
    </clipPath>
  {/each}
</defs>

<!-- Clipped centroids -->
<!-- Using the voronoi cells as the clip path -->
{#if ($scrollyIndex >= 3 && $scrollyIndex <= 3) || ($scrollyIndex >= 5 && $scrollyIndex <= 5)}
  {#each centroidData as d, i (d.clusterId)}
    <g clip-path={d.id}>
      <circle
        in:scale={{
          duration: $scrollyIndex === 5 ? 2000 : 500,
          easing: cubicOut,
          delay: $scrollyIndex === 5 ? 1000 : 0,
          opacity: 1
        }}
        out:scale={{
          duration: $scrollyIndex === 5 ? 800 : 350,
          easing: cubicIn
        }}
        class="centroid-overlay"
        fill={clusterColors[d.clusterId]}
        r={$scrollyIndex === 5 ? $width : 120}
        style:transform={`translate(${d.x}px, ${d.y}px)`}
      />
    </g>
  {/each}
{/if}

<!-- FIXME: Should I leave the path stroke in? -->
<!-- So that changes in the boundary would be more obvious -->
{#if $scrollyIndex >= 5 && $scrollyIndex <= 5}
  {#each centroidData as d, i (d.clusterId)}
    <path
      in:draw={{ duration: 1500 }}
      out:fade={{ duration: 350 }}
      class="voronoi-cell"
      d={d.d}
      fill-opacity={0}
      stroke={clusterColors[d.clusterId]}
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
  {/each}
{/if}

<!-- Lines from data point to centroid -->
<!-- TODO: Tie the line to a spring -->
{#if $scrollyIndex >= 10}
  {#each $data as d, i (d)}
    {@const c = idToCentroid.get(clusterIds[i])}
    <Line data={[d, c]} />
  {/each}
{/if}

<!-- Interactive centroids -->
<!-- TODO: draggable -->
{#if $scrollyIndex >= 8 && $scrollyIndex <= 11}
  {#each centroidData as d, i (d.clusterId)}
    <circle
      in:scale={{
        duration: 500,
        easing: backOut,
        delay: $scrollyIndex === 8 ? 400 : 0
      }}
      out:scale={{
        duration: 350,
        easing: cubicIn
      }}
      class="centroid"
      fill={clusterColors[d.clusterId]}
      style:transform={`translate(${d.x}px, ${d.y}px)`}
    />
  {/each}
{/if}

<style>
  .centroid-overlay {
    transform-box: fill-box;
    transform-origin: center;
    pointer-events: none;

    fill-opacity: 0.25;
  }

  .centroid {
    transform-box: fill-box;
    transform-origin: center;
    pointer-events: auto;

    r: 15;
  }
  .voronoi-cell {
    stroke-width: 2;
    /* fill-opacity: 0.25; */

    pointer-events: none;
    transition: fill-opacity 500ms, stroke-opacity 500ms;
  }
</style>
