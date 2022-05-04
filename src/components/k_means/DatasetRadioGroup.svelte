<script>
  import {
    RadioGroup,
    RadioGroupLabel,
    RadioGroupOption,
    RadioGroupDescription
  } from "@rgossiaux/svelte-headlessui";
  import { getContext } from "svelte";

  const datasets = getContext("Datasets");

  export let value;
</script>

<RadioGroup {value} on:change={(e) => (value = e.detail)}>
  <RadioGroupLabel>Dataset</RadioGroupLabel>

  {#each datasets as d (d.name)}
    <RadioGroupOption value={d} let:checked>
      <span class:checked>{d.name}</span>
    </RadioGroupOption>
  {/each}
</RadioGroup>

<style>
  .checked {
    color: hotpink;
  }
</style>