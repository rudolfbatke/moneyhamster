<script>
	export let label = '';
	/** @type {string | number} */
	export let value = '';
	export let placeholder = '';
	export let required = false;
	export let disabled = false;
	export let id = '';
</script>

<div>
	<label for={id}>
		{label}
	</label>

	<select {value} {placeholder} {required} {disabled} {id}>
		<option disabled selected value>{placeholder}</option>
		<slot />
	</select>
</div>

<style>
	div {
		display: flex;
		flex-direction: column;
		color: var(--text-color);
		padding-bottom: 1rem;
	}

	label {
		font-size: 1rem;
		margin-bottom: 0.2rem;
		color: var(--text-color);
		padding-left: 0.5rem;
	}

	select {
		border: 1px solid var(--border-color);
		border-radius: 1rem;
		padding: 0.5rem;
		font-size: 1rem;
		background-color: var(--background-color);
		color: var(--text-color);
	}

	select:focus {
		outline: none;
		border: 1px solid var(--focus-color);
	}
</style>
