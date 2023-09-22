<script>
	import { browser } from '$app/environment';
	import Navbar from '$lib/components/Navbar.svelte';
	import { expensesStore, categoriesStore } from '$lib/stores';
	import { sortCategories, sortExpenses } from '$lib/utilities/list';

	if (browser) {
		const expenses = JSON.parse(window.localStorage.getItem('expenses') || '[]');
		expensesStore.set(sortExpenses(expenses));

		const categories = JSON.parse(window.localStorage.getItem('categories') || '[]');
		categoriesStore.set(sortCategories(categories));
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
