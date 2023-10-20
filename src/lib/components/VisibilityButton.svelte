<script>
  import VisibilityIcon from '$lib/icons/VisibilityIcon.svelte';
  import VisibilityOffIcon from '$lib/icons/VisibilityOffIcon.svelte';
  import Button from './Button.svelte';

  export let visible = false;
</script>

<Button
  color="primary"
  focusBorder={false}
  on:click={() => {
    visible = !visible;
  }}
>
  {#if visible}
    <VisibilityOffIcon />
  {:else}
    <VisibilityIcon />
  {/if}
</Button>
