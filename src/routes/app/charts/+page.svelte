<script>
	import BarChart from '$lib/components/BarChart.svelte';
	import List from '$lib/components/List.svelte';
	import ListItem from '$lib/components/ListItem.svelte';
	import Topbar from '$lib/components/Topbar.svelte';
	import { openListItemsStore } from '$lib/stores';
	import ExpendLessIcon from '$lib/icons/ExpendLessIcon.svelte';
	import ExpendMoreIcon from '$lib/icons/ExpendMoreIcon.svelte';

	$: openListItems = $openListItemsStore;
</script>

<Topbar>Charts</Topbar>
<List>
	<ListItem border on:click={() => openListItemsStore.toggle('BarChart')}>
		Bar Chart
		<div slot="end">
			{#if openListItems.includes('BarChart')}
				<ExpendLessIcon />
			{:else}
				<ExpendMoreIcon />
			{/if}
		</div>
	</ListItem>
	{#if openListItems.includes('BarChart')}
		<div class="chart-content">
			<BarChart />
		</div>
	{/if}
</List>

<style>
	.chart-content {
		padding: 0 1rem;
	}
</style>
