<script>
  import kMeans from "ml-kmeans";
  import { range, shuffle, ascending, leastIndex } from "d3";
  import { setContext, getContext } from "svelte";
  import { writable, get } from "svelte/store";
  import KMeansChart from "$components/k_means/KMeans.Chart.svelte";
  import MaxWidthWrapper from "$components/layouts/MaxWidthWrapper.svelte";

  const { blobs } = getContext("Datasets");
  const { scrollyIndex } = getContext("Scrolly");

  // Data accessors
  const x = (d) => d.x;
  const y = (d) => d.y;

  // Init chart data
  const numSamples = 45;
  const data = writable(
    range(numSamples).map(() => ({
      x: 0,
      y: 0
    }))
  );
  // const data = writable(blobs.slice(0, numSamples));
  const centroids = writable(undefined);
  const centroidsHistory = writable(undefined);
  const clusterAssignments = writable(undefined);

  // Store all chart data inside a context
  setContext("KMeans", { data, centroids, centroidsHistory, clusterAssignments });

  // Run k-means
  let numClusters = 3;
  $: kMeansData = runKMeans($data, numClusters);
  function runKMeans(data, numClusters) {
    // const kMeansResult = kMeans(
    //   data.map((d) => [x(d), y(d)]),
    //   numClusters,
    //   {
    //     withIterations: false // TODO: whether to store result for each iteration,
    //     // distanceFunction: squaredDistance
    //     // initialization: "kmeans++",
    //   }
    // );

    // Randomly init centroids
    const initCentroids = range(numClusters).map(() => {
      return Array.from({ length: 2 }, Math.random);
    });

    const kMeansResults = kMeans(
      data.map((d) => [x(d), y(d)]),
      numClusters,
      {
        withIterations: true, // TODO: whether to store result for each iteration,
        // distanceFunction: squaredDistance
        // initialization: "kmeans++",
        initialization: initCentroids
      }
    );

    let centroidsHistory = Array.from(kMeansResults, (r) => {
      return r.centroids.map((d) => ({
        x: d.centroid[0],
        y: d.centroid[1]
      }));
    });
    centroidsHistory = [initCentroids.map((d) => ({ x: d[0], y: d[1] })), ...centroidsHistory];

    // Sort the centroids
    // FIXME: Make this more efficient?
    const sortedIndices = [...centroidsHistory[centroidsHistory.length - 1]]
      .map((d, i) => ({ ...d, i }))
      .sort((a, b) => ascending(a.x, b.x))
      .map((d) => d.i);

    centroidsHistory = centroidsHistory.map((arr) => {
      return sortedIndices.map((i) => arr[i]);
    });

    const centroids = centroidsHistory[centroidsHistory.length - 1];

    // const centroids = centroidsHistory[centroidsHistory.length - 1];
    // const lastCentroids = centroidsHistory[centroidsHistory.length - 1]
    // const centroids = lastCentroids
    //   .map((d, i) => ({ ...d, i }))
    //   .sort((a, b) => ascending(a.x, b.x))
    //   .map((d, i) => ({
    //     ...d,
    //     clusterId: i
    //   }));

    // const indexToId = new Map(centroids.map((d) => [d.i, d.clusterId]));

    // Sort centroids; `clusterId` represents the ordering
    // const sortedIndices = Array.from(Array(centroids.length).keys()).sort((a, b) =>
    //   ascending(centroids[a].x, centroids[b].x)
    // );
    // console.log(centroids.map((d) => d.x));
    // console.log(sortedIndices);

    // const indexToId = new Map(sortedIndices.map((d, i) => [d, i]));

    // const indexToId = new Map([...centroids].map((d, i) => ({...d, i}))
    //   .sort((a, b) => ascending(a.x, b.x))
    //   // i -> clusterId, d.i -> prev position
    //   .map((d, i) => [d.i, i]))

    // FIXME: Could be wrong
    // centroidsHistory.slice(0, -1).forEach((h) => {
    //   h.forEach((c, i) => {
    //     // c.clusterId = sortedIndices[i];
    //     c.clusterId = indexToId.get(i);
    //   });
    // });

    // Compute centroids and cluster ids
    // const centroidPos = kMeansResult.centroids.map((d) => d.centroid);
    // const centroids = centroidPos
    //   .map((d, i) => ({
    //     x: d[0],
    //     y: d[1],
    //     i
    //   }))
    //   // TODO: Sort the centroids so that the colors are somewhat consistent
    //   // Project the points onto 1d plane
    //   // Assign each color to a specific quadrant / area?
    //   .sort((a, b) => ascending(a.x, b.x))
    //   .map((d, i) => ({
    //     ...d,
    //     clusterId: i
    //   }));
    // FIXME: Do I actually need the cluster ids?
    // HACK:
    // const clusterIdMap = new Map(centroids.map((d) => [d.i, d.clusterId]));

    // // Re-index cluster ids after sorting
    // const clusterIds = kMeansResult.clusters.map((d) => clusterIdMap.get(d));

    return { centroids, centroidsHistory };
  }
  $: $centroids = kMeansData.centroids;
  $: $centroidsHistory = kMeansData.centroidsHistory;
  // $: $clusterIds = kMeansData.clusterIds;

  // Compute cluster assignments
  // $: $clusterAssignments = updateClusterAssignments($centroids);
  // function updateClusterAssignments(centroids) {
  //   return $data.map((d) => closest(d, centroids));
  // }

  // Scrolly events that changes data
  $: console.log("step", $scrollyIndex);
  $: runScrollyEvents($scrollyIndex);
  function runScrollyEvents(index) {
    if (index === undefined) {
      // All points start from zero
      // $data = range(numSamples).map((_) => [0, 0]);
    } else if (index === 1) {
      $data.map((d) => {
        d.x = 0;
        d.y = 0;
      });
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
  function closest(d, arr) {
    const i = leastIndex(arr, (a) => Math.hypot(a.x - d.x, a.y - d.y));

    return { c: arr[i], i };
  }
</script>

<!-- TODO: Control panel -->

<MaxWidthWrapper>
  <!-- <button on:click={() => ($data = getData())}> Change Data </button> -->

  <!-- TODO: Iteration counter -->

  <label for="num-clusters">k:</label>
  <input
    bind:value={numClusters}
    type="number"
    id="num-clusters"
    name="num-clusters"
    min="1"
    max="10"
  />
</MaxWidthWrapper>
<KMeansChart {x} {y} />

<style>
</style>
