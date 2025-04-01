import { readFile } from 'fs/promises';
import { join } from 'path';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

async function runMigrations() {
  const db = await open({
    filename: './src/db/database.sqlite',
    driver: sqlite3.Database
  });

  const migrationSQL = await readFile(join(__dirname, './init.sql'), 'utf-8');
  await db.exec(migrationSQL);
  console.log('DB Successfully init!');
  await db.close();
}

runMigrations().catch(err => {
  console.error('Failed to execute migration:', err);
});
