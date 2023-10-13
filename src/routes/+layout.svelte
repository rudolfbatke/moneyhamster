<script>
  import './layout.css';
  import { browser } from '$app/environment';
  import Navbar from '$lib/components/Navbar.svelte';
  import { setAndSupscribeStores } from '$lib/utilities/localStorageStores';
  import { onMount } from 'svelte';
  import { pwaInfo } from 'virtual:pwa-info';

  if (browser) {
    setAndSupscribeStores();
  }

  $: webManifestLink = pwaInfo ? pwaInfo.webManifest.linkTag : '';

  onMount(async () => {
    if (pwaInfo) {
      const { registerSW } = await import('virtual:pwa-register');
      registerSW({
        immediate: true,
        onRegistered(reg) {
          // uncomment following code if you want check for updates
          // r && setInterval(() => {
          //    console.log('Checking for sw update')
          //    r.update()
          // }, 20000 /* 20s for testing purposes */)
          console.log(`SW Registered: ${reg}`);
        },
        onRegisterError(error) {
          console.log('SW registration error', error);
        }
      });
    }
  });
</script>

<svelte:head>
  {@html webManifestLink}
</svelte:head>

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
