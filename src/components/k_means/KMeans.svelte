<script>
  // TODO: To include control panel too
  import kMeans from "ml-kmeans";
  import { range } from "d3";
  import KMeansChart from "$components/k_means/KMeans.Chart.svelte";
  import MaxWidthWrapper from "$components/layouts/MaxWidthWrapper.svelte";

  let data = getData();

  // Compute k-means here?
  const numClusters = 3;
  const kMeansResult = kMeans(
    data,
    numClusters,
    {
      withIterations: false, // whether to store result for each iteration,
      // distanceFunction: squaredDistance
      // initialization: "kmeans++",
    }
  )

  function getData() {
    // return range(50).map((_) => ({
    //   x: Math.random(),
    //   y: Math.random()
    // }));
    return range(50).map((_) => [Math.random(), Math.random()]);
  }
</script>

<MaxWidthWrapper>
  <button on:click={() => (data = getData())}> Change Data </button>
</MaxWidthWrapper>
<KMeansChart {data} result={kMeansResult} />

<style>
</style>
