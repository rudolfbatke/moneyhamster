<script>
	import { browser } from '$app/environment';
	import Button from '$lib/Button.svelte';
	import Float from '$lib/Float.svelte';
	import List from '$lib/List.svelte';
	import ListItem from '$lib/ListItem.svelte';
	import Topbar from '$lib/Topbar.svelte';

	/** @type {import('../../../types').Expense[]}*/
	let expenses = [];
	if (browser) {
		expenses = JSON.parse(window.localStorage.getItem('expenses') || '[]');
	}
</script>

<Topbar>Expenses</Topbar>

<List>
	{#each expenses as expense}
		<ListItem>
			{expense.issue}
			<span slot="sub">{expense.category}</span>
			<span slot="end">{expense.amount}</span>
		</ListItem>
	{/each}
</List>

<Float>
	<Button on:click={() => console.log('new')}>+</Button>
</Float>
