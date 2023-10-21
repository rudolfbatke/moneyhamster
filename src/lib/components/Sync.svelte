<script>
  import { lastSyncDateStore, } from '$lib/stores';
  import { localDateTime } from '$lib/utilities/formatter';
  import { syncData } from '$lib/utilities/sync';
  import Button from './Button.svelte';
  import Input from './Input.svelte';
  import Dialog from './Dialog.svelte';
  import VisibilityButton from './VisibilityButton.svelte';

  let id = '';
  let syncActive = !!localStorage.getItem('si');
  let openSecretDialog = false;
  let pinVisible = false;

  /** @param {DialogAction} action */
  function onSecretDialogButtonClick(action) {
    if ('close' === action) id ='';
    if ('save' === action) {
      localStorage.setItem('si', id);
      syncData();
    }
    openSecretDialog = false;
  }
</script>

<component>
  {#if !syncActive}
    <div class="same-line">
      <Button variant="outline" color="primary" on:click={() => (openSecretDialog = true)}
        >Start Activation Process</Button
      >
    </div>
    <Dialog open={openSecretDialog} onButtonClick={onSecretDialogButtonClick}>
      <span slot="title">Enter your Secrets</span>
      <form>
        <p>Enter the ID you received:</p>
        <Input
          inputProps={{
            value: { id },
            id: 'id',
            required: true,
            placeholder: 'e.g. abc12345'
          }}
          onInput={(value) => (id = value)}
          label="ID"
          labelWidth="27px"
        />
      </form>
    </Dialog>
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
