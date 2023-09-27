<script>
	import Button from './Button.svelte';

	export let open = false;
	export let onConfirm = () => {};
	export let onCancel = () => {};
</script>

{#if open}
	<div class="overlay">
		<dialog open>
			<div class="content">
				<slot />
				<div class="actions">
					<Button color="primary" variant="fill" on:click={onCancel}>No</Button>
					<Button on:click={onConfirm} color="danger">Yes</Button>
				</div>
			</div>
		</dialog>
	</div>
{/if}

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
		border-radius: 1.5rem;
		z-index: 2000;
		border: 1px solid var(--border-color);
		width: 500px;
		color: var(--text-color);
	}

	.actions {
		display: flex;
		justify-content: space-between;
		margin-top: 20px;
		text-align: right;
	}
</style>
