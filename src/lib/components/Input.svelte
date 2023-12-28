<script>
  export let label = '';
  export let inputWidth = '123px';
  export let labelWidth = 'unset';
  export let backgroundColor = 'unset';
  export let cursor = 'unset';
  /** @type {(value: string) => void} */
  export let onInput = () => {};
  /** @type {import('svelte/elements').HTMLInputAttributes}*/
  export let inputProps = {};
  /** @type {'left'|'right'|'center'}*/
  export let inputAlign = 'left';
  export let fullWidth = true;

  $: containerStyle = `
      display: ${fullWidth ? 'flex' : 'block'};
  `;

  $: labelStyle = `
      width: ${labelWidth};
  `;

  $: inputStyle = `
      cursor: ${cursor};
      background-color: ${backgroundColor ? backgroundColor : 'var(--background-color)'};
      width: ${inputWidth};
      text-align: ${inputAlign};
  `;

  /** @type {import('svelte/elements').FormEventHandler<HTMLInputElement>}*/
  function oninput(e) {
    const target = e.currentTarget;
    if (target instanceof HTMLInputElement) {
      onInput(target.value);
    }
  }
</script>

<div style={containerStyle}>
  {#if label}
    <label for={inputProps.name} style={labelStyle}>
      {label}
    </label>
  {/if}
  <input on:click step="any" style={inputStyle} on:input={oninput} {...inputProps} />
</div>

<style>
  div {
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
    border: 1px solid var(--primary-hover);
  }
</style>
