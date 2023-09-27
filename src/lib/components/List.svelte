<script>
	import ExpendLessIcon from '$lib/icons/ExpendLessIcon.svelte';
	import ExpendMoreIcon from '$lib/icons/ExpendMoreIcon.svelte';
	import { openListItemsStore } from '$lib/stores';
	import ListItem from './ListItem.svelte';

	/** @type {openListItem[]} */
	export let items = [];

	/** @type {(title:string)=>boolean} */
	$: isOpen = (title) => {
		return $openListItemsStore.includes(title);
	};
</script>

<ul>
	<slot />
	{#each items as item}
		<ListItem hover border sticky on:click={() => openListItemsStore.toggle(item.title)}>
			{item.title}
			<div slot="end">
				{#if isOpen(item.title)}
					<ExpendLessIcon />
				{:else}
					<ExpendMoreIcon />
				{/if}
			</div>
		</ListItem>
		{#if isOpen(item.title)}
			<div class="component-container">
				<svelte:component this={item.component} />
			</div>
		{/if}
	{/each}
</ul>

<style>
	ul {
		list-style: none;
		padding: 0;
		margin: 0;
	}

	.component-container {
		padding: 1rem;
	}
</style>
