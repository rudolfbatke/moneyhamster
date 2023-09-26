<script>
	import Button from '$lib/components/Button.svelte';
	import Dialog from '$lib/components/Dialog.svelte';
	import Float from '$lib/components/Float.svelte';
	import Input from '$lib/components/Input.svelte';

	import List from '$lib/components/List.svelte';
	import ListItem from '$lib/components/ListItem.svelte';
	import Select from '$lib/components/Select.svelte';
	import Topbar from '$lib/components/Topbar.svelte';
	import AddIcon from '$lib/icons/AddIcon.svelte';
	import { categoriesStore, expensesStore, openListItemsStore } from '$lib/stores';
	import { currency, localDate, localMonthYear, today } from '$lib/utilities/formatter';
	import { getMonthExpenses, sortExpenses, sum } from '$lib/utilities/list';

	/**
	 * @typedef {import('$lib/types').Expense} Expense
	 * @typedef {import('$lib/components/types').DialogAction} DialogAction
	 */

	/** @type {Expense | undefined}*/
	let editExpense = undefined;

	/** @type {boolean | undefined}*/
	let expenseIsNew = undefined;

	/** @type {HTMLFormElement | undefined}*/
	let form = undefined;

	$: expenses = $expensesStore;

	$: categories = $categoriesStore;

	// group expenses by month
	$: monthExpenses = getMonthExpenses(expenses);

	function setNewExpense() {
		expenseIsNew = true;
		editExpense = {
			id: (expenses.at(-1)?.id || 0) + 1,
			date: today(),
			issue: '',
			amount: 0,
			category: 0
		};
	}

	/** @param {DialogAction} action */
	function onDialogButtonClick(action) {
		if (editExpense === undefined) return;

		if (action === 'duplicate') {
			editExpense = {
				...editExpense,
				id: (expenses.at(-1)?.id || 0) + 1,
				date: today()
			};
			expenseIsNew = true;
			return;
		}

		if (action === 'delete') {
			expensesStore.update((value) => value.filter((e) => e.id !== editExpense?.id));
		}

		if (action === 'save') {
			if (!form?.reportValidity()) return;
			editExpense = {
				...editExpense,
				date: form.date.value,
				issue: form.issue.value,
				amount: Number(form.amount.value),
				category: Number(form.category.value)
			};

			// if new expense, add to list of expenses, else update
			const index = expenses.findIndex((e) => e.id === editExpense?.id);
			let expensesUpdate = [...expenses];
			if (index === -1) {
				expensesUpdate = sortExpenses([...expenses, editExpense]);
			} else {
				expensesUpdate[index] = editExpense;
			}
			expensesStore.set(expensesUpdate);
		}

		editExpense = undefined;
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
</script>

<Topbar>Expenses</Topbar>

<List>
	{#each Object.entries(monthExpenses) as [month, expenses]}
		<ListItem sticky border on:click={() => openListItemsStore.toggle(month)}>
			<span>{localMonthYear(month)}</span>
			<span slot="end">{currency(sum(expenses))}</span>
		</ListItem>
		{#if $openListItemsStore.includes(month)}
			{#each getExpenseItems(expenses) as { expense, category }}
				<ListItem lucent on:click={() => ((editExpense = expense), (expenseIsNew = false))}>
					{`${localDate(expense.date)} ${expense.issue}`}
					<span slot="sub" style:color={category?.color}>{category?.name}</span>
					<span slot="end">{currency(expense.amount)}</span>
				</ListItem>
			{/each}
		{/if}
	{/each}
</List>

{#if editExpense !== undefined}
	<Dialog onButtonClick={onDialogButtonClick} duplicateButton>
		<span slot="title">{expenseIsNew ? 'New Expense' : 'Edit Expense'}</span>
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
			<Select
				label="Category"
				id="category"
				value={editExpense.category || ''}
				placeholder="select a category"
			>
				{#each categories as category}
					<option value={category.id}>{category.name}</option>
				{/each}
			</Select>
		</form>
	</Dialog>
{/if}

<Float>
	<Button variant="fill" color="primary" on:click={() => setNewExpense()}>
		<AddIcon />
	</Button>
</Float>
