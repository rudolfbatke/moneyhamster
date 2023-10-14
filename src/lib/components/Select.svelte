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
  {#if label}
    <label for={id}>
      {label}
    </label>
  {/if}

  <select {value} {placeholder} {required} {disabled} {id} on:change>
    <option disabled selected value>{placeholder}</option>
    <slot />
  </select>
</div>

<style>
  div {
    display: flex;
    color: var(--text-color);
    padding-bottom: 1rem;
    align-items: center;
  }

  label,
  select {
    font-size: 1rem;
  }

  label {
    margin-right: 0.5rem;
    padding-top: 0.1rem;
    color: var(--text-light);
  }

  select {
    color: var(--text-color);
    flex-grow: 1;
    border: 1px solid var(--border-color);
    border-radius: 1rem;
    padding: 0.5rem;
    background-color: var(--background-color);
  }

  select:focus {
    outline: none;
    border: 1px solid var(--primary-color);
  }
</style>
