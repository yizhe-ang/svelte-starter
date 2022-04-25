<script>
  export let data;
</script>

{#each data as d}
  {@const nestedData = d.value}

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
{/each}

<style>
</style>
