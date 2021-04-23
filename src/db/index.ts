import * as SQlite from 'expo-sqlite';

const db = SQlite.openDatabase('stox.db');

type Item = {
  id: string;
  name: string;
  stock: number;
  price: number | null;
};

const initTable = () => {
  db.transaction(
    (tx) => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS items (id VARCHAR(10) NOT NULL UNIQUE PRIMARY KEY, name TEXT NOT NULL, stock INT NOT NULL, price FLOAT)',
      );
    },
    (e) => console.log(e),
  );
};

const insertInItems = (
  id: string,
  name: string,
  stock: number,
  price?: number | null,
  cb?: (e: SQlite.SQLError) => void,
) => {
  db.transaction(
    (tx) => {
      tx.executeSql(
        'INSERT INTO items(id ,name, stock, price) VALUES(?, ?, ?, ?)',
        [id, name, stock, price],
      );
    },
    (e) => cb!(e),
  );
};

const updateTable = (
  id: string,
  name: string,
  stock: number,
  price?: number | null,
  cb?: (e: SQlite.SQLError) => void,
) => {
  db.transaction((tx) => {
    tx.executeSql(
      'UPDATE items SET name = ?, stock = ?, price = ? WHERE id = ?',
      [name, stock, price, id],
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
