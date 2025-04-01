import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

(async () => {
  const db = await open({
    filename: './src/db/database.sqlite',
    driver: sqlite3.Database
  });

  const tables = await db.all(`SELECT name FROM sqlite_master WHERE type='table'`);
  console.log('Tabelas existentes:', tables);
})();
