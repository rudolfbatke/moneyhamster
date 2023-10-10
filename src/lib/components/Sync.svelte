<script>
	import { lastSyncDateStore } from '$lib/stores';
	import { localDateTime } from '$lib/utilities/formatter';
	import { syncData } from '$lib/utilities/sync';
	import Button from './Button.svelte';
	import Input from './Input.svelte';
	import VisibilityButton from './VisibilityButton.svelte';

	let id = '';
	let key = '';
	let showId = false;
	let showKey = false;
	let syncActive = !!localStorage.getItem('sk') && !!localStorage.getItem('si');

	const labelWidth = '2.7rem';

	function generateKey() {
		key = crypto.randomUUID();
	}

	async function activateSync() {
		if (!id || !key) return;
		localStorage.setItem('sk', key);
		localStorage.setItem('si', id);
		await syncData();
		syncActive = true;
	}

	function deactivateSync() {
		localStorage.removeItem('sk');
		localStorage.removeItem('si');
		syncActive = false;
	}
</script>

{#if syncActive}
	Syncing will occur automatically when you make changes
	<p>You can manually sync by clicking the button below.</p>
	<p>Last synced: {localDateTime($lastSyncDateStore)}</p>
	<Button variant="fill" color="primary" on:click={syncData}>Sync Now</Button>
	<p>
		<span class="credential-label" style:width={labelWidth}> ID: </span>
		{showId ? localStorage.getItem('si') : '********'}
		<VisibilityButton bind:visibility={showId} />
	</p>
	<p>
		<span class="credential-label" style:width={labelWidth}> Key: </span>
		{showKey ? localStorage.getItem('sk') : '********'}
		<VisibilityButton bind:visibility={showKey} />
	</p>
	<p>To deactivate sync, click the button below.</p>
	<p>Be aware that your ID and Key will be removed from this device.</p>
	<Button variant="outline" color="danger" on:click={deactivateSync}>Cancel Sync</Button>
{:else}
	To sync the data you'll need a unique ID and key.
	<p>The ID is used to identify your data and the key is used to encrypt it.</p>
	<p>To get an ID, you'll need to contact us via email.</p>
	<p>Once you have an ID, you can either generate a key or type an existing one.</p>

	<div class="input-button">
		<Input
			onInput={(value) => (id = value)}
			inputWidth="108px"
			{labelWidth}
			label="ID:"
			id="id"
			placeholder="e.g. 123e4567"
		/>
		<Button color="primary" on:click={generateKey}>Generate Key</Button>
	</div>
	<Input
		onInput={(value) => (key = value)}
		{labelWidth}
		label="Key:"
		id="key"
		value={key}
		placeholder="e.g. 123e4567-123e-4567-123e-456789abcdef"
	/>
	<Button variant="fill" color="primary" on:click={activateSync}>Activate Sync</Button>
{/if}

<style>
	.input-button {
		display: flex;
		gap: 0.5rem;
	}

	.credential-label {
		display: inline-block;
	}
</style>
