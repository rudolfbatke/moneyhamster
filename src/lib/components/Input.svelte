<script>
	/** @type {'text' | 'number' | 'date'} */
	export let type = 'text';
	export let label = '';
	/** @type {string | number} */
	export let value = '';
	export let placeholder = '';
	export let required = false;
	export let disabled = false;
	export let readonly = false;
	export let id = '';
	/** @type {string|undefined} */
	export let backgroundColor = undefined;
	export let cursorPointer = false;

	$: style = `
      cursor: ${cursorPointer ? 'pointer' : 'unset'};
      background-color: ${backgroundColor ? backgroundColor : 'var(--background-color)'};
      color: ${backgroundColor ? 'black' : 'unset'};
  `;
</script>

<div>
	<label for={id}>
		{label}
	</label>
	<input
		{type}
		{value}
		{placeholder}
		{required}
		{disabled}
		{readonly}
		{id}
		step="any"
		{style}
		on:click
	/>
</div>

<style>
	div {
		display: flex;
		color: var(--text-color);
		padding-bottom: 1rem;
		align-items: center;
	}

	label,
	input {
		font-size: 1rem;
	}

	label {
		color: var(--text-light);
		padding-top: 0.3rem;
		margin-right: 0.5rem;
	}

	input {
		flex-grow: 1;
		border: 1px solid var(--border-color);
		border-radius: 1rem;
		padding: 0.5rem;
		background-color: var(--background-color);
		color: var(--text-color);
	}

	input:focus {
		outline: none;
		border: 1px solid var(--focus-color);
	}
</style>
