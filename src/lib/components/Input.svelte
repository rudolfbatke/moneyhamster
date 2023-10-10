<script>
	/** @type {'text' | 'number' | 'date' | 'password'} */
	export let type = 'text';
	export let label = '';
	/** @type {string | number} */
	export let value = '';
	export let placeholder = '';
	export let required = false;
	export let disabled = false;
	export let readonly = false;
	export let id = '';
	export let inputWidth = '123px';
	export let labelWidth = 'unset';
	export let backgroundColor = 'unset';
	export let cursor = 'unset';
	/** @type {(value: string) => void} */
	export let onInput = () => {};

	$: labelStyle = `
      width: ${labelWidth};
  `;

	$: inputStyle = `
      cursor: ${cursor};
      background-color: ${backgroundColor ? backgroundColor : 'var(--background-color)'};
      width: ${inputWidth};
  `;

	/** @type {import('svelte/elements').FormEventHandler<HTMLInputElement>}*/
	function oninput(e) {
		const target = e.currentTarget;
		if (target instanceof HTMLInputElement) {
			onInput(target.value);
		}
	}
</script>

<div>
	<label for={id} style={labelStyle}>
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
		name={id}
		step="any"
		style={inputStyle}
		on:click
		on:input={oninput}
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
