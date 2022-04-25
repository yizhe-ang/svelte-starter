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

  const x = (d) => d.x;
  const y = (d) => d.y;

  // TODO: What toy datasets to use?
  const numSamples = 45;
  // const data = writable(range(numSamples).map(() => [0, 0]));
  const data = writable(
    range(numSamples).map(() => ({
      x: 0,
      y: 0
    }))
  );
  // const data = writable(blobs.slice(0, numSamples));
  setContext("KMeans", { data });

  // Run k-means
  const numClusters = 3;
  let kMeansResult;
  $: kMeansResult = kMeans(
    $data.map((d) => [x(d), y(d)]),
    numClusters,
    {
      withIterations: false // whether to store result for each iteration,
      // distanceFunction: squaredDistance
      // initialization: "kmeans++",
    }
  );

  // $: console.table($data)
  // $: console.log("data", data);
  // Scrolly events
  $: console.log("step", $scrollyIndex);
  $: runScrollyEvents($scrollyIndex);
  function runScrollyEvents(index) {
    if (index === undefined) {
      // All points start from zero
      // $data = range(numSamples).map((_) => [0, 0]);
    } else if (index === 1) {
      // $data = range(numSamples).map((_) => [0, 0]);
      $data.map((d) => {
        d.x = 0;
        d.y = 0;
      });
      // $data.map((d, i) => {
      //   d.x = blobs[i][0];
      //   d.y = blobs[i][1];
      // });
      $data = $data;
    } else if (index === 2) {
      // FIXME: To destroy the timeout when the index changes?
      // Init y positions
      setTimeout(() => {
        $data.map((d, i) => (d.y = blobs[i][1]));
        $data = $data;
      }, 500);

      // Then x positions
      setTimeout(() => {
        $data.map((d, i) => (d.x = blobs[i][0]));
        $data = $data;
      }, 900);
    }
  }

  // function getData() {
  //   // return range(50).map((_) => ({
  //   //   x: Math.random(),
  //   //   y: Math.random()
  //   // }));
  //   return range(50).map((_) => [Math.random(), Math.random()]);
  // }
</script>

<!-- <MaxWidthWrapper>
  <button on:click={() => ($data = getData())}> Change Data </button>
</MaxWidthWrapper> -->
<KMeansChart {x} {y} result={kMeansResult} />

<style>
</style>
