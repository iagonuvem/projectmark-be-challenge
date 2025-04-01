import { BaseRepository } from './BaseRepository';
import { Topic } from '../models/Topic';

class TopicRepositoryClass extends BaseRepository<Topic> {
    protected tableName = 'topics';

    async save(topic: Topic): Promise<void> {
        await this.db.run(
            `INSERT INTO topics (id, name, parentTopicId, createdAt, versions) VALUES (?, ?, ?, ?, ?)`,
            topic.id,
            topic.name,
            topic.parentTopicId || null,
            topic.createdAt,
            JSON.stringify(topic.versions)
        );
    }

    async update(id: string, topic: Topic): Promise<void> {
        await this.db.run(
            `UPDATE topics SET name = ?, parentTopicId = ?, versions = ? WHERE id = ?`,
            topic.name,
            topic.parentTopicId || null,
            JSON.stringify(topic.versions),
            id
        );
    }

    async findAll(): Promise<Topic[]> {
        const rows = await super.findAll();
        return rows.map(row => ({ ...row, versions: row.versions }));
    }

    async findById(id: string): Promise<Topic | undefined> {
        const row = await super.findById(id);
        if (!row) return undefined;
        return { ...row, versions: JSON.parse((row as any).versions) };
    }
}

export const TopicRepository = new TopicRepositoryClass();