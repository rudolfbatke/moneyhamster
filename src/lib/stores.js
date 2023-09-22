import { writable } from 'svelte/store';

/** @typedef {import('../routes/app/types').Expense} Expense */
/** @typedef {import('../routes/app/types').Category} Category */

/** @type { Expense[] } */
const expenses = [];
export const expenses_store = writable(expenses);

/** @type { Category[] } */
const categories = [];
export const categories_store = writable(categories);
