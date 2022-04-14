<script>
  import Scrolly from "$components/helpers/Scrolly.svelte";
  import KMeans from "$components/k_means/KMeans.svelte";
  import { setContext } from "svelte";
  import { writable } from "svelte/store";

  // Scroller parameters
  let value;
  const scrollyIndex = writable(undefined);
  setContext("Scrolly", { scrollyIndex });
  $: $scrollyIndex = value;
</script>

<div class="wrapper">
  <div class="foreground-wrapper">
    <!-- TODO: This can be a dynamic element / component -->
    <!-- generated from data -->
    <Scrolly bind:value>
      {#each [...Array(5).keys()] as text, i}
        <!-- TODO: Can modularize this? -->
        <div class="step" class:active={$scrollyIndex === i}>
          <div class="step-content">
            <p>This is step {text}</p>
          </div>
        </div>
      {/each}

      <div class="spacer" />
    </Scrolly>
  </div>

  <div class="background-wrapper">
    <KMeans />
  </div>
</div>

<style>
  .spacer {
    height: 40vh;
  }

  .wrapper {
    margin-top: 64px;
    text-align: center;
    transition: background 100ms;
    display: flex;
    flex-direction: row-reverse;
  }

  .background-wrapper {
    position: sticky;
    top: 5%;
    /* transform: translate(0, -50%); */
    flex: 1 1 60%;
    width: 60%;
    height: 100%;
  }

  .foreground-wrapper {
    height: 100%;
    flex: 1 1 40%;
    z-index: 10;
  }

  @media screen and (max-width: 768px) {
    .wrapper {
      flex-direction: column-reverse;
    }

    .background-wrapper {
      width: 95%;
      margin: auto;
    }
  }

  .step {
    height: 80vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .step-content {
    font-size: 1rem;
    background: whitesmoke;
    color: #ccc;
    border-radius: 5px;
    padding: 0.5rem 1rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    transition: background 500ms ease;
    box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.2);
    text-align: left;
    width: 75%;
    margin: auto;
    /* margin-left: 16px; */
    /* max-width: 500px; */
    max-width: 50ch;
  }

  .step.active .step-content {
    background: white;
    color: black;
  }
</style>
