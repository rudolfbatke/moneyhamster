<script>
	import Button from '$lib/Button.svelte';
	import Float from '$lib/Float.svelte';
	import List from '$lib/List.svelte';
	import ListItem from '$lib/ListItem.svelte';
	import Topbar from '$lib/Topbar.svelte';
</script>

<Topbar>Expenses</Topbar>
<List>
	<ListItem>
		Apples
		<span slot="sub">Groceries</span>
		<span slot="end">$1.99</span>
	</ListItem>
</List>
<Float>
	<Button on:click={() => console.log('new')}>+</Button>
</Float>
