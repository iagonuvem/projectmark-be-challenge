import { User } from '../models/User';
import { UserRepository } from '../repositories/UserRepository';
import { v4 as uuidv4 } from 'uuid';

export const UserService = {
  async create(data: Omit<User, 'id' | 'createdAt'>): Promise<User> {
    const user: User = {
      id: uuidv4(),
      name: data.name,
      email: data.email,
      role: data.role,
      createdAt: new Date().toISOString()
    };

    await UserRepository.init();
    await UserRepository.save(user);
    return user;
  },

  async findAll(): Promise<User[]> {
    await UserRepository.init();
    return UserRepository.findAll();
  }
};
