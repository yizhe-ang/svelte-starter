<script>
  import { getContext } from "svelte";
  import { least, select, drag, Delaunay, schemeSet3, schemePastel1, ascending } from "d3";
  import { clamp } from "$utils/helpers.js";
  import { clusterColors } from "$stores/misc";
  import { fade, scale, draw } from "svelte/transition";
  import { cubicOut, cubicIn, backOut } from "svelte/easing";
  import { spring } from "svelte/motion";
  import uid from "$utils/uid";
  import VoronoiLine from "$components/k_means/Voronoi.Line.svelte";

  const { scrollyIndex } = getContext("Scrolly");
  const { data, centroids, clusterIds } = getContext("KMeans");
  const { width, height, xScale, yScale, xGet, yGet } = getContext("LayerCake");

  const key = (d) => `${$centroids.length}-${d.clusterId}`;

  // FIXME: There should be a spring for each centroid?
  // Or define a new spring whenever number of cluster changes
  let centroidsSpringed = spring(undefined);
  $: updateSpring($centroids);
  function updateSpring(centroids) {
    if ($centroidsSpringed && centroids.length !== $centroidsSpringed.length) {
      centroidsSpringed = spring(centroids);
      // $centroidsSpringed = $centroidsSpringed;
    } else {
      $centroidsSpringed = centroids;
    }
  }

  // Compute data
  $: centroidData = computeData($centroidsSpringed);
  function computeData(centroidsSpringed) {
    // Compute voronoi here
    const voronoi = Delaunay.from(centroidsSpringed.map((d) => [$xGet(d), $yGet(d)])).voronoi([
      0,
      0,
      $width,
      $height
    ]);

    return centroidsSpringed.map((c, i) => ({
      ...c,
      // x: $xGet(c.x),
      // y: $yGet(c.y),
      d: voronoi.renderCell(i),
      id: uid("cell")
    }));
  }

  // $: idToCentroid = new Map(centroidData.map((d) => [d.clusterId, d]));

  // TODO: Limit the cases where this is run, i.e. only when have to draw lines
  // Find the assigned centroid for each data point
  // $: assignments = $data.map((d) => closest(d, $centroids));
  // $: if (assignments) {
  //   console.log("run");
  // }

  // To apply drag behavior as an action
  function draggable(node, i) {
    const dragBehavior = drag().on("drag", (e) => {
      // Bring dragged element to the front
      // select(node).raise();

      // Modify data point, while clamping to valid bounds
      $centroids[i].x = $xScale.invert(clamp(e.x, 0, $width));
      $centroids[i].y = $yScale.invert(clamp(e.y, 0, $height));

      // Activate reactivity
      // $centroids = $centroids;
    });

    select(node).call(dragBehavior);
  }

  function closest(d, arr) {
    return least(arr, (a) => Math.hypot(a.x - d.x, a.y - d.y));
  }
</script>

<!-- Clip paths -->
<defs>
  {#each centroidData as d, i (key(d))}
    <clipPath id={d.id.id}>
      <path d={d.d} />
    </clipPath>
  {/each}
</defs>

<!-- Clipped centroids -->
<!-- Using the voronoi cells as the clip path -->
{#if ($scrollyIndex >= 3 && $scrollyIndex <= 3) || ($scrollyIndex >= 5 && $scrollyIndex <= 5)}
  {#each centroidData as d, i (key(d))}
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
        style:transform={`translate(${$xGet(d)}px, ${$yGet(d)}px)`}
      />
    </g>
  {/each}
{/if}

<!-- FIXME: Should I leave the path stroke in? -->
<!-- So that changes in the boundary would be more obvious -->
{#if $scrollyIndex >= 5 && $scrollyIndex <= 5}
  {#each centroidData as d, i (key(d))}
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
{#if $scrollyIndex >= 11 && $scrollyIndex <= 11}
  <!-- {#each $data as d, i (d)}
    {@const c = idToCentroid.get($clusterIds[i])}
    <Line data={[d, c]} />
  {/each} -->

  <!-- {#each $data as d, i (`${i}-${assignments[i].clusterId}`)}
    {@const c = closest(d, $centroidsSpringed)}
    {@const c = assignments[i]}
    <VoronoiLine data={[d, c]} stroke={clusterColors[c.clusterId]} />
  {/each} -->

  {#each $data as d, i (i)}
    {@const c = closest(d, $centroidsSpringed)}
    <VoronoiLine data={[d, c]} stroke={clusterColors[c.clusterId]} />
  {/each}
{/if}

<!-- Interactive centroids -->
{#if $scrollyIndex >= 8 && $scrollyIndex <= 11}
  {#each centroidData as d, i (key(d))}
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
      use:draggable={i}
      class="centroid"
      fill={clusterColors[d.clusterId]}
      style:transform={`translate(${$xGet(d)}px, ${$yGet(d)}px)`}
      style:pointer-events={"auto"}
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

    r: 15;
  }
  .voronoi-cell {
    stroke-width: 2;
    /* fill-opacity: 0.25; */

    pointer-events: none;
    transition: fill-opacity 500ms, stroke-opacity 500ms;
  }
</style>
