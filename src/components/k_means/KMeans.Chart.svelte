<script>
  import { clusterColors } from "$stores/misc";
  import { LayerCake, Svg, Html } from "layercake";
  import { ascending } from "d3";
  import { fade } from "svelte/transition";
  import { getContext } from "svelte";
  import KMeansScatter from "$lib/components/k_means/KMeans.Scatter.svelte";
  import Line from "$lib/components/k_means/Line.svelte";
  import Scatter from "$lib/components/k_means/Scatter.svelte";
  import CircleSpringed from "$lib/components/k_means/Circle.Springed.svelte";
  import ArrowAxis from "$components/k_means/ArrowAxis.svelte";
  import ListeningRect from "$components/custom_charts/ListeningRect.svelte";
  import KMeansVoronoi from "$components/k_means/KMeans.Voronoi.svelte";

  const { data } = getContext("KMeans");
  const { scrollyIndex } = getContext("Scrolly");

  export let x;
  export let y;
  export let result; // k-means result

  // Hardcode sample data to explain distance metric
  const sampleData = [
    { x: 0.9480809100559839, y: 0.7008366197126539, fill: clusterColors[2] },
    { x: 0.8783810712951932, y: 0.8241849997826217, fill: clusterColors[2] },
    { x: 0.5243915975264637, y: 0.610518407008911, fill: clusterColors[1] }
  ];
  const sampleLines = [
    [sampleData[0], sampleData[1]],
    [sampleData[0], sampleData[2]]
  ];

  // Chart parameters
  const p = 20;
  const padding = {
    top: p,
    left: p,
    bottom: p,
    right: p
  };
  const inset = 0.02;
  const domain = [0 - inset, 1 + inset];

  $: centroidPos = result.centroids.map((d) => d.centroid);
  $: centroids = centroidPos
    .map((d, i) => ({
      x: d[0],
      y: d[1],
      i
    }))
    // TODO: Sort the centroids so that the colors are somewhat consistent
    // Project the points onto 1d plane
    // Assign each color to a specific quadrant / area?
    .sort((a, b) => ascending(a.x, b.x))
    .map((d, i) => ({
      ...d,
      clusterId: i
    }));
  // HACK:
  $: clusterIdMap = new Map(centroids.map((d) => [d.i, d.clusterId]));

  // Re-index cluster ids after sorting
  $: clusterIds = result.clusters.map((d) => clusterIdMap.get(d));
</script>

<figure>
  <LayerCake data={$data} {x} {y} {padding} xDomain={domain} yDomain={domain}>
    <Html>
      <!-- Decorative border -->
      <!-- FIXME: Just a flat shadow instead? -->
      <!-- Going for the aesthetic of bloomberg -->
      {#if $scrollyIndex >= 5}
        <div in:fade={{ delay: 1500 }} out:fade class="border" />
      {/if}
    </Html>

    <Svg>
      <!-- Decoration -->
      {#if $scrollyIndex >= 2 && $scrollyIndex <= 3}
        <ArrowAxis />
      {/if}

      <!-- For clicking interactions -->
      {#if true}
        <ListeningRect />
      {/if}

      <!-- Voronoi and related shapes -->
      {#if $scrollyIndex >= 2}
        <KMeansVoronoi {centroids} {clusterIds} />
      {/if}

      <!-- Data points -->
      {#if $scrollyIndex >= 2}
        <!-- <KMeansScatter /> -->
        {#each $data as d, i (d)}
          <CircleSpringed {d} fill={$scrollyIndex >= 9 ? clusterColors[clusterIds[i]] : "#ccc"} />
        {/each}
      {/if}

      <!-- Distance metric demo -->
      {#if $scrollyIndex >= 7 && $scrollyIndex <= 7}
        <!-- TODO: Can componentize this -->
        {#each sampleLines as d}
          <Line data={d} stroke={"hsl(0, 0%, 0%)"} strokeWidth={3} />
        {/each}

        <Scatter
          data={sampleData}
          fillAccessor={(d) => d.fill}
          r={7}
          stroke={"hsl(0, 0%, 0%)"}
          strokeWidth={1}
          strokeOpacity={0.3}
        />
      {/if}

      <!-- Centroids -->
      <!-- Should be draggable / springed etc. -->
      <!-- <Scatter data={centroids} /> -->
    </Svg>
  </LayerCake>
</figure>

<style>
  figure {
    /* width: 100%; */
    height: 65vh;
    aspect-ratio: 1 / 1;
    margin-left: auto;
    margin-right: auto;

    /* border: 1px solid lightgrey; */
  }

  .border {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;

    /* background-color: lightpink; */
    /* box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.2); */
    box-shadow: var(--shadow-elevation-medium);
    border: 1px solid hsl(0, 10%, 90%);
    border-radius: 1%;
  }
</style>
