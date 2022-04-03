<script>
  import { range } from "d3";
  import { LayerCake, Svg } from "layercake";
  import Scatter from "$components/k_means/Scatter.svg.svelte";

  export let data;

  const x = "x";
  const y = "y";
  const p = 20;
  const padding = {
    top: p,
    left: p,
    bottom: p,
    right: p
  };
</script>

<figure>
  <LayerCake {data} {x} {y} {padding}>
    <Svg>
      <Scatter strokeWidth="1" />
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
  }
</style>
