import { openAppDB } from '$lib/db';
import {
  expensesStore,
  categoriesStore,
  openListItemsStore,
  monthBarchartStore,
  lineChartCategoriesStore
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
  openListItemsStore.subscribe((openListItems) => {
    set('openListItems', JSON.stringify(openListItems));
  });

  const monthBarchart = JSON.parse(get('monthBarchart') || '""');
  monthBarchartStore.set(monthBarchart);
  monthBarchartStore.subscribe((monthBarchart) => {
    set('monthBarchart', JSON.stringify(monthBarchart));
  });

  const lineChartCategories = JSON.parse(get('lineChartCategories') || '[]');
  lineChartCategoriesStore.set(lineChartCategories);
  lineChartCategoriesStore.subscribe((lineChartCategories) => {
    set('lineChartCategories', JSON.stringify(lineChartCategories));
  });
}
