import { Topic } from '../models/Topic';
import { TopicRepository } from '../repositories/TopicRepository';
import { TopicNode } from '../interfaces/ITopicTree';
import { findShortestPath } from '../utils/shortestPath';
import { v4 as uuidv4 } from 'uuid';
import { buildTopicTree } from '../utils/topicTreeBuilder';
import { ErrorType } from '../enums/errors';

interface CreateTopicInput {
  name: string;
  content: string;
  parentTopicId?: string;
}

export const TopicService = {
  async create(data: CreateTopicInput): Promise<Topic> {
    const topic: Topic = {
      id: uuidv4(),
      name: data.name!,
      parentTopicId: data.parentTopicId,
      createdAt: new Date().toISOString(),
      versions: [{
        version: 1,
        content: data.content!,
        updatedAt: new Date().toISOString()
      }]
    };
    await TopicRepository.save(topic);
    return topic;
  },

  async updateVersion(id: string, data: { content: string }): Promise<Topic> {
    const err: Error = {
      name: ErrorType.NOT_FOUND,
      message: 'Topic not found'
    }
    const topic = await TopicRepository.findById(id);
    if (!topic) throw err;

    const newVersion = {
      version: topic.versions.length + 1,
      content: data.content,
      updatedAt: new Date().toISOString()
    };
    topic.versions.push(newVersion);
    await TopicRepository.update(id, topic);
    return topic;
  },

  async getVersion(id: string, version: number): Promise<any> {
    const err: Error = {
      name: ErrorType.NOT_FOUND,
      message: 'Topic not found'
    }
    const topic = await TopicRepository.findById(id);
    if (!topic) throw err;
    const v = topic.versions.find(v => v.version === version);
    if (!v) {
      err.message = 'Version not found';
      throw err;
    }
    return {
      id: topic.id,
      name: topic.name,
      parentTopicId: topic.parentTopicId,
      topic: topic.createdAt,
      version: v.version,
      content: v.content,
      updatedAt: v.updatedAt
    };
  },

  async getTree(id: string): Promise<TopicNode> {
    const topics = await TopicRepository.findAll();
    return buildTopicTree(topics, id);
  },

  async getShortestPath(from: string, to: string): Promise<string[]> {
    const topics = await TopicRepository.findAll();
    const edges: [string, string][] = [];

    topics.forEach(topic => {
      if (topic.parentTopicId) {
        edges.push([topic.id, topic.parentTopicId]);
      }
    });

    return findShortestPath(edges, from, to);
  }
};