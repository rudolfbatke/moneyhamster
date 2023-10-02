<script>
	import { openAppDB } from '$lib/db';
	import { createPeerConnection } from '$lib/utilities/rtc';
	import Button from './Button.svelte';

	/** @type {CreatePeerConnectionResponse|undefined} */
	let connectionResponse;

	/** @type {string|undefined} */
	let hostDescription;

	/** @type {string|undefined} */
	let qrcode;

	let connectionReady = false;

	let recievedMessage = '';

	const onChannelOpen = () => console.log('onChanelOpen');

	/** @param {string} message */
	const onMessageReceived = (message) => console.log(message);

	/** @param {string|undefined} remoteDescription */
	const createConnection = (remoteDescription = undefined) =>
		createPeerConnection({
			onChannelOpen,
			onMessageReceived,
			remoteDescription
		});

	/** @param {'host'|'guest'} role */
	const connect = async (role) => {
		const db = await openAppDB();
		const host = await db.get('webrtc', 'host');
		const guest = await db.get('webrtc', 'guest');

		if (role === 'host') {
			if (!hostDescription) {
				connectionResponse = await createConnection();
				hostDescription = connectionResponse.localDescription;
				db.put('webrtc', { description: hostDescription, id: 'host' });
			} else if (guest) {
				connectionResponse?.setAnswerDescription(guest.description);
			}
		}

		if (role === 'guest') {
			const remoteDescription = host?.description;
			connectionResponse = await createConnection(remoteDescription);
			db.put('webrtc', { description: connectionResponse.localDescription, id: 'guest' });
		}

		// qrcode = await QRCode.toDataURL(remoteDescription);

		console.log(connectionResponse);
	};
</script>

<div class="buttons">
	<Button variant="fill" color="primary" on:click={() => connect('host')}>Connect as Host</Button>
	<Button variant="outline" color="primary" on:click={() => connect('guest')}
		>Connect as Guest</Button
	>
	<Button variant="outline" color="primary" on:click={() => connectionResponse?.sendMessage('test')}
		>Send text</Button
	>
</div>

{#if recievedMessage}
	<p>{recievedMessage}</p>
{/if}

{#if connectionReady}
	<p>Connection ready!</p>
{/if}

{#if qrcode}
	<img class="qrcode" src={qrcode} alt="qrcode" />
{/if}

<style>
	.qrcode {
		width: 100%;
		max-width: 333px;
	}

	.buttons {
		display: flex;
		gap: 1rem;
	}
</style>
