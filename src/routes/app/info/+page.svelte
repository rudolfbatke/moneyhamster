<script>
	import Backup from '$lib/components/Backup.svelte';
	import List from '$lib/components/List.svelte';
	import Story from '$lib/components/Story.svelte';
	import Sync from '$lib/components/Sync.svelte';
	import Topbar from '$lib/components/Topbar.svelte';

	const items = [
		{
			title: 'Backup and Restore',
			component: Backup
		},
		{
			title: 'The Story of the Hamster Cash',
			component: Story
		},
		{
			title: 'Sync Data',
			component: Sync
		}
	];
</script>

<Topbar>Info</Topbar>

<div>
	<img src="/favicon_optimized.svg" alt="Hamster Cash Logo" />
	<h1>HAMSTER.CASH</h1>
	<h2>Your money in control!</h2>
</div>

<List {items} />

<style>
	div {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	img {
		width: 10rem;
		height: 10rem;
	}

	h1 {
		font-size: 1.5rem;
		margin-bottom: 0;
	}
</style>
