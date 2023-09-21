<script>
	/** @type {'primary' | 'danger' | undefined} */
	export let color = undefined;

	/** @type {'fill' | 'outline' | undefined} */
	export let variant = undefined;

	/** @type {string |undefined} */
	export let value = undefined;
</script>

<button
	class:danger={color === 'danger'}
	class:primary={color === 'primary'}
	class:fill={variant === 'fill'}
	class:outline={variant === 'outline'}
	on:click
	{value}
>
	<slot />
</button>

<style>
	button {
		display: inline-flex;
		border-radius: 1.2rem;
		border: 1px solid;
		cursor: pointer;
		font-size: 1em;
		font-weight: 600;
		padding: 0.5em 1em;
		align-items: center;
		border-color: var(--button-border-color, var(--background-color));
		background-color: var(--button-background-color, var(--background-color));
		color: var(--button-text-color, var(--text-color));
		min-height: 2.5rem;
	}

	button:hover {
		background-color: var(--button-background-hover, var(--background-hover));
	}

	button:focus {
		outline: none;
		border: 1px solid var(--focus-color);
	}

	.fill {
		--button-border-color: var(--text-color);
		--button-background-color: var(--text-color);
		--button-text-color: var(--background-color);
	}

	.fill:hover {
		--button-background-hover: var(--text-hover);
	}

	.primary {
		--button-text-color: var(--primary-color);
		--text-color: var(--primary-color);
	}
	.primary.fill {
		--button-border-color: var(--primary-color);
		--button-background-color: var(--primary-color);
		--button-text-color: var(--background-color);
		--text-color: var(--background-color);
	}
	.primary.fill:hover {
		--button-background-hover: var(--primary-hover);
	}
	.primary.outline {
		--button-border-color: var(--primary-color);
	}

	.danger {
		--button-text-color: var(--danger-color);
		--text-color: var(--danger-color);
	}
</style>
