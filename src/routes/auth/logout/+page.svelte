<script>
  import { Hanko } from '@teamhanko/hanko-elements';
  import { goto } from '$app/navigation';
  import { env } from '$env/dynamic/public';
  import { onMount } from 'svelte';
  const hankoApi = env.PUBLIC_HANKO_API_URL;

  const hanko = new Hanko(hankoApi);

  onMount(() => {
    hanko.user.logout().catch((error) => console.log(error));
    goto('login');
  });
</script>
