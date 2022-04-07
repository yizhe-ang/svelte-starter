<script>
  // TODO: K-means voronoi overlay
  import { LayerCake, Svg, Html } from "layercake";
  import { spring } from "svelte/motion";
  import Scatter from "$components/k_means/Scatter.svg.svelte";
  import ListeningRect from "$components/custom_charts/ListeningRect.svelte";
  import KMeansVoronoi from "$components/k_means/KMeansVoronoi.svelte";

  export let data;
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
</script>

<figure>
  <!-- TODO: Hardcode data extents -->
  <LayerCake {data} flatData={data} {x} {y} {padding}>
    <Svg>
      <ListeningRect />
      <KMeansVoronoi />
      <Scatter strokeWidth={1} />
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

    border: 1px solid lightgrey;
  }

</style>
