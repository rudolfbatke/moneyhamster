<script>
	import { browser } from '$app/environment';
	import Navbar from '$lib/components/Navbar.svelte';
	import { expenses_store, categories_store } from '$lib/stores';
	import { sortCategories, sortExpenses } from '$lib/utilities/list';

	if (browser) {
		const unsortedExpenses = JSON.parse(window.localStorage.getItem('expenses') || '[]');
		const sortedExpenses = sortExpenses(unsortedExpenses);
		expenses_store.set(sortedExpenses);

		const unsortedCategories = JSON.parse(window.localStorage.getItem('categories') || '[]');
		const sortedCategories = sortCategories(unsortedCategories);
		categories_store.set(sortedCategories);
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
