<script>
  import './layout.css';
  import { env } from '$env/dynamic/public';
  import { onMount } from 'svelte';
  import { register } from '@teamhanko/hanko-elements';
  import Topbar from '$lib/components/Topbar.svelte';
  import { upperFirst } from '$lib/utilities/formatter';

  const hankoApi = env.PUBLIC_HANKO_API_URL;
  const lastPath = window.location.pathname.split('/').pop();
  let title = upperFirst(lastPath || '');

  onMount(() => {
    if (!hankoApi) return;
    register(hankoApi).catch((error) => console.error(error));
  });
</script>

<Topbar>{title}</Topbar>
<div>
  <slot />
</div>

<style>
  div {
    display: flex;
    justify-content: center;
    padding-top: 9rem;
  }
</style>
