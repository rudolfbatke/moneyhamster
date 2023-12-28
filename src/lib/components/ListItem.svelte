<script>
  // TODO: check if this component is still used by many other components

  export let border = false;
  export let sticky = false;
  export let lucent = false;
  export let highlighted = false;
  export let hover = false;
</script>

<dev
  class="list-item"
  class:hover
  class:highlighted
  class:border
  class:sticky
  class:lucent
  on:click
  on:keypress
  role="menuitem"
  tabindex="0"
>
  <span>
    <slot />
    <div>
      <slot name="sub" />
    </div>
  </span>
  <slot name="end" />
</dev>

<style>
  .list-item {
    display: flex;
    justify-content: space-between;
    padding: 0.3rem 1rem;
    align-items: center;
    background-color: var(--background-color);
    height: 2.7rem;
  }

  .hover {
    cursor: pointer;
  }

  .list-item:first-child {
    border-top-left-radius: 1rem;
    border-top-right-radius: 1rem;
  }

  div {
    display: block;
    color: var(--text-color);
    font-size: 0.8rem;
  }

  .highlighted {
    background-color: var(--background-highlight);
  }

  .border {
    border-bottom: 1px solid var(--border-color);
  }

  .sticky {
    position: sticky;
    top: 0;
    z-index: 1;
  }

  .lucent {
    opacity: 0.81;
  }
</style>
