import { openDB } from 'idb/with-async-ittr';

export const openAppDB = () =>
  openDB('App', 1, {
    /** @param {import('idb').IDBPDatabase<AppDB>} db */
    upgrade(db) {
      db.createObjectStore('expenses', {
        keyPath: 'id',
        autoIncrement: true
      }).createIndex('date', 'date');

      db.createObjectStore('categories', {
        keyPath: 'id',
        autoIncrement: true
      });

      db.createObjectStore('sync');
    }
  });
