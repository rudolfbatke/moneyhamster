<script>
	import CloseIcon from '$lib/icons/CloseIcon.svelte';

	export let label = '';
	export let color = '';
	export let remove = false;
</script>

<div class="chip" style="background-color: {color}" on:click on:keypress>
	<div class="label">{label}</div>
	{#if remove}
		<div class="icon">
			<CloseIcon />
		</div>
	{/if}
</div>

<style>
	.chip {
		display: flex;
		align-items: center;
		width: fit-content;
		padding-left: 1rem;
		padding-right: 0.5rem;
		border-radius: 1rem;
		vertical-align: middle;
		--text-color: var(--background-color);
		color: var(--text-color);
	}

	.label {
		padding-top: 0.2rem;
		font-size: 1rem;
	}

	.icon {
		cursor: pointer;
		display: flex;
	}
</style>
