<script>
  import { getContext } from "svelte";
  import Demo from "$components/demo/Demo.svelte";
  import WIP from "$components/helpers/WIP.svelte";
  import Footer from "$components/Footer.svelte";
  import KMeansScrolly from "$lib/components/k_means/KMeans.Scrolly.svelte";
  import KMeansHero from "$components/k_means/KMeans.Hero.svelte";

  const copy = getContext("copy");
  console.log(copy);
</script>

<!-- <WIP /> -->

<section id="hero">
  <KMeansHero>
    <h1>K-Means Clustering</h1>
    <h2>A Visual Explainer</h2>
  </KMeansHero>
</section>

<!-- FIXME: Do I need these semantic tags? -->
<section id="scolly">
  <KMeansScrolly />
</section>

<Demo />
<Footer />

<style>
</style>
