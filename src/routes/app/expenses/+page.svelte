<script>
	import { browser } from '$app/environment';
	import Button from '$lib/components/Button.svelte';
	import Float from '$lib/components/Float.svelte';
	import List from '$lib/components/List.svelte';
	import ListItem from '$lib/components/ListItem.svelte';
	import Topbar from '$lib/components/Topbar.svelte';
	import { currency } from '$lib/utilities/formatter';

	/** @type {import('../../../types').Expense[]}*/
	let expenses = [];

	/** @type {import('../../../types').Category[]}*/
	let categories = [];

	if (browser) {
		expenses = JSON.parse(window.localStorage.getItem('expenses') || '[]');
		categories = JSON.parse(window.localStorage.getItem('categories') || '[]');
	}

	/**
	 * @param {number|undefined} id
	 * @returns {import('../../../types').Category|undefined}
	 */
	const getCategory = (id) => categories.find((c) => c.id === id);

	const data = expenses.map((e) => ({
		...e,
		category: getCategory(e.category)
	}));
</script>

<Topbar>Expenses</Topbar>

<List>
	{#each data as expense}
		<ListItem>
			{expense.issue}
			<span slot="sub" style:color={expense.category?.color}>{expense.category?.name}</span>
			<span slot="end">{currency(expense.amount)}</span>
		</ListItem>
	{/each}
</List>

<Float>
	<Button on:click={() => console.log('new')}>New</Button>
</Float>
