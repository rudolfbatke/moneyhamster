<script>
	import Button from './Button.svelte';
	import CloseIcon from '$lib/icons/CloseIcon.svelte';
	import CopyIcon from '$lib/icons/CopyIcon.svelte';
	import DeleteIcon from '$lib/icons/DeleteIcon.svelte';

	/**
	 * Executed when the user clicks on a button
	 * The value of the button is passed to the parent component
	 *
	 * @type {((action: DialogAction) => void)}
	 */
	export let onButtonClick = () => {};

	export let duplicateButton = false;
	export let actionButtons = true;
	export let open = false;
</script>

<dialog {open}>
	<div class="overlay">
		<div class="dialog">
			<div class="title">
				<h2>
					<slot name="title">Dialog</slot>
				</h2>
				<Button on:click={() => onButtonClick('close')}>
					<CloseIcon />
				</Button>
			</div>
			<div class="content">
				<slot />
			</div>
			{#if actionButtons}
				<div class="actions">
					<Button color="primary" variant="fill" on:click={() => onButtonClick('save')}>Save</Button
					>
					<div>
						<Button on:click={() => onButtonClick('delete')} color="danger">
							<DeleteIcon />
						</Button>
						{#if duplicateButton}
							<Button on:click={() => onButtonClick('duplicate')}>
								<CopyIcon />
							</Button>
						{/if}
					</div>
				</div>
			{/if}
		</div>
	</div>
</dialog>

<style>
	dialog {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.5);
		z-index: 100;
	}

	.dialog {
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		max-width: 90%;
		background-color: var(--background-color);
		border-radius: 1.5rem;
		z-index: 1000;
		border: 1px solid var(--border-color);
		width: 500px;
		padding: 1rem;
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
