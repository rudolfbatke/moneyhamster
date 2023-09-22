<script>
	import Topbar from '$lib/components/Topbar.svelte';
	import { expensesStore, categoriesStore } from '$lib/stores';

	/**
	 * @typedef {import('./../types').Category} Category
	 * @typedef {import('./../types').Expense} Expense
	 */

	/** @type {Expense[]}*/
	let expenses = [];

	/** @type {Category[]}*/
	let categories = [];

	categoriesStore.subscribe((value) => (categories = value));
	expensesStore.subscribe((value) => (expenses = value));
</script>

<Topbar>Charts</Topbar>
