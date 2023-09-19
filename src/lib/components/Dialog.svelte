<script>
	import { createEventDispatcher } from 'svelte';
	import Button from './Button.svelte';

	const dispatch = createEventDispatcher();

	/**
	 * This is the code that is executed when the user clicks on the button
	 * The value of the button is passed to the parent component
	 *
	 * @param {'confirm'|'cancel'} action
	 */
	const click = (action) => dispatch('action', action);
</script>

<div class="overlay">
	<dialog open>
		<h2 class="title">
			<slot name="title">Title</slot>
		</h2>
		<div class="content">
			<slot />
		</div>
		<form class="actions">
			<Button on:click={() => click('confirm')}>Yes</Button>
			<Button on:click={() => click('cancel')}>No</Button>
		</form>
	</dialog>
</div>

<style>
	.overlay {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.5);
		z-index: 100;
	}

	dialog {
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		max-width: 90%;
		background-color: var(--background-color);
		border-radius: 9px;
		z-index: 1000;
		border: 1px solid var(--border-color);
	}

	dialog .title {
		margin-top: 0;
		color: var(--text-color);
	}

	dialog .content {
		margin-top: 20px;
	}

	dialog .actions {
		margin-top: 20px;
		text-align: right;
	}

	@media (max-width: 576px) {
		dialog {
			width: 100%;
			max-width: 100%;
		}
	}
</style>
