<script>
	import { expensesStore, categoriesStore, monthBarchartStore } from '$lib/stores';
	import { currency, localMonthYear } from '$lib/utilities/formatter';
	import { getMonthExpenses, sumByCategory } from '$lib/utilities/list';
	import Select from '$lib/components/Select.svelte';
	import { Chart as ChartJS, Tooltip, Legend, ArcElement, PieController } from 'chart.js';
	import { onMount } from 'svelte';

	/** @typedef {import('$lib/types').Expense} Expense */

	ChartJS.register(ArcElement, Tooltip, Legend, PieController);

	/** @type {HTMLCanvasElement} */
	let chartCanvas;

	/** @type {ChartJS<'pie'>} */
	let chart;

	$: selectedMonth = $monthBarchartStore || (months[0] ?? '');

	$: expenses = $expensesStore;

	$: categories = $categoriesStore;

	$: monthExpenses = getMonthExpenses(expenses);

	$: months = Object.keys(monthExpenses).sort().reverse();

	$: labels = categories.map((c) => c.name);

	$: chartsData = categories.map((c) => sumByCategory(c, monthExpenses[selectedMonth] || []));

	$: datasets = [
		{
			data: chartsData,
			backgroundColor: categories.map((c) => c.color)
		}
	];

	$: {
		if (chart) {
			chart.data.datasets = datasets;
			chart.data.labels = labels;
			chart.update();
		}
	}

	onMount(() => {
		chart = new ChartJS(chartCanvas, {
			type: 'pie',
			data: {
				labels,
				datasets
			},
			options: chartOptions
		});
	});

	/** @type {import('chart.js').ChartOptions<'pie'>} */
	const chartOptions = {
		animation: false,
		responsive: true,
		maintainAspectRatio: false,
		plugins: {
			legend: {
				display: false
			}
		}
	};

	/** @param {Expense[]} expenses */
	const totalAmount = (expenses) => expenses.reduce((a, b) => a + b.amount, 0);
</script>

<div class="pie-chart">
	<div class="pie-chart-description">
		<p>The following chart shows the distribution of expenses for this month.</p>
		<p>The chart is interactive. You can hover or click on the chart to see more details.</p>
		<Select
			label="Month:"
			id="month"
			value={selectedMonth || ''}
			placeholder="Select a month"
			on:change={(/** @type {any} */ { target }) => monthBarchartStore.set(target.value)}
		>
			{#each months as month}
				<option value={month}>{localMonthYear(month)}</option>
			{/each}
		</Select>
		<p>
			The total amount of expenses for {localMonthYear(selectedMonth)} is
			<strong> {currency(totalAmount(monthExpenses[selectedMonth]), 0)}. </strong>
		</p>
	</div>
	<div class="chart-container" style={`height: ${categories.length * 27}px`}>
		<canvas bind:this={chartCanvas} id="pie-chart" />
	</div>
</div>

<style>
	.pie-chart-description {
		opacity: 0.81;
	}
</style>
