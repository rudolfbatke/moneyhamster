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

/** @param {string} key   */
const get = (key) => window.localStorage.getItem(key);

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

  const openListItems = JSON.parse(get('openListItems') || '[]');
  openListItemsStore.set(openListItems);
  openListItemsStore.subscribe((value) => {
    set('openListItems', JSON.stringify(value));
  });

  const monthBarchart = JSON.parse(get('monthBarchart') || '""');
  monthBarchartStore.set(monthBarchart);
  monthBarchartStore.subscribe((value) => {
    set('monthBarchart', JSON.stringify(value));
  });

  const lineChartCategories = JSON.parse(get('lineChartCategories') || '[]');
  lineChartCategoriesStore.set(lineChartCategories);
  lineChartCategoriesStore.subscribe((value) => {
    set('lineChartCategories', JSON.stringify(value));
  });

  const lastSyncDate = get('sd') || '';
  lastSyncDateStore.set(lastSyncDate);
  lastSyncDateStore.subscribe((value) => {
    set('sd', value);
  });
}
