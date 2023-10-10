<script>
	import VisibilityIcon from '$lib/icons/VisibilityIcon.svelte';
	import VisibilityOffIcon from '$lib/icons/VisibilityOffIcon.svelte';
	import Button from './Button.svelte';

	export let visibility = false;
</script>

<Button
	color="primary"
	focusBorder={false}
	on:click={() => {
		visibility = !visibility;
	}}
>
	{#if visibility}
		<VisibilityOffIcon />
	{:else}
		<VisibilityIcon />
	{/if}
</Button>
