<script>
  import { openAppDB } from '$lib/db';
  import { categoriesStore, expensesStore, lastSyncDateStore } from '$lib/stores';
  import { localDateTime } from '$lib/utilities/formatter';
  import { syncData } from '$lib/utilities/sync';
  import { onMount } from 'svelte';
  import Button from './Button.svelte';
  import Input from './Input.svelte';

  let syncActive = false;
  let syncId = '';
  /** @type {import('idb').IDBPDatabase<AppDB>}*/
  let db;

  async function activateSync() {
    await db.put('sync', syncId, 'sync-id');
    await sync();
    syncActive = true;
  }

  function deactivateSync() {
    syncActive = false;
    db.clear('sync');
  }

  async function sync() {
    const data = {
      expenses: $expensesStore,
      categories: $categoriesStore
    };
    await syncData(data);
  }

  onMount(async () => {
    db = await openAppDB();
    const dbSyncId = await db.get('sync', 'sync-id');
    if (typeof dbSyncId === 'string') {
      syncId = dbSyncId;
      syncActive = !!syncId;
    }
  });
</script>

<component id="sync">
  {#if !syncActive}
    For the syncing to work, you need to activate it.
    <form>
      <div class="same-line">
        <Input
          label="Sync ID:"
          inputProps={{
            placeholder: 'e.g. 12345678',
            id: 'sync-id',
            inputmode: 'numeric'
          }}
          onInput={(value) => (syncId = value)}
          inputWidth="9rem"
        />
        <Button
          variant="outline"
          disabled={syncId.length < 8}
          color="primary"
          on:click={activateSync}>Activate Sync</Button
        >
      </div>
    </form>
  {:else}
    Syncing will occur automatically when you make changes.
    <div class="same-line">
      Last synced: {localDateTime($lastSyncDateStore)}
      <a href="?force-sync" on:keydown={sync} on:click={sync}>Force Sync</a>
    </div>
    <p />
    <Button variant="outline" color="danger" on:click={deactivateSync}>Deactivate Sync</Button>
    <div id="qrcode" />
  {/if}
</component>

<style>
  .same-line {
    display: flex;
    gap: 0.5rem;
    padding-top: 1rem;
  }
</style>
