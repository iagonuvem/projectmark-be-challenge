import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';

export abstract class BaseRepository<T> {
  protected db!: Database;
  protected abstract tableName: string;

  constructor( ) {
    this.init();
  }

  async init() {
    this.db = await open({
      filename: './src/db/database.sqlite',
      driver: sqlite3.Database
    });
    await this.db.exec('PRAGMA foreign_keys = ON');
  }

  async findAll(): Promise<T[]> {
    return this.db.all<T[]>(`SELECT * FROM ${this.tableName}`);
  }

  async findById(id: string): Promise<T | undefined> {
    return this.db.get<T>(`SELECT * FROM ${this.tableName} WHERE id = ?`, id);
  }

  async delete(id: string): Promise<void> {
    await this.db.run(`DELETE FROM ${this.tableName} WHERE id = ?`, id);
  }
}