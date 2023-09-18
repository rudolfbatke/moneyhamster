<script>
	import Button from '$lib/Button.svelte';
	import List from '$lib/List.svelte';
	import ListItem from '$lib/ListItem.svelte';
	import Topbar from '$lib/Topbar.svelte';
</script>

<Topbar>
	Expenses
	<Button slot="end" on:click={() => console.log('new')}>New +</Button>
</Topbar>
<List>
	<ListItem>
		Apples
		<span slot="end">$1.99</span>
	</ListItem>
</List>
