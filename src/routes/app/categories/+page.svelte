<script>
	import Button from '$lib/components/Button.svelte';
	import Dialog from '$lib/components/Dialog.svelte';
	import Float from '$lib/components/Float.svelte';
	import Input from '$lib/components/Input.svelte';

	import Topbar from '$lib/components/Topbar.svelte';
	import AddIcon from '$lib/icons/AddIcon.svelte';
	import { sortCategories } from '$lib/utilities/list';

	/**
	 * @typedef {import('./../types').Category} Category
	 * @typedef {import('./../types').Expense} Expense
	 * @typedef {import('../../../lib/components/types').DialogAction} DialogAction
	 */

	/** @type {Expense[]}*/
	let expenses = [];

	/** @type {Category[]}*/
	let categories = [];

	/** @type {Category | undefined}*/
	let editCategory = undefined;

	/** @type {boolean | undefined}*/
	let categoryIsNew = undefined;

	/** @type {HTMLFormElement | undefined}*/
	let form = undefined;

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

		if (action === 'close') {
			editCategory = undefined;
			return;
		}

		if (action === 'delete') {
			categories = categories.filter((c) => c.id !== editCategory?.id);
			editCategory = undefined;
			return;
		}

		if (action === 'save') {
			if (!form?.reportValidity()) return;
			editCategory = {
				...editCategory,
				name: form.issue.name,
				color: form.issue.color
			};

			// if new category, add to list of categories and sort
			const index = categories.findIndex((e) => e.id === editCategory?.id);
			if (index === -1) {
				categories = sortCategories([...categories, editCategory]);
			} else {
				categories[index] = editCategory;
			}
			editCategory = undefined;
			return;
		}
	}
</script>

<Topbar>Categories</Topbar>

{#if editCategory !== undefined}
	<Dialog onButtonClick={onDialogButtonClick}>
		<span slot="title">{categoryIsNew ? 'New Category' : 'Edit Category'}</span>
		<form bind:this={form}>
			<Input label="Name" id="name" required placeholder="e.g. Food" value={editCategory.name} />
		</form>
	</Dialog>
{/if}

<Float>
	<Button variant="fill" color="primary" on:click={() => setNewCategory()}>
		<AddIcon />
	</Button>
</Float>
