<script>
	import { browser } from '$app/environment';
	import Navbar from '$lib/components/Navbar.svelte';
	import {
		expensesStore,
		categoriesStore,
		openListItemsStore,
		monthBarchartStore
	} from '$lib/stores';
	import { sortCategories, sortExpenses } from '$lib/utilities/list';

	if (browser) {
		/** @param {string} key   */
		const get = (key) => window.localStorage.getItem(key);

		/**
		 *@param {string} key
		 *@param {string} value
		 */
		const set = (key, value) => window.localStorage.setItem(key, value);

		const expenses = JSON.parse(get('expenses') || '[]');
		expensesStore.set(sortExpenses(expenses));
		expensesStore.subscribe((expenses) => {
			set('expenses', JSON.stringify(expenses));
		});

		const categories = JSON.parse(get('categories') || '[]');
		categoriesStore.set(sortCategories(categories));
		categoriesStore.subscribe((categories) => {
			set('categories', JSON.stringify(categories));
		});

		const openListItems = JSON.parse(get('openListItems') || '[]');
		openListItemsStore.set(openListItems);
		openListItemsStore.subscribe((openListItems) => {
			set('openListItems', JSON.stringify(openListItems));
		});

		const monthBarchart = JSON.parse(get('monthBarchart') || '""');
		monthBarchartStore.set(monthBarchart);
		monthBarchartStore.subscribe((monthBarchart) => {
			set('monthBarchart', JSON.stringify(monthBarchart));
		});
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
