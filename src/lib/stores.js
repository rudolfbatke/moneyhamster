import { writable } from 'svelte/store';

/** @typedef {import('../routes/app/types').Expense} Expense */
/** @typedef {import('../routes/app/types').Category} Category */

/** @type { Expense[] } */
const expenses = [];
export const expensesStore = writable(expenses);

/** @type { Category[] } */
const categories = [];
export const categoriesStore = writable(categories);

/** @type { string[] } */
const openListItems = [];

function createOpenListItemsStore() {
  const { subscribe, set, update } = writable(openListItems);

  /** @param {string} label */
  const toggle = (label) =>
    update((value) => {
      if (value.includes(label)) {
        return value.filter((i) => i !== label);
      } else {
        return [...value, label];
      }
    });

  return {
    subscribe,
    toggle,
    set
  };
}

export const openListItemsStore = createOpenListItemsStore();
