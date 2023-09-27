<script>
	import Backup from '$lib/components/Backup.svelte';
	import List from '$lib/components/List.svelte';
	import Story from '$lib/components/Story.svelte';
	import Topbar from '$lib/components/Topbar.svelte';

	const items = [
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

<List {items} />
