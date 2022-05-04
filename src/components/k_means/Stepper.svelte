<script>
  // FIXME: Is this all I need?
  export let numIterations;
  export let step = 0;

  // Total number of steps (numIterations + 1) * 2 + 1
  $: lastStep = (numIterations + 1) * 2;
</script>

<!-- Rerun clustering -->
<button
  on:click={}
>
  Rerun
</button>

<!-- Step buttons -->
<button
  on:click={() => {
    step = Math.min(step + 1, lastStep);
  }}
>
  Next
</button>
<button
  on:click={() => {
    step = Math.max(step - 1, 0);
  }}
>
  Prev
</button>

<div class:active={step === 0}>Initialize prototypes</div>
<div>Repeat until covergence</div>
<div class:active={step % 2 === 1 && step !== lastStep}>
  Match each data point to its closest prototype
</div>
<div class:active={step % 2 === 0 && step !== 0}>
  Update prototypes to be the mean of its assigned data points
</div>
<div class:active={step === lastStep}>Final cluster assignments</div>

<style>
  .active {
  }
</style>
