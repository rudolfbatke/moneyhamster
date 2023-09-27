<script>
	import Alert from '$lib/components/Alert.svelte';
	import Button from '$lib/components/Button.svelte';
	import { categoriesStore, expensesStore, openListItemsStore } from '$lib/stores';
	import { kebapDate } from '$lib/utilities/formatter';

	/** @type {HTMLInputElement} */
	let fileInputElement;

	let restoreAlertIsOpen = false;

	function backup() {
		const data = {
			expenses: $expensesStore,
			categories: $categoriesStore,
			openListItems: $openListItemsStore
		};

		const blob = new Blob([JSON.stringify(data)], {
			type: 'application/json;charset=utf-8'
		});

		// save file to downloads folder
		const a = document.createElement('a');
		a.href = URL.createObjectURL(blob);
		a.download = `hamster-cash-backup-${kebapDate(new Date())}.json`;
		a.click();
		a.remove();
	}

	function restore() {
		const { files } = fileInputElement;
		if (files) {
			const reader = new FileReader();
			reader.readAsText(files[0], 'UTF-8');
			reader.onload = (event) => {
				const { expenses, categories, openListItems } = JSON.parse(
					event.target?.result?.toString() || '{}'
				);
				expensesStore.set(expenses);
				categoriesStore.set(categories);
				openListItemsStore.set(openListItems);
			};
			restoreAlertIsOpen = false;
		}
	}
</script>

<div>
	The app is using the browser's local storage to store the data. This means that the data is stored
	on your device and not on a server.
	<p>
		If you want to backup your data, you can use the export function. This will create a file
		containing all your data:
	</p>
	<div class="backup-button">
		<Button variant="fill" color="primary" on:click={backup}>Backup Data</Button>
	</div>
	<p>You can import this file again to restore your data:</p>
	<div class="backup-button">
		<Button variant="outline" on:click={() => fileInputElement.click()}>Restore Data</Button>
		<input
			bind:this={fileInputElement}
			type="file"
			hidden
			on:change={() => (restoreAlertIsOpen = true)}
		/>
	</div>
	<p>
		If you want to use the app on another device, you can export your data and import it on the
		other device.
	</p>
</div>

<Alert open={restoreAlertIsOpen} onConfirm={restore} onCancel={() => (restoreAlertIsOpen = false)}>
	<p>The restoring of the data will overwrite your current data.</p>
	<p>Are you sure you want to continue?</p>
</Alert>

<style>
	.backup-button {
		text-align: center;
		margin-bottom: 2em;
	}
</style>
