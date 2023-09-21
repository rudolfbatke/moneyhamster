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
	import { currency, localDate, localMonthYear, today } from '$lib/utilities/formatter';
	import { sortCategories, sortExpenses, sum } from '$lib/utilities/list';

	/**
	 * @typedef {import('./types').Category} Category
	 * @typedef {import('./types').Expense} Expense
	 * @typedef {import('../../../lib/components/types').DialogAction} DialogAction
	 * @typedef {import('./types').MonthExpenses} MonthExpenses
	 */

	/** @type {Expense[]}*/
	let expenses = [];

	/** @type {Category[]}*/
	let categories = [];

	/** @type {MonthExpenses}*/
	let monthExpenses = {};

	/** @type {string[]}*/
	let openLineItems = [];

	/** @type {Expense | undefined}*/
	let editExpense = undefined;

	/** @type {HTMLFormElement | undefined}*/
	let form = undefined;

	// group expenses by month
	$: monthExpenses = expenses.reduce((/**@type MonthExpenses*/ acc, e) => {
		const month = localMonthYear(e.date);
		acc[month] = acc[month] ? [...acc[month], e] : [e];
		return acc;
	}, {});

	/**
	 * Show/hide expenses of a month
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

	function newExpense() {
		editExpense = {
			id: (expenses.at(-1)?.id || 0) + 1,
			date: today(),
			issue: '',
			amount: 0,
			category: 13
		};
	}

	/** @param {DialogAction} action */
	function onDialogButtonClick(action) {
		if (editExpense === undefined) return;

		if (action === 'close') {
			editExpense = undefined;
			return;
		}

		if (action === 'save') {
			if (!form?.reportValidity()) return;
			editExpense = {
				...editExpense,
				date: form.date.value,
				issue: form.issue.value,
				amount: Number(form.amount.value)
			};

			// if new expense, add to list of expenses, else update
			const index = expenses.findIndex((e) => e.id === editExpense?.id);
			if (index === -1) {
				expenses = sortExpenses([...expenses, editExpense]);
			} else {
				expenses[index] = editExpense;
			}
			editExpense = undefined;
			return;
		}
	}

	/** @param {Expense[]} expenses */
	function getExpenseItems(expenses) {
		const sortedExpenses = sortExpenses(expenses);
		const expenseItems = sortedExpenses.map((e) => {
			const category = categories.find((c) => c.id === e.category);
			return { expense: e, category };
		});
		return expenseItems;
	}

	// load data from local storage
	if (browser) {
		const unsortedExpenses = JSON.parse(window.localStorage.getItem('expenses') || '[]');
		expenses = sortExpenses(unsortedExpenses);
		const unsortedCategories = JSON.parse(window.localStorage.getItem('categories') || '[]');
		categories = sortCategories(unsortedCategories);
	}
</script>

<Topbar>Expenses</Topbar>

<List>
	{#each Object.entries(monthExpenses) as [month, expenses]}
		<ListItem sticky border on:click={() => toggleExpenses(month)}>
			<span>{month}</span>
			<span slot="end">{currency(sum(expenses))}</span>
		</ListItem>
		{#if openLineItems.includes(month)}
			{#each getExpenseItems(expenses) as { expense, category }}
				<ListItem lucent on:click={() => (editExpense = expense)}>
					{localDate(expense.date)}
					{expense.issue}
					<span slot="sub" style:color={category?.color}>{category?.name}</span>
					<span slot="end">{currency(expense.amount)}</span>
				</ListItem>
			{/each}
		{/if}
	{/each}
</List>

{#if editExpense !== undefined}
	<Dialog onButtonClick={onDialogButtonClick}>
		<span slot="title">{editExpense.issue ? 'Edit Expense' : 'New Expense'}</span>
		<form bind:this={form}>
			<Input label="Date" id="date" type="date" required value={editExpense.date || today()} />
			<Input
				label="Issue"
				id="issue"
				type="text"
				required
				placeholder="e.g. Lunch"
				value={editExpense.issue}
			/>
			<Input
				label="Cost amount"
				id="amount"
				type="number"
				required
				placeholder="e.g. 12.34"
				value={editExpense.amount || ''}
			/>
		</form>
	</Dialog>
{/if}

<Float>
	<Button variant="fill" color="primary" on:click={() => newExpense()}>
		<AddIcon />
	</Button>
</Float>
