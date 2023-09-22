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
		style={backgroundColor ? `background-color: ${backgroundColor}` : ''}
		on:click
	/>
</div>

<style>
	div {
		display: flex;
		flex-direction: column;
		color: var(--text-color);
		padding-bottom: 1rem;
	}

	label {
		margin-bottom: 0.2rem;
		color: var(--text-color);
		padding-left: 0.5rem;
	}

	input {
		border: 1px solid var(--border-color);
		border-radius: 1rem;
		padding: 0.5rem;
		font-size: 1rem;
		background-color: var(--background-color);
		color: var(--text-color);
	}

	input:focus {
		outline: none;
		border: 1px solid var(--focus-color);
	}
</style>
