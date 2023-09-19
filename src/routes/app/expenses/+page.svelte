<script>
	import { browser } from '$app/environment';
	import Button from '$lib/components/Button.svelte';
	import Float from '$lib/components/Float.svelte';
	import List from '$lib/components/List.svelte';
	import ListItem from '$lib/components/ListItem.svelte';
	import Topbar from '$lib/components/Topbar.svelte';
	import { currency, localDate, localMonthYear } from '$lib/utilities/formatter';
	import { sortCategories, sortExpenses } from '$lib/utilities/list';

	/** @type {import('../../../types').Expense[]}*/
	let expenses = [];

	/** @type {import('../../../types').Category[]}*/
	let categories = [];

	/** @type {Map<string, import('../../../types').CompleteExpense[]>}*/
	let groubedExpenses = new Map();

	/** @type {string[]}*/
	let openLineItems = [];

	/**
	 * Display or hide expenses of a month
	 *
	 * @param {string} month
	 */
	function toggleExpenses(month) {
		if (openLineItems.includes(month)) {
			openLineItems = openLineItems.filter((m) => m !== month);
		} else {
			openLineItems = [...openLineItems, month];
		}
	}

	if (browser) {
		// load data from local storage
		const unsortedExpenses = JSON.parse(window.localStorage.getItem('expenses') || '[]');
		expenses = sortExpenses(unsortedExpenses);
		const unsortedCategories = JSON.parse(window.localStorage.getItem('categories') || '[]');
		categories = sortCategories(unsortedCategories);
	}

	// set group expenses by month and add category
	expenses.forEach((e) => {
		// find category by id
		const category = categories.find((c) => c.id === e.category);

		// skip if no category
		if (!category) return;

		// month is the key
		const month = localMonthYear(e.date);

		// add category to expense
		const completeExpense = { ...e, category };

		// add to map
		if (!groubedExpenses.has(month)) {
			groubedExpenses.set(month, [completeExpense]);
		} else {
			groubedExpenses.get(month)?.push(completeExpense);
		}
	});
</script>

<Topbar>Expenses</Topbar>

<List>
	{#each [...groubedExpenses.entries()] as [month, expenses]}
		<ListItem sticky border on:click={() => toggleExpenses(month)}>
			<span>{month}</span>
			<span slot="end">{currency(expenses.reduce((acc, e) => acc + e.amount, 0))}</span>
		</ListItem>
		{#if openLineItems.includes(month)}
			{#each expenses as expense}
				<ListItem lucent>
					{localDate(expense.date)}
					{expense.issue}
					<span slot="sub" style:color={expense.category?.color}>{expense.category?.name}</span>
					<span slot="end">{currency(expense.amount)}</span>
				</ListItem>
			{/each}
		{/if}
	{/each}
</List>

<Float>
	<Button>New</Button>
</Float>
