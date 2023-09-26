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
	import Select from './Select.svelte';
	import Chip from './Chip.svelte';

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

	/** @type {ChartJS<'line'>} */
	let chart;

	/** @type {HTMLFormElement|undefined} */
	let form;

	const monthsToDisplay = 6;

	$: expenses = $expensesStore;

	$: categories = $categoriesStore;

	$: monthExpenses = getMonthExpenses(expenses);

	$: months = Object.keys(monthExpenses).slice(0, monthsToDisplay);

	$: lineChartCategories = $lineChartCategoriesStore;

	$: selectableCategories = categories.filter((c) => !lineChartCategories.includes(c.id));

	$: chartDataLabels = months.map((month) => monthSlashYear(month));

	/** @type {import('chart.js').ChartDataset<'line'>[]} */
	$: chartDataSets = lineChartCategories.map((id) => {
		const category = getCategory(id);
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

	/** @param {number} id */
	function getCategory(id) {
		return categories.find((c) => c.id === id);
	}

	/** @param {number} id */
	function addCategory(id) {
		lineChartCategoriesStore.update((categories) => [...categories, id]);
		// @ts-ignore
		if (form) form.elements['category-select'].value = '';
	}

	/** @param {number} id */
	function removeCategory(id) {
		lineChartCategoriesStore.update((categories) => categories.filter((c) => c !== id));
	}
</script>

<div class="bar-chart">
	<div class="bar-chart-description">
		<p>
			This chart shows the expenses per month for the selected categories over the last
			{monthsToDisplay} months.
		</p>
		<p>The chart is interactive. You can click on the chart to see the exact amount for a month.</p>
	</div>

	<form bind:this={form}>
		<Select
			id="category-select"
			placeholder="Select a category"
			on:change={(/** @type {any} */ { target }) => addCategory(Number(target.value))}
		>
			{#each selectableCategories as category}
				<option value={category.id}>{category.name}</option>
			{/each}
		</Select>
	</form>

	<div class="chart-container">
		<canvas bind:this={chartCanvas} id="bar-chart" />
	</div>

	<div class="chip-container">
		{#each lineChartCategories.map(getCategory) as category}
			<Chip
				label={category?.name}
				color={category?.color}
				remove
				on:click={() => {
					if (category) removeCategory(category.id);
				}}
			/>
		{/each}
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

	.chip-container {
		display: flex;
		flex-wrap: wrap;
		margin-top: 1rem;
		gap: 0.5rem;
	}
</style>
