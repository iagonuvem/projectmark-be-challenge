import { BaseRepository } from './BaseRepository';
import { Resource } from '../models/Resource';

class ResourceRepositoryClass extends BaseRepository<Resource> {
  protected tableName = 'resources';

  async save(resource: Resource): Promise<void> {
    await this.db.run(
      `INSERT INTO resources (id, topicId, url, description, type, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?)`,
      resource.id,
      resource.topicId,
      resource.url,
      resource.description,
      resource.type,
      resource.createdAt,
      resource.updatedAt
    );
  }

  async findByTopicId(topicId: string): Promise<Resource[]> {
    const rows = await this.db.all<Resource[]>(`SELECT * FROM ${this.tableName} WHERE topicId = ?`, topicId);
    return rows;
  }
}

export const ResourceRepository = new ResourceRepositoryClass();