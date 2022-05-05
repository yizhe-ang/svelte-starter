<script>
  import { startsWithCapital } from "$utils/helpers";
  import KMeansStepper from "$components/k_means/KMeans.Stepper.svelte";

  export let data;

  const components = { KMeansStepper };
</script>

{#each data as d}
  {@const nestedData = d.value}

  <!-- TODO: Dynamically render components too -->
  {#if startsWithCapital(d.type)}
    <svelte:component this={components[d.type]} />
  {:else}
    <svelte:element this={d.type}>
      {#each nestedData as nestedD}
        {#if nestedD.type === "text"}
          {@html nestedD.value}
        {:else}
          <svelte:element this={nestedD.type}>
            {nestedD.value}
          </svelte:element>
        {/if}
      {/each}
    </svelte:element>
  {/if}
{/each}

<style>
</style>
