<script>
  // FIXME: Is this all I need?
  export let algoStep = 0;

  let numIterations = 2;

  // Total number of steps: (numIterations + 1) * 2
  $: lastStep = (numIterations + 1) * 2 - 1;
</script>

<div class="wrapper">
  <div class="ui-wrapper">
    <!-- Rerun clustering -->
    <button on:click={() => {}}> Rerun </button>

    <!-- TODO: Start and last buttons? -->

    <!-- Step buttons -->
    <button
      on:click={() => {
        algoStep = Math.max(algoStep - 1, 0);
      }}
    >
      Prev
    </button>
    <button
      on:click={() => {
        algoStep = Math.min(algoStep + 1, lastStep);
      }}
    >
      Next
    </button>
  </div>

  <div class="steps-wrapper">
    <div class:active={algoStep === 0}>Initialize prototypes</div>
    <div>Repeat until covergence</div>
    <div class:active={algoStep % 2 === 1 && algoStep !== lastStep}>
      Match each data point to its closest prototype
    </div>
    <div class:active={algoStep % 2 === 0 && algoStep !== 0 && algoStep !== lastStep}>
      Update prototypes to be the mean of its assigned data points
    </div>
    <div class:active={algoStep === lastStep}>Final cluster assignments</div>
  </div>
</div>

<style>
  .wrapper {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .ui-wrapper {
    display: flex;
    justify-content: space-evenly;
  }

  .steps-wrapper {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .active {
    background: lightgrey;
  }
</style>
