import { openAppDB } from '$lib/db';
import {
  expensesStore,
  categoriesStore,
  openListItemsStore,
  monthBarchartStore,
  lineChartCategoriesStore,
  lastSyncDateStore
} from '$lib/stores';
import { sortCategories, sortExpenses } from '$lib/utilities/list';

/**
 * @param {string} key
 * @param {boolean} parse
 */
const get = (key, parse = true) => {
  const value = window.localStorage.getItem(key);
  return value === 'undefined' ? undefined : parse ? JSON.parse(value || 'null') : value;
};

/**
 *@param {string} key
 *@param {string} value
 */
const set = (key, value) => window.localStorage.setItem(key, value);

export async function setAndSupscribeStores() {
  const db = await openAppDB();

  const expenses = await db.getAll('expenses');
  expensesStore.set(sortExpenses(expenses));

  const categories = await db.getAll('categories');
  categoriesStore.set(sortCategories(categories));

  const openListItems = get('openListItems') || [];
  openListItemsStore.set(openListItems);
  openListItemsStore.subscribe((value) => {
    set('openListItems', JSON.stringify(value));
  });

  const monthBarchart = get('monthBarchart') || '';
  monthBarchartStore.set(monthBarchart);
  monthBarchartStore.subscribe((value) => {
    set('monthBarchart', JSON.stringify(value));
  });

  const lineChartCategories = get('lineChartCategories') || [];
  lineChartCategoriesStore.set(lineChartCategories);
  lineChartCategoriesStore.subscribe((value) => {
    set('lineChartCategories', JSON.stringify(value));
  });

  const lastSyncDate = await db.get('sync', 'last-sync');
  if (lastSyncDate instanceof Date) lastSyncDateStore.set(lastSyncDate);
}
