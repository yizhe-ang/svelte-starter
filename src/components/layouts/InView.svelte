<script>
  // From: https://www.youtube.com/watch?v=x7tzr-fSqhE&t=255s&ab_channel=ThePudding
  import { onMount } from "svelte";

  let isVisible = false;
  let element;

  const handleIntersect = (e) => {
    isVisible = e[0].isIntersecting;
  };

  onMount(() => {
    const root = null;
    // Can customize margins
    const rootMargin = `0px 0px -300px 0px`;
    const options = { root, rootMargin };

    const observer = new IntersectionObserver(handleIntersect, options);
    observer.observe(element);
  });
</script>

<div bind:this={element}>
  <!-- Exposes slot prop -->
  <slot {isVisible} />
</div>
