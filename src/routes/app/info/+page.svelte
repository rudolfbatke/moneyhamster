<script>
	import Backup from '$lib/components/Backup.svelte';
	import List from '$lib/components/List.svelte';
	import ListItem from '$lib/components/ListItem.svelte';
	import Story from '$lib/components/Story.svelte';
	import Topbar from '$lib/components/Topbar.svelte';

	const entries = [
		{
			title: 'Backup and Restore',
			component: Backup
		},
		{
			title: 'The Story about Hamster Cash',
			component: Story
		}
	];
</script>

<Topbar>Info</Topbar>

<List>
	{#each entries as entry}
		<ListItem hover sticky>{entry.title}</ListItem>
		<svelte:component this={entry.component} />
	{/each}
</List>
