import { openAppDB } from '$lib/db';
import {
  categoriesStore,
  expensesStore
  // lastSyncDateStore
} from '$lib/stores';
import { sortCategories, sortExpenses } from './list';

/** @typedef {{expenses: Expense[], categories: Category[]}} PlainData */

/**
 * @param {PlainData} localPlainData
 */
export async function syncData(localPlainData) {
  const crypto = await import('./crypto');
  /** @type {CryptoKey|undefined} */
  let aesKey = undefined;
  const currentDate = new Date();
  const db = await openAppDB();

  const syncId = await db.get('sync', 'sync-id');
  if (typeof syncId !== 'string') return;

  const getResponse = await fetch(`/api/sync?id=${syncId}`);
  if (getResponse.status === 200) {
    /** @type {SyncPayload} */
    const {
      data: remoteEncryptedData,
      date: remoteSyncDate,
      aesKey: remoteAesKey,
      iv: remoteIv
    } = await getResponse.json();
    aesKey = await crypto.importKey(remoteAesKey);

    const lastSyncDate = await db.get('sync', 'last-sync');
    if (!lastSyncDate || new Date(remoteSyncDate) > lastSyncDate) {
      const remoteDecryptedData = await crypto.decrypt(remoteEncryptedData, aesKey, remoteIv);
      const remotePlainData = JSON.parse(remoteDecryptedData);
      mergeRemoteIntoLocal(remotePlainData, localPlainData);
    }
  } else {
    aesKey = await crypto.createKey();
  }

  const iv = crypto.createIv();

  const plaintext = JSON.stringify(localPlainData);
  const localEncryptedData = await crypto.encrypt(plaintext, aesKey, iv);

  /** @type {SyncPayload} */
  const payload = {
    syncId,
    data: localEncryptedData,
    date: currentDate,
    aesKey: await crypto.exportKey(aesKey),
    iv
  };

  const response = await fetch('/api/sync', {
    method: 'PUT',
    body: JSON.stringify(payload),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (response.ok) {
    // lastSyncDateStore.set(currentDate);
    // db.put('sync', currentDate, 'last-sync');
  }

  /**
   * @param {PlainData} remotePayload
   * @param {PlainData} localPayload
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
