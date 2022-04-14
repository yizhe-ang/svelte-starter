<script>
  // TODO: To include control panel too
  import kMeans from "ml-kmeans";
  import { range, shuffle } from "d3";
  import { setContext, getContext } from "svelte";
  import { writable, get } from "svelte/store";
  import KMeansChart from "$components/k_means/KMeans.Chart.svelte";
  import MaxWidthWrapper from "$components/layouts/MaxWidthWrapper.svelte";

  const { blobs } = getContext("Datasets");
  const { scrollyIndex } = getContext("Scrolly");

  // TODO: What toy datasets to use?
  const numSamples = 60;
  // const data = writable(undefined);
  const data = writable(range(numSamples).map((_) => [0, 0]));
  // const data = writable(blobs.slice(0, numSamples));
  setContext("KMeans", { data });

  // Run k-means
  const numClusters = 3;
  $: kMeansResult = kMeans($data, numClusters, {
    withIterations: false // whether to store result for each iteration,
    // distanceFunction: squaredDistance
    // initialization: "kmeans++",
  });

  // Scolly events
  $: console.log($scrollyIndex);
  $: runScrollyEvents($scrollyIndex);

  function runScrollyEvents(index) {
    if (index === undefined) {
      // All points start from zero
      // $data = range(numSamples).map((_) => [0, 0]);
    } else if (index === 0) {
      // $data = range(numSamples).map((_) => [0, 0]);
      $data.map((d) => {
        d[0] = 0;
        d[1] = 0;
      });
      $data = $data;
    } else if (index === 1) {
      // Init y positions
      setTimeout(() => {
        $data.map((d, i) => (d[1] = blobs[i][1]));
        $data = $data;
      }, 500);

      // Then x positions
      setTimeout(() => {
        $data.map((d, i) => (d[0] = blobs[i][0]));
        $data = $data;
      }, 900);
    }
  }

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
