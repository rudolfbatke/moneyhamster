<script>
	import SellIcon from '$lib/icons/SellIcon.svelte';
	import ShoppingCartIcon from '$lib/icons/ShoppingCartIcon.svelte';
	import { page } from '$app/stores';

	let pathname = '';

	page.subscribe(({ url }) => {
		pathname = url.pathname;
	});

	const navItems = [
		{
			name: 'Expenses',
			path: '/app/expenses',
			icon: ShoppingCartIcon
		},
		{
			name: 'Categories',
			path: '/app/categories',
			icon: SellIcon
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
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		display: flex;
		justify-content: space-around;
		align-items: center;
		background-color: var(--background-color);
		box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.2);
		z-index: 10;
		border-top: 1px solid var(--border-color);
		opacity: 0.8;
	}

	a {
		display: flex;
		flex-direction: column;
		align-items: center;
		text-decoration: none;
		color: var(--text-color);
		font-size: 0.8rem;
		padding: 0.5rem;
		opacity: 0.8;
	}

	.active {
		opacity: 1;
		--text-color: var(--focus-color);
	}
</style>
