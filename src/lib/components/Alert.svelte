<script>
	import Button from './Button.svelte';

	export let open = false;

	/** @type {(() => void)|undefined} */
	export let onConfirm = undefined;

	/** @type {(() => void)|undefined} */
	export let onCancel = undefined;
</script>

{#if open}
	<div class="overlay">
		<dialog open>
			<div class="content">
				<slot />
				<div class="actions">
					{#if onConfirm}
						<Button variant="outline" on:click={onConfirm} color="danger">Okay</Button>
					{/if}
					{#if onCancel}
						<Button color="primary" variant="outline" on:click={onCancel}>Cancel</Button>
					{/if}
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
	}
</style>
