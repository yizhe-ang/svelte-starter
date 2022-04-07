<script>
  import { getContext } from "svelte";
  import Demo from "$components/demo/Demo.svelte";
  import WIP from "$components/helpers/WIP.svelte";
  import Footer from "$components/Footer.svelte";
  import Playground from "$components/Playground.svelte"

  const copy = getContext("copy");
</script>

<WIP />
<Playground />
<Demo />
<Footer />
