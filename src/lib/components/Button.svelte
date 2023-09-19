<script>
	/** @type {boolean} */
	export let outlined = false;
	/** @type {'primary' | 'danger'} */
	export let color = 'primary';
</script>

<button class:danger={color === 'danger'} class:outlined on:click>
	<slot />
</button>

<style>
	button {
		border: 1px solid var(--primary-color);
		border-radius: 18px;
		color: var(--background-color);
		cursor: pointer;
		padding: 0.5em 1em;
		background-color: var(--primary-color);
		font-size: 1em;
	}

	button:hover {
		background-color: var(--primary-hover);
	}

	button.outlined {
		background-color: transparent;
		color: var(--primary-color);
	}

	button.outlined:hover {
		background-color: var(--background-hover);
	}

	.danger {
		border-color: var(--danger-color);
		color: var(--danger-color);
		background-color: var(--danger-color);
	}
	.danger.outlined {
		color: var(--danger-color);
	}
</style>
