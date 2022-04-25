<script>
  import { LayerCake, Svg, Html } from "layercake";
  import { fade } from "svelte/transition";
  import { getContext } from "svelte";
  import KMeansScatter from "$lib/components/k_means/KMeans.Scatter.svg.svelte";
  import Line from "$lib/components/k_means/Scatter.svg.svelte";
  import Scatter from "$lib/components/k_means/Scatter.svg.svelte";
  import ArrowAxis from "$components/k_means/ArrowAxis.svelte";
  import ListeningRect from "$components/custom_charts/ListeningRect.svelte";
  import KMeansVoronoi from "$components/k_means/KMeans.Voronoi.svelte";

  const { data } = getContext("KMeans");
  const { scrollyIndex } = getContext("Scrolly");

  export let x;
  export let y;
  export let result; // k-means result

  const sampleData = [
    [0.9480809100559839, 0.7008366197126539],
    [0.8783810712951932, 0.8241849997826217],
    [0.5243915975264637, 0.610518407008911]
  ];
  // const sampleLines = [

  // ]

  const p = 20;
  const padding = {
    top: p,
    left: p,
    bottom: p,
    right: p
  };
  const inset = 0.02;
  const domain = [0 - inset, 1 + inset];

  // Extract centroids
  $: centroids = result.centroids.map((d) => d.centroid);
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

      {#if $scrollyIndex >= 3}
        <KMeansVoronoi {centroids} />
      {/if}

      <!-- Data points -->
      {#if $scrollyIndex >= 2}
        <KMeansScatter />
      {/if}

      <!-- To show distance metric -->
      <!-- <Scatter data={sampleData} /> -->

      <!-- Centroids -->
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
