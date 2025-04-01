import { BaseRepository } from './BaseRepository';
import { User } from '../models/User';

class UserRepositoryClass extends BaseRepository<User> {
  protected tableName = 'users';

  async save(user: User): Promise<void> {
    await this.db.run(
      `INSERT INTO users (id, name, email, role, createdAt) VALUES (?, ?, ?, ?, ?)`,
      user.id, user.name, user.email, user.role, user.createdAt
    );
  }
}

export const UserRepository = new UserRepositoryClass();