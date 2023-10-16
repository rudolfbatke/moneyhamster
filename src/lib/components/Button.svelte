<script>
  /** @type {'primary' | 'danger' | undefined} */
  export let color = undefined;

  /** @type {'fill' | 'outline' | 'plain' } */
  export let variant = 'plain';

  /** @type {string} */
  export let value = '';

  export let disabled = false;

  export let focusBorder = true;
</script>

<button
  class:danger={color === 'danger'}
  class:primary={color === 'primary'}
  class:fill={variant === 'fill'}
  class:outline={variant === 'outline'}
  class:focusBorder
  on:click
  {value}
  {disabled}
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
    padding: 0.5em 1em;
    align-items: center;
    border-color: var(--button-border-color, var(--background-color));
    background-color: var(--button-background-color, var(--background-color));
    color: var(--button-text-color, var(--text-color));
    min-height: 2.5rem;
    height: fit-content;
  }

  button:hover {
    background-color: var(--button-background-hover, var(--background-hover));
  }

  button:focus {
    outline: none;
  }

  button:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  button:disabled:hover {
    background-color: var(--button-background-color, var(--background-color));
  }

  .fill {
    --button-border-color: var(--text-color);
    --button-background-color: var(--text-color);
    --button-text-color: var(--text-color);
  }

  .outline {
    --button-border-color: var(--text-color);
  }

  .fill:hover {
    --button-background-hover: var(--text-hover);
  }

  .primary {
    --text-color: var(--primary-color);
  }

  .primary.fill {
    --button-border-color: var(--primary-color);
    --button-background-color: var(--primary-color);
    --text-color: var(--text-color-light);
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
