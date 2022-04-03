<script>
  // TODO: To include control panel too
  import { range } from "d3";
  import KMeansChart from "$components/k_means/KMeans.Chart.svelte";
  import MaxWidthWrapper from "$components/layouts/MaxWidthWrapper.svelte";

  let data = [];

  function getData() {
    return range(100).map((_) => ({
      x: Math.random(),
      y: Math.random()
    }));
  }
</script>

<MaxWidthWrapper>
  <button on:click={() => (data = getData())}> Change Data </button>
</MaxWidthWrapper>
<KMeansChart {data} />

<style>
</style>
