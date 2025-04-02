import { UserService } from '../../services/UserService';
import { UserRepository } from '../../repositories/UserRepository';
import { User } from '../../models/User';

jest.mock('../../repositories/UserRepository');

describe('UserService', () => {
  const mockUser: Omit<User, 'id' | 'createdAt'> = {
    name: 'Alice',
    email: 'alice@example.com',
    role: 'Editor'
  };

  it('should create a user', async () => {
    const result = await UserService.create(mockUser);
    expect(result).toHaveProperty('id');
    expect(result.name).toBe('Alice');
  });

  it('should call findAll and return list', async () => {
    const mockList = [
      { id: '1', ...mockUser, createdAt: new Date().toISOString() }
    ];
    (UserRepository.findAll as jest.Mock).mockResolvedValue(mockList);
    const users = await UserService.findAll();
    expect(users).toEqual(mockList);
  });
});