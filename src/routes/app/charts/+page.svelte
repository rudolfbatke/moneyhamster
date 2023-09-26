<script>
	import BarChart from '$lib/components/BarChart.svelte';
	import List from '$lib/components/List.svelte';
	import ListItem from '$lib/components/ListItem.svelte';
	import Topbar from '$lib/components/Topbar.svelte';
	import { openListItemsStore } from '$lib/stores';
	import ExpendLessIcon from '$lib/icons/ExpendLessIcon.svelte';
	import ExpendMoreIcon from '$lib/icons/ExpendMoreIcon.svelte';
	import LineChart from '$lib/components/LineChart.svelte';

	$: openListItems = $openListItemsStore;

	const charts = [
		{
			name: 'Bar Chart',
			component: BarChart
		},
		{
			name: 'Line Chart',
			component: LineChart
		}
	];
</script>

<Topbar>Charts</Topbar>
<List>
	{#each charts as chart}
		<ListItem sticky border on:click={() => openListItemsStore.toggle(chart.name)}>
			{chart.name}
			<div slot="end">
				{#if openListItems.includes(chart.name)}
					<ExpendLessIcon />
				{:else}
					<ExpendMoreIcon />
				{/if}
			</div>
		</ListItem>
		{#if openListItems.includes(chart.name)}
			<div class="chart-content">
				<svelte:component this={chart.component} />
			</div>
		{/if}
	{/each}
</List>

<style>
	.chart-content {
		padding: 0 1rem;
	}
</style>
