<script>
	import { expensesStore, categoriesStore, monthBarchartStore } from '$lib/stores';
	import { currency, localMonthYear } from '$lib/utilities/formatter';
	import { getMonthExpenses } from '$lib/utilities/list';
	import Select from '$lib/components/Select.svelte';
	import {
		Chart as ChartJS,
		Title,
		Tooltip,
		Legend,
		CategoryScale,
		LinearScale,
		BarElement,
		BarController
	} from 'chart.js';
	import { onMount } from 'svelte';

	/** @typedef {import('$lib/types').Expense} Expense */
	/** @typedef {import('$lib/types').Category} Category */

	ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, BarController);

	/** @type {HTMLCanvasElement} */
	let chartCanvas;

	/** @type {ChartJS} */
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
			barThickness: 10,
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
			type: 'bar',
			data: {
				labels,
				datasets
			},
			options: chartOptions
		});
	});

	/** @type {import('chart.js').ChartOptions<'bar'>} */
	const chartOptions = {
		animation: false,
		responsive: true,
		maintainAspectRatio: false,
		indexAxis: 'y',
		scales: {
			y: {
				grid: {
					display: false
				}
			}
		},
		plugins: {
			legend: {
				display: false
			}
		}
	};

	/**
	 *    @param {number} category
	 *    @param {Expense[]} expenses
	 */
	const amountsByCategory = (category, expenses) =>
		expenses.filter((e) => e.category === category).map((e) => e.amount);

	/** @param {number[]} amounts */
	const sumAmounts = (amounts) => amounts.reduce((a, b) => a + b, 0);

	/**
	 * @param {Category} category
	 * @param {Expense[]} expenses
	 */
	const sumByCategory = (category, expenses) =>
		sumAmounts(amountsByCategory(category.id, expenses));

	/** @param {Expense[]} expenses */
	const totalAmount = (expenses) => expenses.reduce((a, b) => a + b.amount, 0);
</script>

<div class="bar-chart">
	<div>
		<p>
			The total amount of expenses for {localMonthYear(selectedMonth)} is
			<strong> {currency(totalAmount(monthExpenses[selectedMonth] || []), 0)}. </strong>
		</p>
		<p>The following chart shows the amount of expenses per category for the selected month.</p>
		<p>To see the amount of a single category, click no the bar.</p>
	</div>
	<Select
		label="Month"
		id="month"
		value={selectedMonth || ''}
		placeholder="Select a month"
		on:change={(/** @type {any} */ { target }) => monthBarchartStore.set(target.value)}
	>
		{#each months as month}
			<option value={month}>{localMonthYear(month)}</option>
		{/each}
	</Select>
	<div class="chart-container" style={`height: ${categories.length * 27}px`}>
		<canvas bind:this={chartCanvas} id="bar-chart" />
	</div>
</div>
