<script>
  import { lastSyncDateStore, pinStore } from '$lib/stores';
  import { localDateTime } from '$lib/utilities/formatter';
  import { syncData } from '$lib/utilities/sync';
  import Button from './Button.svelte';
  import Input from './Input.svelte';
  import Dialog from './Dialog.svelte';
  import VisibilityButton from './VisibilityButton.svelte';

  let id = '';
  let pin = '';
  let syncActive = !!localStorage.getItem('si') && $pinStore;
  let openSecretDialog = false;
  let pinVisible = false;

  /** @param {DialogAction} action */
  function onSecretDialogButtonClick(action) {
    if ('close' === action) id = pin = '';
    if ('save' === action) {
      localStorage.setItem('si', id);
      pinStore.set(pin);
      syncData(pin);
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
        Please choose a PIN with 6 digits:
        <div class="same-line">
          <Input
            inputProps={{
              value: pin,
              type: pinVisible ? 'text' : 'password',
              placeholder: 'e.g. 123456',
              minlength: 8,
              maxlength: 8,
              inputmode: 'numeric',
              id: 'pin',
              required: true
            }}
            labelWidth="27px"
            onInput={(value) => (pin = value)}
            label="PIN"
          />
          <VisibilityButton bind:visible={pinVisible} />
        </div>
      </form>
    </Dialog>
  {:else}
    Syncing will occur automatically when you make changes.
    <div class="same-line">
      Last synced: {localDateTime($lastSyncDateStore)}
      <Button color="primary" on:click={() => syncData($pinStore)}>Sync Now</Button>
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
