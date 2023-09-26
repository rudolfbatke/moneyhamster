<script>
	import BarChart from '$lib/components/BarChart.svelte';
	import ListItem from '$lib/components/ListItem.svelte';
	import Topbar from '$lib/components/Topbar.svelte';
</script>

<Topbar>Charts</Topbar>
<ListItem border>Barchart</ListItem>
<div class="chart-content">
	<BarChart />
</div>

<style>
	.chart-content {
		padding: 0 1rem;
	}
</style>
