<script>
  import Alert from '$lib/components/Alert.svelte';
  import Button from '$lib/components/Button.svelte';
  import { openAppDB } from '$lib/db';
  import { categoriesStore, expensesStore, openListItemsStore } from '$lib/stores';
  import { kebapDate } from '$lib/utilities/formatter';

  /** @type {HTMLInputElement} */
  let fileInputElement;

  let restoreAlertIsOpen = false;

  async function backup() {
    const db = await openAppDB();

    /** @type {BackupData} */
    const data = {
      expenses: await db.getAll('expenses'),
      categories: await db.getAll('categories'),
      openListItems: $openListItemsStore,
      version: '1'
    };

    const blob = new Blob([JSON.stringify(data)], {
      type: 'application/json;charset=utf-8'
    });

    // save file to downloads folder
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `hamster.cash-${kebapDate(new Date())}.json`;
    a.click();
    a.remove();
  }

  function restore() {
    const { files } = fileInputElement;
    if (files) {
      const reader = new FileReader();
      reader.readAsText(files[0], 'UTF-8');
      reader.onload = async (event) => {
        /** @type {BackupData} */
        const { expenses, categories, openListItems } = JSON.parse(
          event.target?.result?.toString() || '{}'
        );
        console.log(expenses, categories, openListItems);
        expensesStore.set(expenses || []);
        categoriesStore.set(categories || []);
        openListItemsStore.set(openListItems || []);

        const db = await openAppDB();
        await Promise.all([db.clear('expenses'), db.clear('categories')]);
        await Promise.all([
          ...expenses.map((expense) => db.put('expenses', expense)),
          ...categories.map((category) => db.put('categories', category))
        ]);
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
    margin-bottom: 2em;
  }
</style>
