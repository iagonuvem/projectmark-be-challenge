import { TopicService } from '../../services/TopicService';
import { TopicRepository } from '../../repositories/TopicRepository';
import { ResourceRepository } from '../../repositories/ResourceRepository';
import { Resource } from '../../models/Resource';

jest.mock('../../repositories/TopicRepository');
jest.mock('../../services/ResourceService');

describe('TopicService', () => {
  const basic: { name: string; content: string; parentTopicId?: string } = {
    name: 'Topic 1',
    content: 'Some content',
    parentTopicId: undefined
  };

  it('should create a topic', async () => {
    const topic = await TopicService.create(basic);
    expect(topic).toHaveProperty('id');
    expect(topic.name).toBe(basic.name);
    expect(topic.versions[0].content).toBe(basic.content);
  });

  it('should return topic by id', async () => {
    const mockTopic = {
      id: '123',
      name: 'Test Topic',
      createdAt: '2024-01-01',
      versions: [{ version: 1, content: 'Initial content', updatedAt: '2024-01-01' }]
    };
    (TopicRepository.findById as jest.Mock).mockResolvedValue(mockTopic);
    const result = await TopicService.getVersion('123', 1);
    expect(result?.version).toBe(1);
    expect(result?.content).toBe('Initial content');
  });

  it('should create topic version', async () => {
    const oldTopic = {
      id: '1',
      name: 'Old Topic',
      parentTopicId: undefined,
      createdAt: '2025-01-01',
      versions: [
        { version: 1, content: 'Old content', updatedAt: '2025-01-01' }
      ]
    };
    (TopicRepository.findById as jest.Mock).mockResolvedValue(oldTopic);

    const updated = await TopicService.updateVersion('1', {
      content: 'New Version'
    });

    expect(updated.versions.length).toBe(2);
    expect(updated.versions[1].version).toBe(2);
    expect(updated.versions[1].content).toBe('New Version');
  });

  it('should get topic resources', async () => {
    const mockResources: Resource[] = [
      {
        id: 'r1',
        topicId: 't1',
        url: 'https://example.com',
        description: 'res',
        type: 'pdf',
        createdAt: '',
        updatedAt: ''
      }
    ];
    
    jest.spyOn(ResourceRepository, 'findByTopicId').mockResolvedValue(mockResources);
  
    const result = await TopicService.getResources('t1');
    expect(result).toEqual(mockResources);
  });  

  it('should return a tree structure', async () => {
    (TopicRepository.findAll as jest.Mock).mockResolvedValue([
      { id: '1', name: 'Root', createdAt: '', versions: [{ version: 1, content: '', updatedAt: '' }] },
      { id: '2', name: 'Child', parentTopicId: '1', createdAt: '', versions: [{ version: 1, content: '', updatedAt: '' }] }
    ]);
    const tree = await TopicService.getTree('1');
    expect(tree.topic.id).toBe('1');
    expect(tree.children[0].topic.id).toBe('2');
  });
});