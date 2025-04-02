import { ResourceService } from '../../services/ResourceService';
import { ResourceRepository } from '../../repositories/ResourceRepository';
import { Resource } from '../../models/Resource';

jest.mock('../../repositories/ResourceRepository');

describe('ResourceService', () => {
  const input: Omit<Resource, 'id' | 'createdAt' | 'updatedAt'> = {
    topicId: 'abc123',
    url: 'https://example.com',
    description: 'Test resource',
    type: 'pdf'
  };

  it('should create a resource', async () => {
    const resource = await ResourceService.create(input);
    expect(resource).toHaveProperty('id');
    expect(resource.url).toBe(input.url);
  });

  it('should return all resources', async () => {
    const mockList = [
      { id: 'res1', ...input, createdAt: '', updatedAt: '' }
    ];
    (ResourceRepository.findAll as jest.Mock).mockResolvedValue(mockList);
    const result = await ResourceService.findAll();
    expect(result).toEqual(mockList);
  });
});