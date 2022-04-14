<script>
  // TODO: K-means voronoi overlay
  import { LayerCake, Svg, Html } from "layercake";
  import { spring } from "svelte/motion";
  import { getContext } from "svelte";
  import KMeansScatter from "$lib/components/k_means/KMeans.Scatter.svg.svelte";
  import Scatter from "$lib/components/k_means/Scatter.svg.svelte";
  import ListeningRect from "$components/custom_charts/ListeningRect.svelte";
  import KMeansVoronoi from "$components/k_means/KMeans.Voronoi.svelte";

  const { data } = getContext("KMeans");
  const { scrollyIndex } = getContext("Scrolly");
  $: console.log($scrollyIndex);

  export let result; // k-means result

  const x = 0;
  const y = 1;
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
  <!-- TODO: To add a bit of inset -->
  <LayerCake data={$data} flatData={$data} {x} {y} {padding} xDomain={domain} yDomain={domain}>
    <Html>
      <!-- Decorative border -->
      {#if true}
        <div class="border" />
      {/if}
    </Html>

    <Svg>
      <!-- For clicking interactions -->
      {#if true}
        <ListeningRect />
      {/if}
      {#if false}
        <KMeansVoronoi stroke={"black"} {centroids} />
      {/if}

      <!-- Data points -->
      <KMeansScatter strokeWidth={1} />

      {#if false}
        <!-- Centroids -->
        <Scatter data={centroids} />
      {/if}
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
    box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
  }

</style>
