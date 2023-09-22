<script>
	import { browser } from '$app/environment';
	import Navbar from '$lib/components/Navbar.svelte';
	import { expensesStore, categoriesStore, openListItemsStore } from '$lib/stores';
	import { sortCategories, sortExpenses } from '$lib/utilities/list';

	if (browser) {
		/** @param {string} key   */
		const get = (key) => window.localStorage.getItem(key);

		if ($expensesStore.length === 0) {
			const expenses = JSON.parse(get('expenses') || '[]');
			expensesStore.set(sortExpenses(expenses));
		}

		if ($categoriesStore.length === 0) {
			const categories = JSON.parse(get('categories') || '[]');
			categoriesStore.set(sortCategories(categories));
		}

		if ($openListItemsStore.length === 0) {
			const openListItems = JSON.parse(get('openListItems') || '[]');
			openListItemsStore.set(openListItems);
		}
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
