<script>
  import { getContext } from "svelte";
  import { leastIndex, select, drag, Delaunay, schemeSet3, schemePastel1, ascending } from "d3";
  import { clamp } from "$utils/helpers.js";
  import { clusterColors } from "$stores/misc";
  import { fade, scale, draw } from "svelte/transition";
  import { cubicOut, cubicIn, backOut } from "svelte/easing";
  import { spring } from "svelte/motion";
  import uid from "$utils/uid";
  import VoronoiLine from "$components/k_means/Voronoi.Line.svelte";

  const { scrollyIndex } = getContext("Scrolly");
  const { data, centroids, centroidsHistory, clusterAssignments } = getContext("KMeans");
  const { width, height, xScale, yScale, xGet, yGet } = getContext("LayerCake");

  // const key = (d) => `${$centroids.length}-${d.clusterId}`;

  // FIXME: There should be a spring for each centroid?
  // Or define a new spring whenever number of cluster changes
  // NOTE: Has to be sorted because the spring value is fixed
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

  // FIXME: Keep history of centroids instead?
  // And then update centroidsSpring
  // const assignmentsHistory = [undefined, $clusterAssignments]
  // $: updateAssignmentHistory($clusterAssignments)
  // function updateAssignmentHistory(clusterAssignments) {
  //   assignmentsHistory[0] = assignmentsHistory[1]
  //   assignmentsHistory[1] = clusterAssignments
  // }
  // let currentAssignments = assignmentsHistory[1]

  // Compute cluster assignments
  let keepPrev = false;
  let assignmentsBuffer = [undefined, undefined];
  $: assignments = updateAssignments($centroidsSpringed, keepPrev);
  function updateAssignments(centroidsSpringed, keepPrev) {
    // Change the positions of the centroids
    // But keep the assignments the same
    if (keepPrev) {
      return assignments.map(({ c, i }) => ({
        c: centroidsSpringed[i],
        i
      }));
    } else {
      return $data.map((d) => closest(d, centroidsSpringed));
    }
  }

  // TODO: Also have to keep cache of index assignments?
  // update centroidsSpring
  // -> update assignments, which contain centroid positions and index assignments

  // Manual updating of centroids
  $: if ($scrollyIndex >= 12 && $scrollyIndex <= 14) {
    updateSpring($centroidsHistory[0]);
  } else if ($scrollyIndex === 15) {
    keepPrev = true;
    updateSpring($centroidsHistory[1]);
  } else if ($scrollyIndex === 16) {
    keepPrev = false;
    updateSpring($centroidsHistory[1]);
  }

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

  // FIXME: Cluster assignments must be tied to spring
  function closest(d, arr) {
    const i = leastIndex(arr, (a) => Math.hypot(a.x - d.x, a.y - d.y));

    return { c: arr[i], i };
  }
</script>

<!-- Clip paths -->
<defs>
  {#each centroidData as d, i (`${i}-${$centroids.length}`)}
    <clipPath id={d.id.id}>
      <path d={d.d} />
    </clipPath>
  {/each}
</defs>

<!-- Clipped centroids -->
<!-- Using the voronoi cells as the clip path -->
{#if ($scrollyIndex >= 3 && $scrollyIndex <= 3) || ($scrollyIndex >= 5 && $scrollyIndex <= 5)}
  {#each centroidData as d, i (`${i}-${$centroids.length}`)}
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
        fill={clusterColors[i]}
        r={$scrollyIndex === 5 ? $width : 120}
        style:transform={`translate(${$xGet(d)}px, ${$yGet(d)}px)`}
      />
    </g>
  {/each}
{/if}

<!-- FIXME: Should I leave the path stroke in? -->
<!-- So that changes in the boundary would be more obvious -->
{#if $scrollyIndex >= 5 && $scrollyIndex <= 5}
  {#each centroidData as d, i (`${i}-${$centroids.length}`)}
    <path
      in:draw={{ duration: 1500 }}
      out:fade={{ duration: 350 }}
      class="voronoi-cell"
      d={d.d}
      fill-opacity={0}
      stroke={clusterColors[i]}
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
{#if ($scrollyIndex >= 11 && $scrollyIndex <= 11) || $scrollyIndex >= 14}
  {#each $data as d, i (i)}
    <!-- {@const { c, i: cI } = closest(d, $centroidsSpringed)} -->
    {@const { c, i: cI } = assignments[i]}
    <VoronoiLine data={[d, c]} stroke={clusterColors[cI]} />
  {/each}
{/if}

<!-- Interactive centroids -->
{#if ($scrollyIndex >= 8 && $scrollyIndex <= 11) || $scrollyIndex >= 13}
  {#each centroidData as d, i (`${i}-${$centroids.length}`)}
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
      fill={clusterColors[i]}
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
