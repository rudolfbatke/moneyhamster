<script>
  import './layout.css';
  import { browser } from '$app/environment';
  import Navbar from '$lib/components/Navbar.svelte';
  import { setAndSupscribeStores } from '$lib/utilities/localStorageStores';
  import { pinStore } from '$lib/stores';
  import Pin from '$lib/components/Pin.svelte';

  if (browser) {
    setAndSupscribeStores();
  }
</script>

<svelte:head>
  <title>Hamster Cash</title>
  <link rel="manifest" href="/app.webmanifest" />
</svelte:head>

<div class="container">
  {$pinStore || 'no pin'}
  <Pin open={!$pinStore} />
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
    height: 3.6rem;
  }
</style>
