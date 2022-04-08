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

  // Extract centroids
  $: centroids = result.centroids.map((d) => d.centroid);
</script>

<figure>
  <!-- TODO: Hardcode data extents -->
  <!-- TODO: To add a bit of inset -->
  <LayerCake data={$data} flatData={$data} {x} {y} {padding}>
    <Svg>
      <!-- For clicking interactions -->
      <ListeningRect />
      <KMeansVoronoi stroke={"black"} {centroids} />
      <!-- Data points -->
      <KMeansScatter strokeWidth={1} />
      <!-- Centroids -->
      <Scatter data={centroids} />
    </Svg>
  </LayerCake>
</figure>

<style>
  figure {
    /* width: 100%; */
    height: 65vh;
    aspect-ratio: 1.2 / 1;
    margin-left: auto;
    margin-right: auto;

    border: 1px solid lightgrey;
  }
</style>
