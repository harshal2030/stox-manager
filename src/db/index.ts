import * as SQlite from 'expo-sqlite';
import {nanoid} from 'nanoid';

const db = SQlite.openDatabase('stox.db');

type Item = {
  id: string;
  name: string;
  buy: number;
  sell: number;
  price: number | null;
};

const initTable = () => {
  db.transaction(
    (tx) => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS groups (id VARCHAR(10) NOT NULL PRIMARY KEY UNIQUE, name TEXT NOT NULL)',
      );
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS items (
          id VARCHAR(10) NOT NULL UNIQUE PRIMARY KEY,
          group_id VARCHAR(10) NOT NULL,
          name TEXT NOT NULL,
          buy INT NOT NULL,
          sell INT NOT NULL DEFAULT 0,
          price FLOAT
        )`,
      );
      tx.executeSql(
        "INSERT INTO groups (id, name) SELECT 'default', 'default' WHERE NOT EXISTS (SELECT * FROM groups WHERE id = 'default')",
      );
      tx.executeSql(
        'INSERT INTO items (id, group_id, name, buy, sell) VALUES(?, ?, ?, ?, ?)',
        [nanoid(10), 'default', 'trial', 23, 15],
      );
    },
    (e) => console.log(e),
  );
};

const insertInItems = (
  id: string,
  name: string,
  buy: number,
  sell?: number,
  price?: number | null,
  cb?: (e: SQlite.SQLError) => void,
) => {
  db.transaction(
    (tx) => {
      tx.executeSql(
        'INSERT INTO items(id ,name, buy, sell, price) VALUES(?, ?, ?, ?, ?)',
        [id, name, buy, sell, price],
      );
    },
    (e) => cb!(e),
  );
};

const updateTable = (
  id: string,
  name: string,
  buy: number,
  sell?: number,
  price?: number | null,
  cb?: (e: SQlite.SQLError) => void,
) => {
  db.transaction((tx) => {
    tx.executeSql(
      'UPDATE items SET name = ?, buy = ?, sell=?, price = ? WHERE id = ?',
      [name, buy, sell, price, id],
    );
  }, cb);
};

const deleteFromTable = (id: string, cb?: (e: SQlite.SQLError) => void) => {
  db.transaction((tx) => {
    tx.executeSql('DELETE FROM items WHERE id = ?', [id]);
  }, cb);
};

export {db, initTable, insertInItems, updateTable, deleteFromTable};

// eslint-disable-next-line no-undef
export type {Item};
