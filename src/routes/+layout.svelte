<script>
	import ShoppingCart from '$lib/icons/ShoppingCart.svelte';
	import './layout.css';
	import { browser } from '$app/environment';

	let pathname = '';

	// Get the current pathname
	if (browser) {
		pathname = location.pathname;
	}
</script>

<!-- Content -->
<main>
	<slot />
</main>

<!-- Bottom navigation bar with icons and text -->
<nav>
	<a href="/app/expenses" class:active={pathname === '/app/expenses'}>
		<ShoppingCart />
		Expenses
	</a>
</nav>

<style>
	main {
		padding-bottom: 3.6rem;
	}

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
		z-index: 1;
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
