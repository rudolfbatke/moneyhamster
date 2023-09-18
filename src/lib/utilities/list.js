import { daySlashMonthSlashYear, getYearMonth } from './formatter';
import { maxBy, groupBy, sortBy } from 'lodash';

export const getNextId = (entities) => (maxBy(entities, 'id')?.id || 0) + 1;

export const getById = (entities, id) => entities.find((e) => e.id === id);

export const getIndexById = (entities, id) => entities.findIndex((e) => e.id === id);

export const groubedByMonth = (expenses) => groupBy(expenses, ({ date }) => getYearMonth(date));

export const sortExpenses = (expenses) => sortBy(expenses, ['date', 'issue']).reverse();

export const getExpenseLabel = (expense) =>
	`${daySlashMonthSlashYear(expense.date)} ${expense.issue}`;
