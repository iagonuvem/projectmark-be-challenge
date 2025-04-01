import { Resource } from '../models/Resource';
import { ResourceRepository } from '../repositories/ResourceRepository';
import { v4 as uuidv4 } from 'uuid';

export const ResourceService = {
  async create(data: Omit<Resource, 'id' | 'createdAt' | 'updatedAt'>): Promise<Resource> {
    const now = new Date().toISOString();
    const resource: Resource = {
      id: uuidv4(),
      topicId: data.topicId,
      url: data.url,
      description: data.description,
      type: data.type,
      createdAt: now,
      updatedAt: now
    };

    await ResourceRepository.init();
    await ResourceRepository.save(resource);
    return resource;
  },

  async findAll(): Promise<Resource[]> {
    await ResourceRepository.init();
    return ResourceRepository.findAll();
  }
};
