<script>
  import SellIcon from '$lib/icons/SellIcon.svelte';
  import ShoppingCartIcon from '$lib/icons/ShoppingCartIcon.svelte';
  import { page } from '$app/stores';
  import MonitoringIcon from '$lib/icons/MonitoringIcon.svelte';
  import InfoIcon from '$lib/icons/InfoIcon.svelte';

  let pathname = '';

  page.subscribe(({ url }) => {
    pathname = url.pathname;
  });

  const navItems = [
    {
      name: 'Expenses',
      path: '/expenses',
      icon: ShoppingCartIcon
    },
    {
      name: 'Categories',
      path: '/categories',
      icon: SellIcon
    },
    {
      name: 'Charts',
      path: '/charts',
      icon: MonitoringIcon
    },
    {
      name: 'Info',
      path: '/info',
      icon: InfoIcon
    }
  ];
</script>

<!-- Bottom navigation bar with icons and text -->
<nav>
  {#each navItems as item}
    <a href={item.path} class:active={pathname === item.path}>
      <svelte:component this={item.icon} />
      {item.name}
    </a>
  {/each}
</nav>

<style>
  nav {
    display: flex;
    justify-content: space-around;
    align-items: center;
    background-color: var(--background-color);
    box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.2);
    z-index: 10;
    border-top: 1px solid var(--border-color);
    width: 100%;
    border-radius: 1rem 1rem 0 0;
  }

  a {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-decoration: none;
    color: var(--text-color);
    font-size: 0.8rem;
    padding: 0.5rem;
    opacity: 0.7;
  }

  .active {
    opacity: 1;
    --text-color: var(--primary-hover);
  }
</style>
