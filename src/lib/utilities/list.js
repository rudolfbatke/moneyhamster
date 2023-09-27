import { daySlashMonthSlashYear, getYearMonth } from './formatter';
import { maxBy, sortBy } from 'lodash';

/** @param {Entity[]} entities */
export const getNextId = (entities) => (maxBy(entities, 'id')?.id || 0) + 1;

/**
 * @param {Entity[]} entities
 * @param {number} id
 */
export const getById = (entities, id) => entities.find((e) => e.id === id);

/**
 * @param {Entity[]} entities
 * @param {number} id
 */
export const getIndexById = (entities, id) => entities.findIndex((e) => e.id === id);

/** @param {Expense[]} expenses */
export const sortExpenses = (expenses) => sortBy(expenses, ['date', 'issue']).reverse();

/** @param {Category[]} categories */
export const sortCategories = (categories) =>
	categories.sort((a, b) => a.name.localeCompare(b.name));

/** @param {Expense} expense */
export const getExpenseLabel = (expense) =>
	`${daySlashMonthSlashYear(expense.date)} ${expense.issue}`;

/** @param {Expense[]} expenses */
export const sum = (expenses) => expenses.reduce((acc, e) => acc + e.amount, 0);

/**
 * group expenses by month
 * @param {Expense[]} expenses
 */
export const getMonthExpenses = (expenses) =>
	expenses.reduce((/**@type MonthExpenses*/ acc, e) => {
		const month = getYearMonth(e.date);
		acc[month] = acc[month] ? [...acc[month], e] : [e];
		return acc;
	}, {});

/**
 *    @param {number} category
 *    @param {Expense[]} expenses
 */
export const amountsByCategory = (category, expenses) =>
	expenses.filter((e) => e.category === category).map((e) => e.amount);

/** @param {number[]} amounts */
export const sumAmounts = (amounts) => amounts.reduce((a, b) => a + b, 0);

/**
 * @param {Category} category
 * @param {Expense[]} expenses
 */
export const sumByCategory = (category, expenses) =>
	sumAmounts(amountsByCategory(category.id, expenses));
