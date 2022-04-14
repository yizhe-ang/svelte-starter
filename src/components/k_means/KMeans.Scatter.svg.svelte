<script>
  // TODO: Transitions
  // TODO: Use spring motion for drag events? Have to use svelte-motion?
  // Or make every single data point a spring?
  // FIXME: Should I switch to canvas?
  import { getContext } from "svelte";
  import CircleSpringed from "$components/k_means/Circle.Springed.svelte";

  const { scrollyIndex } = getContext("Scrolly");
  const { data } = getContext("KMeans");
</script>

<g>
  {#each $data as d, i (d)}
    <CircleSpringed {d} />
  {/each}
</g>
