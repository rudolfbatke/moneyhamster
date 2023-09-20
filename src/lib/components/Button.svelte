<script>
	/** @type {'primary' | 'danger'} */
	export let color = 'primary';
	/** @type {'fill' | 'outline' | 'plain'} */
	export let style = 'fill';
</script>

<button
	class:danger={color === 'danger'}
	class:fill={style === 'fill'}
	class:outline={style === 'outline'}
	class:plain={style === 'plain'}
	on:click
>
	<slot />
</button>

<style>
	button {
		border: 1px solid var(--primary-color);
		border-radius: 1rem;
		color: var(--background-color);
		cursor: pointer;
		padding: 0.5em 1em;
		background-color: var(--primary-color);
		font-size: 1em;
	}

	button:hover {
		background-color: var(--primary-hover);
	}

	button.outline,
	button.plain {
		background-color: transparent;
		color: var(--primary-color);
	}

	button.outline:hover,
	button.plain:hover {
		background-color: var(--background-hover);
	}

	button.plain {
		border: none;
	}

	.danger {
		border-color: var(--danger-color);
		color: var(--danger-color);
		background-color: var(--danger-color);
	}
	.danger.outline {
		color: var(--danger-color);
	}
</style>
