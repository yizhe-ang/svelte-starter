<script>
  import { setContext } from "svelte";
  import { shuffler, randomLcg } from "d3";
  import { browser } from "$app/env";
  import Meta from "$components/Meta.svelte";
  import App from "$components/App.svelte";
  import copy from "$data/copy.json";
  import version from "$utils/version.js";

  // const shuffle = shuffler(randomLcg(45));

  // // FIXME: Just set this as a global store?
  // setContext(
  //   "Datasets",
  //   // FIXME: Where to perform preprocessing?
  //   Object.entries({ blobs, anisoBlobs, unevenBlobs, variedBlobs }).map((d) => ({
  //     name: d[0],
  //     data: shuffle(d[1]).map((arr) => ({ x: arr[0], y: arr[1] }))
  //   }))
  // );

  const preloadFont = [
    // "https://pudding.cool/assets/fonts/tiempos/TiemposTextWeb-Regular.woff2",
    // "https://pudding.cool/assets/fonts/tiempos/TiemposTextWeb-Bold.woff2",
    // "https://pudding.cool/assets/fonts/national/National2Web-Regular.woff2",
    // "https://pudding.cool/assets/fonts/national/National2Web-Bold.woff2"
  ];

  const { title, description, url, keywords } = copy;
  setContext("copy", copy);
</script>

<Meta {title} {description} {url} {preloadFont} {keywords} />
<App />
