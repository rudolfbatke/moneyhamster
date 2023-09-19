<script>
	export let outlined = false;
</script>

<button class:outlined>
	<slot />
</button>

<style>
	button {
		border: 1px solid var(--primary-color);
		border-radius: 4px;
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
</style>
