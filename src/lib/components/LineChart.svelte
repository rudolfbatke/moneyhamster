<script>
	import { expensesStore, categoriesStore, lineChartCategoriesStore } from '$lib/stores';
	import { monthSlashYear } from '$lib/utilities/formatter';
	import { getMonthExpenses, sumByCategory } from '$lib/utilities/list';
	import {
		Chart as ChartJS,
		Title,
		Tooltip,
		Legend,
		CategoryScale,
		PointElement,
		LinearScale,
		LineElement,
		LineController
	} from 'chart.js';
	import { onMount } from 'svelte';

	ChartJS.register(
		Title,
		Tooltip,
		Legend,
		PointElement,
		CategoryScale,
		LinearScale,
		LineElement,
		LineController
	);

	/** @type {HTMLCanvasElement} */
	let chartCanvas;

	/** @type {ChartJS} */
	let chart;

	const monthsToDisplay = 6;

	$: expenses = $expensesStore;

	$: categories = $categoriesStore;

	$: monthExpenses = getMonthExpenses(expenses);

	$: months = Object.keys(monthExpenses).slice(0, monthsToDisplay);

	$: lineChartCategories = $lineChartCategoriesStore;

	$: chartDataLabels = months.map((month) => monthSlashYear(month));

	/** @type {import('chart.js').ChartDataset<'line'>[]} */
	$: chartDataSets = lineChartCategories.map((id) => {
		const category = categories.find((c) => c.id === id);
		return {
			label: category?.name || '',
			borderColor: category?.color || 'gray',
			backgroundColor: category?.color || 'gray',
			data: months.map((month) =>
				category ? sumByCategory(category, monthExpenses[month] || []) : 0
			)
		};
	});

	$: {
		if (chart) {
			chart.data.datasets = chartDataSets;
			chart.data.labels = chartDataLabels;
			chart.update();
		}
	}

	onMount(() => {
		chart = new ChartJS(chartCanvas, {
			type: 'line',
			data: {
				labels: chartDataLabels,
				datasets: chartDataSets
			},
			options: chartOptions
		});
	});

	/** @type {import('chart.js').ChartOptions<'line'>} */
	const chartOptions = {
		animation: false,
		responsive: true,
		maintainAspectRatio: false,
		plugins: {
			legend: {
				display: false
			},
			tooltip: {
				mode: 'nearest',
				intersect: false
			}
		}
	};
</script>

<div class="bar-chart">
	<div class="bar-chart-description">
		<p>
			This chart shows the expenses per month for the selected categories over the last
			{monthsToDisplay} months.
		</p>
		<p>The chart is interactive. You can click on the chart to see the exact amount for a month.</p>
	</div>
	<div class="chart-container">
		<canvas bind:this={chartCanvas} id="bar-chart" />
	</div>
</div>

<style>
	.bar-chart-description {
		opacity: 0.81;
	}

	.chart-container {
		height: 300px;
		width: 100%;
	}
</style>
