<script>
  import { lastSyncDateStore } from '$lib/stores';
  import { localDateTime } from '$lib/utilities/formatter';
  import { syncData } from '$lib/utilities/sync';
  import Button from './Button.svelte';

  let syncActive = false;
</script>

<component id="sync">
  {#if !syncActive}
    For the syncing to work, you need an account.
    <p>
      <a href="/auth/login">Start login or register</a>
    </p>
  {:else}
    Syncing will occur automatically when you make changes.
    <div class="same-line">
      Last synced: {localDateTime($lastSyncDateStore)}
      <Button color="primary" on:click={() => syncData()}>Sync Now</Button>
    </div>
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
