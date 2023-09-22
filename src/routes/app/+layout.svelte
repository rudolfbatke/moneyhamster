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

<main>
	<slot />
</main>

<Navbar />

<style>
	main {
		padding-bottom: 3.6rem;
		width: fit-content;
		min-width: 100%;
	}
</style>
