<script>
  // TODO: To include control panel too
  import kMeans from "ml-kmeans";
  import { range } from "d3";
  import { setContext } from "svelte";
  import { writable } from "svelte/store"
  import KMeansChart from "$components/k_means/KMeans.Chart.svelte";
  import MaxWidthWrapper from "$components/layouts/MaxWidthWrapper.svelte";

  // TODO: What toy datasets to use?
  const data = writable(getData());
  setContext("KMeans", { data });

  // Run k-means
  const numClusters = 3;
  $: kMeansResult = kMeans($data, numClusters, {
    withIterations: false // whether to store result for each iteration,
    // distanceFunction: squaredDistance
    // initialization: "kmeans++",
  });

  $: console.log(kMeansResult);

  function getData() {
    // return range(50).map((_) => ({
    //   x: Math.random(),
    //   y: Math.random()
    // }));
    return range(50).map((_) => [Math.random(), Math.random()]);
  }
</script>

<MaxWidthWrapper>
  <button on:click={() => ($data = getData())}> Change Data </button>
</MaxWidthWrapper>
<KMeansChart result={kMeansResult} />

<style>
</style>
