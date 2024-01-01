<script>
  import './layout.css';
  import { browser } from '$app/environment';
  import Navbar from '$lib/components/Navbar.svelte';
  import { setAndSupscribeStores } from '$lib/utilities/localStorageStores';

  if (browser) {
    setAndSupscribeStores();
  }
</script>

<svelte:head>
  <title>Hamster Cash</title>
  <link rel="manifest" href="/app.webmanifest" />
</svelte:head>

<div class="container">
  <main>
    <slot />
  </main>

  <div class="navbar">
    <Navbar />
  </div>
</div>

<style>
  .container {
    display: flex;
    flex-direction: column;
    height: calc(100vh-3.6rem);
  }

  main {
    overflow: auto;
    flex-grow: 1;
  }

  .navbar {
    z-index: 10;
    height: 3.6rem;
    position: fixed;
    width: 100%;
    bottom: 0;
  }
</style>
