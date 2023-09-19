<script>
	import { createEventDispatcher } from 'svelte';
	import Button from './Button.svelte';

	const dispatch = createEventDispatcher();

	/**
	 * This is the code that is executed when the user clicks on the button
	 * The value of the button is passed to the parent component
	 *
	 * @param {'save'|'cancel'|'delete'|'copy'} action
	 */
	const click = (action) => dispatch('action', action);
</script>

<div class="overlay">
	<dialog open>
		<div class="title">
			<h2>
				<slot name="title">Title</slot>
			</h2>
			<Button on:click={() => click('cancel')} outlined>Cancel</Button>
		</div>
		<div class="content">
			<slot />
		</div>
		<form class="actions">
			<div>
				<Button color="danger" outlined on:click={() => click('delete')}>Delete</Button>
				<Button outlined on:click={() => click('copy')}>Copy</Button>
			</div>
			<Button on:click={() => click('save')}>Save</Button>
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

	.title {
		width: 321px;
	}

	.title {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.title > h2 {
		margin: 0;
		color: var(--text-color);
	}

	.content {
		margin-top: 20px;
	}

	.actions {
		display: flex;
		justify-content: space-between;
		margin-top: 20px;
		text-align: right;
	}
</style>
