<script>
	import Button from '$lib/components/Button.svelte';
	import Dialog from '$lib/components/Dialog.svelte';
	import Float from '$lib/components/Float.svelte';
	import Input from '$lib/components/Input.svelte';

	import List from '$lib/components/List.svelte';
	import ListItem from '$lib/components/ListItem.svelte';
	import NoItems from '$lib/components/NoItems.svelte';
	import Select from '$lib/components/Select.svelte';
	import Topbar from '$lib/components/Topbar.svelte';
	import { openAppDB } from '$lib/db';
	import AddIcon from '$lib/icons/AddIcon.svelte';
	import { categoriesStore, expensesStore, openListItemsStore } from '$lib/stores';
	import { currency, localDate, localMonthYear, now, today } from '$lib/utilities/formatter';
	import {
		getIndexById,
		getMonthExpenses,
		getNextId,
		sortExpenses,
		sum,
		undeletedItems
	} from '$lib/utilities/list';
	import { syncData } from '$lib/utilities/sync';

	/** @type {Expense | undefined}*/
	let editExpense = undefined;

	let expenseIsNew = false;

	/** @type {HTMLFormElement | undefined}*/
	let form = undefined;

	$: expenses = undeletedItems($expensesStore);

	$: categories = undeletedItems($categoriesStore);

	$: monthExpenses = getMonthExpenses(expenses);

	function initNewExpense() {
		expenseIsNew = true;
		editExpense = {
			id: getNextId(expenses),
			date: today(),
			issue: '',
			amount: 0,
			category: 0,
			updatedAt: now()
		};
	}

	/** @param {DialogAction} action */
	async function onDialogButtonClick(action) {
		if (editExpense === undefined) return;

		if (action === 'close') {
			editExpense = undefined;
			expenseIsNew = false;
			return;
		}

		if (action === 'duplicate') {
			editExpense = {
				...editExpense,
				id: getNextId(expenses),
				date: today()
			};
			expenseIsNew = true;
			return;
		}

		if (action === 'delete') {
			editExpense.updatedAt = editExpense.deletedAt = now();
		}

		if (action === 'save') {
			if (!form?.reportValidity()) return;
			editExpense = {
				...editExpense,
				date: form.date.value,
				issue: form.issue.value,
				amount: Number(form.amount.value),
				category: Number(form.category.value),
				updatedAt: new Date().toISOString()
			};
		}

		// if new expense, add to list of expenses, else update
		const index = getIndexById(expenses, editExpense.id);
		let updatedExpenses = [...expenses];
		if (index === -1) {
			updatedExpenses = sortExpenses([...expenses, editExpense]);
		} else {
			updatedExpenses[index] = editExpense;
		}

		expensesStore.set(updatedExpenses);

		const db = await openAppDB();
		await db.put('expenses', editExpense);

		syncData({ expenses: updatedExpenses, categories });

		editExpense = undefined;
		expenseIsNew = false;
	}

	/** @param {Expense[]} expenses */
	function expensesWithCategories(expenses) {
		const sortedExpenses = sortExpenses(expenses);
		const expenseItems = sortedExpenses.map((e) => {
			const category = categories.find((c) => c.id === e.category);
			return { expense: e, category };
		});
		return expenseItems;
	}
</script>

<Topbar>Expenses</Topbar>

{#if expenses.length === 0}
	<NoItems />
{/if}

<List>
	{#each Object.entries(monthExpenses) as [month, expenses]}
		<ListItem sticky border on:click={() => openListItemsStore.toggle(month)} hover>
			<span>{localMonthYear(month)}</span>
			<span slot="end">{currency(sum(expenses))}</span>
		</ListItem>
		{#if $openListItemsStore.includes(month)}
			{#each expensesWithCategories(expenses) as { expense, category }}
				<ListItem lucent on:click={() => ((editExpense = expense), (expenseIsNew = false))} hover>
					{`${localDate(expense.date)} ${expense.issue}`}
					<span slot="sub" style:color={category?.color}>{category?.name || 'No Category'}</span>
					<span slot="end">{currency(expense.amount)}</span>
				</ListItem>
			{/each}
		{/if}
	{/each}
</List>

<Dialog onButtonClick={onDialogButtonClick} duplicateButton open={!!editExpense}>
	<span slot="title">{expenseIsNew ? 'New Expense' : 'Edit Expense'}</span>
	<form bind:this={form}>
		<Input label="Date:" id="date" type="date" required value={editExpense?.date || today()} />
		<Input
			label="Issue:"
			id="issue"
			type="text"
			required
			placeholder="e.g. Lunch"
			value={editExpense?.issue}
		/>
		<Input
			label="Cost amount:"
			id="amount"
			type="number"
			required
			placeholder="e.g. 12.34"
			value={editExpense?.amount || ''}
		/>
		<Select
			label="Category:"
			id="category"
			value={editExpense?.category || ''}
			placeholder="select a category"
		>
			{#each categories as category}
				<option value={category.id}>{category.name}</option>
			{/each}
		</Select>
	</form>
</Dialog>

<Float>
	<Button variant="fill" color="primary" on:click={() => initNewExpense()}>
		<AddIcon />
	</Button>
</Float>
