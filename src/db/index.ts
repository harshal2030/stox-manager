import * as SQlite from 'expo-sqlite';

const db = SQlite.openDatabase('stox.db');

const initTable = () => {
  db.transaction((tx) => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS items (name TEXT NOT NULL, stock INT NOT NULL)',
    );
  });
};

const insertInItems = (name: string, stock: number) => {
  db.transaction((tx) => {
    tx.executeSql('INSERT INTO items VALUES(?, ?)', [name, stock]);
  });
};

export {db, initTable, insertInItems};
