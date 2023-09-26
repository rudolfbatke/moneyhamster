<script>
	import Button from '$lib/components/Button.svelte';
	import Dialog from '$lib/components/Dialog.svelte';
	import Float from '$lib/components/Float.svelte';
	import Input from '$lib/components/Input.svelte';

	import Topbar from '$lib/components/Topbar.svelte';
	import AddIcon from '$lib/icons/AddIcon.svelte';
	import { currency, getYearMonth, monthSlashYear } from '$lib/utilities/formatter';
	import { sortCategories } from '$lib/utilities/list';
	import { expensesStore, categoriesStore } from '$lib/stores';
	import { categoryColors } from '$lib/settings';

	/**
	 * @typedef {import('$lib/types').Category} Category
	 * @typedef {import('$lib/types').CategoryMonthlyAmounts} CategoryMonthlyAmounts
	 * @typedef {import('$lib/components/types').DialogAction} DialogAction
	 */

	/** @type {Category | undefined}*/
	let editCategory = undefined;

	/** @type {boolean | undefined}*/
	let categoryIsNew = undefined;

	/** @type {HTMLFormElement | undefined}*/
	let form = undefined;

	/** open color select dialog */
	let selectColor = false;

	$: expenses = $expensesStore;

	$: categories = $categoriesStore;

	$: categoryMonthlyAmounts = expenses.reduce((/**@type CategoryMonthlyAmounts*/ acc, e) => {
		const { date: expenseDate, amount: expenseAmount, category: categoryId } = e;
		const month = getYearMonth(expenseDate);
		const monthlyAmounts = (acc[categoryId] = acc[categoryId] || {});
		const monthlyAmount = (monthlyAmounts[month] = monthlyAmounts[month] || {
			total: 0,
			expenses: []
		});
		monthlyAmount.total += expenseAmount;
		monthlyAmount.expenses.push(e);
		return acc;
	}, {});

	$: months = Object.keys(categoryMonthlyAmounts)
		.reduce((/** @type {string[]} */ acc, categoryId) => {
			const monthlyAmounts = categoryMonthlyAmounts[Number(categoryId)];
			Object.keys(monthlyAmounts).forEach((month) => {
				if (!acc.includes(month)) acc.push(month);
			});
			return acc;
		}, [])
		.sort();

	$: years = months
		.map((m) => m.split('-')[0])
		.filter((v, i, a) => a.indexOf(v) === i)
		.sort();

	$: monthlyTotals = months.map((month) => {
		return categories.reduce((acc, category) => {
			const monthlyAmounts = categoryMonthlyAmounts[category.id];
			const monthlyAmount = monthlyAmounts?.[month];
			return acc + (monthlyAmount?.total || 0);
		}, 0);
	});

	$: yearlyTotals = years.map((year) => {
		return categories.reduce((acc, category) => {
			return acc + sumYearByCategory(category.id, year);
		}, 0);
	});

	function setNewCategory() {
		categoryIsNew = true;
		editCategory = {
			id: (categories.at(-1)?.id || 0) + 1,
			name: '',
			color: 'Gray'
		};
	}

	/** @param {DialogAction} action */
	function onDialogButtonClick(action) {
		if (editCategory === undefined) return;

		let updatedCategories = [...categories];

		if (action === 'delete') {
			updatedCategories = categories.filter((c) => c.id !== editCategory?.id);
		}

		if (action === 'save') {
			if (!form?.reportValidity()) return;
			editCategory = {
				...editCategory,
				name: form.issue.value
				// color: form.color.value
			};

			// if new category, add to list of categories and sort
			const index = updatedCategories.findIndex((e) => e.id === editCategory?.id);
			if (index === -1) {
				updatedCategories = sortCategories([...updatedCategories, editCategory]);
			} else {
				updatedCategories[index] = editCategory;
			}
		}
		editCategory = undefined;
		categoriesStore.set(updatedCategories);
	}

	/**
	 * @param {number} categoryId
	 * @param {string} year
	 */
	function sumYearByCategory(categoryId, year) {
		return months
			.filter((m) => m.startsWith(year))
			.reduce((acc, month) => {
				const monthlyAmounts = categoryMonthlyAmounts[categoryId];
				const monthlyAmount = monthlyAmounts?.[month];
				return acc + (monthlyAmount?.total || 0);
			}, 0);
	}

	/**
	 * @param {string|undefined} color
	 */
	function setColor(color) {
		if (!editCategory) return;
		editCategory = {
			...editCategory,
			color
		};
		selectColor = false;
	}
