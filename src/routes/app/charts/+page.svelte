<script>
	import Topbar from '$lib/components/Topbar.svelte';
	import { expenses_store, categories_store } from '$lib/stores';

	/**
	 * @typedef {import('./../types').Category} Category
	 * @typedef {import('./../types').Expense} Expense
	 */

	/** @type {Expense[]}*/
	let expenses = [];

	/** @type {Category[]}*/
	let categories = [];

	categories_store.subscribe((value) => (categories = value));
	expenses_store.subscribe((value) => (expenses = value));
</script>

<Topbar>Charts</Topbar>
