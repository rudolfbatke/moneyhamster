<script>
	import { browser } from '$app/environment';
	import Button from '$lib/components/Button.svelte';
	import Dialog from '$lib/components/Dialog.svelte';
	import Float from '$lib/components/Float.svelte';
	import Input from '$lib/components/Input.svelte';

	import List from '$lib/components/List.svelte';
	import ListItem from '$lib/components/ListItem.svelte';
	import Topbar from '$lib/components/Topbar.svelte';
	import AddIcon from '$lib/icons/AddIcon.svelte';
	import { currency, kebapDate, localDate, localMonthYear } from '$lib/utilities/formatter';
	import { sortCategories, sortExpenses } from '$lib/utilities/list';
	import { nanoid } from 'nanoid';

	/**
	 * @typedef {import('../../../types').CompleteExpense} CompleteExpense
	 * @typedef {import('../../../types').Category} Category
	 * @typedef {import('../../../types').Expense} Expense
	 */

	/** @type {Expense[]}*/
	let expenses = [];

	/** @type {Category[]}*/
	let categories = [];

	/** @type {Map<string, CompleteExpense[]>}*/
	let groubedExpenses = new Map();

	/** @type {string[]}*/
	let openLineItems = [];

	/** @type {Expense | undefined}*/
	let editExpense = undefined;

	let newExpense = false;

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

	function today() {
		return kebapDate(new Date());
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

{#if newExpense || editExpense}
	<Dialog on:action={() => (editExpense = undefined)}>
		<span slot="title">{editExpense ? 'Edit Expense' : 'New Expense'}</span>
		<form>
			<Input label="Date" type="date" required value={editExpense?.date || today()} />
			<Input
				label="Issue"
				type="text"
				required
				placeholder="e.g. Lunch"
				value={editExpense?.issue}
			/>
			<Input
				label="Cost amount"
				type="number"
				required
				placeholder="e.g. 12.34"
				value={editExpense?.amount}
			/>
		</form>
	</Dialog>
{/if}

<Float>
	<Button variant="fill" color="primary" on:click={() => (newExpense = true)}>
		<AddIcon />
	</Button>
</Float>