</script>

<Topbar>Categories</Topbar>

<div class="table">
	<div class="header row">
		<div class="cell category">Category</div>
		<div class="cells">
			{#each months as month}
				<div class="cell">
					{monthSlashYear(month)}
				</div>
			{/each}
			{#each years as year}
				<div class="cell">
					{year}
				</div>
			{/each}
		</div>
	</div>

	{#each categories as category}
		<div class="content row">
			<div
				on:click={() => (editCategory = category)}
				on:keypress={() => {}}
				class="cell category"
				style={`color: ${category.color}`}
			>
				{category.name}
			</div>
			<div class="cells">
				{#each months as month}
					<div class="cell">
						{currency(categoryMonthlyAmounts[category.id]?.[month]?.total || 0, 0)}
					</div>
				{/each}
				{#each years as year}
					<div class="cell">
						{currency(sumYearByCategory(category.id, year), 0)}
					</div>
				{/each}
			</div>
		</div>
	{/each}

	<div class="totals row">
		<div class="cell category">Totals</div>
		<div class="cells">
			{#each monthlyTotals as total}
				<div class="cell">
					{currency(total, 0)}
				</div>
			{/each}
			{#each yearlyTotals as total}
				<div class="cell">
					{currency(total, 0)}
				</div>
			{/each}
		</div>
	</div>
</div>

{#if editCategory !== undefined}
	<Dialog onButtonClick={onDialogButtonClick}>
		<span slot="title">{categoryIsNew ? 'New Category' : 'Edit Category'}</span>
		<form bind:this={form}>
			<Input label="Name" id="issue" required placeholder="e.g. Food" value={editCategory.name} />
			<Input
				label="Color"
				id="color"
				value={editCategory.color}
				readonly
				backgroundColor={editCategory.color}
				on:click={() => (selectColor = true)}
				cursorPointer
			/>
		</form>
	</Dialog>
	{#if selectColor}
		<Dialog actionButtons={false} onButtonClick={() => (selectColor = false)}>
			<span slot="title">Pick a Color</span>
			<div class="color-select">
				{#each categoryColors as color}
					<div
						class="color"
						style={`background: ${color}`}
						on:click={() => setColor(color)}
						on:keypress={() => setColor(color)}
					/>
				{/each}
			</div>
		</Dialog>
	{/if}
{/if}

<Float>
	<Button variant="fill" color="primary" on:click={() => setNewCategory()}>
		<AddIcon />
	</Button>
</Float>

<style>
	.table {
		width: fit-content;
	}

	.header {
		position: sticky;
		top: 0;
		z-index: 5;
	}

	.header,
	.totals {
		font-weight: bold;
	}

	.totals {
		position: sticky;
		bottom: 0;
		z-index: 4;
	}

	.row {
		display: flex;
	}

	.row:hover .cell {
		background: var(--background-hover) !important;
	}

	.cells {
		display: flex;
		z-index: 2;
		padding-right: 1rem;
	}

	.cell {
		width: 4rem;
		height: 3rem;
		background: var(--background-color);
		display: flex;
		align-items: center;
		justify-content: right;
	}

	.category.cell {
		width: 6rem;
		min-width: 6rem;
		position: sticky;
		left: 0;
		z-index: 3;
		padding-left: 1rem;
		word-break: break-all;
		justify-content: left;
	}

	.content > .category {
		cursor: pointer;
	}

	.color-select {
		display: flex;
		width: 100%;
		flex-wrap: wrap;
	}

	.color-select > div {
		width: calc(25%);
		height: 50px;
		cursor: pointer;
	}

	.color:hover {
		opacity: 0.8;
	}

	.color:first-child {
		border-top-left-radius: 1rem;
	}
	.color:nth-child(4) {
		border-top-right-radius: 1rem;
	}
	.color:nth-last-child(4) {
		border-bottom-left-radius: 1rem;
	}
	.color:last-child {
		border-bottom-right-radius: 1rem;
	}
</style>
