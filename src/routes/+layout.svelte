<script>
  import './layout.css';
  import { browser } from '$app/environment';
  import Navbar from '$lib/components/Navbar.svelte';
  import { setAndSupscribeStores } from '$lib/utilities/localStorageStores';

  if (browser) {
    setAndSupscribeStores();
  }
</script>

<div class="container">
  <main>
    <slot />
  </main>

  <Navbar />
</div>

<style>
  .container {
    display: flex;
    flex-direction: column;
    height: 100vh;
  }
  main {
    overflow: auto;
    flex-grow: 1;
  }
</style>
