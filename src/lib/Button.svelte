<button>
	<slot />
</button>

<style>
	button {
		border: 1px solid var(--primary-color);
		border-radius: 4px;
		color: var(--primary-color);
		cursor: pointer;
		padding: 0.5em 1em;
		background-color: var(--background-color);
		opacity: 0.8;
		font-size: 1em;
	}

	button:hover {
		background-color: var(--background-hover);
	}
</style>
