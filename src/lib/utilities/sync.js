import { openAppDB } from '$lib/db';
import { categoriesStore, expensesStore, lastSyncDateStore } from '$lib/stores';
import CryptoJS from 'crypto-js';
import { now } from './formatter';
import { sortCategories, sortExpenses } from './list';

/** @typedef {{expenses: Expense[], categories: Category[]}} Payload */

/**
 * @param {Payload|null} localPayload
 */
export async function syncData(localPayload = null) {
  const id = localStorage.getItem('si');
  if (!id) return;

  const db = await openAppDB();
  const nowDate = now();

  if (!localPayload) {
    localPayload = {
      expenses: await db.getAll('expenses'),
      categories: await db.getAll('categories')
    };
  }

  const getResponse = await fetch(`/api/sync?id=${id}`);

  if (getResponse.status === 200) {
    const { data: remoteEncryptedData, date: remoteSyncDate } = await getResponse.json();
    const localSyncDate = localStorage.getItem('sd');

    if (!localSyncDate || remoteSyncDate > localSyncDate) {
      const bytes = CryptoJS.AES.decrypt(remoteEncryptedData, `${id}`);
      const remotePayload = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

      mergeRemoteIntoLocal(remotePayload, localPayload);
    }
  }

  const localEncryptedData = CryptoJS.AES.encrypt(
    JSON.stringify(localPayload),
    `${id}`
  ).toString();

  const response = await fetch('/api/sync', {
    method: 'PUT',
    body: JSON.stringify({ id, data: localEncryptedData, date: nowDate }),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (response.ok) {
    lastSyncDateStore.set(nowDate);
  }

  /**
   * @param {Payload} remotePayload
   * @param {Payload} localPayload
   */
  function mergeRemoteIntoLocal(remotePayload, localPayload) {
    const { expenses: remoteExpenses, categories: remoteCategories } = remotePayload;
    const { expenses: localExpenses, categories: localCategories } = localPayload;

    mergeItems(remoteExpenses, localExpenses, 'expenses');
    mergeItems(remoteCategories, localCategories, 'categories');
    expensesStore.set(sortExpenses(localExpenses));
    categoriesStore.set(sortCategories(localCategories));
  }

  /**
   * Merge expenses while considering the updatedAt field
   * If the remote expense is newer, replace the local expenses with the remote one
   *
   * @param {(Expense|Category)[]} remoteItems
   * @param {(Expense|Category)[]} localItems
   * @param {'expenses'|'categories'} database
   */
  function mergeItems(remoteItems, localItems, database) {
    remoteItems.forEach((remoteItem) => {
      const localItem = localItems.find((localItem) => localItem.id === remoteItem.id);

      if (localItem) {
        if (remoteItem.updatedAt > localItem.updatedAt) {
          Object.assign(localItem, remoteItem);
          db.put(database, remoteItem);
        }
      } else {
        localItems.push(remoteItem);
        db.add(database, remoteItem);
      }
    });
  }
}
