import { Topic } from '../models/Topic';
import { TopicNode } from '../interfaces/ITopicTree';

export function buildTopicTree(topics: Topic[], rootId: string): TopicNode {
  const map = new Map<string, TopicNode>();
  topics.forEach(topic => {
    map.set(topic.id, { topic, children: [] });
  });

  let root: TopicNode | undefined;
  map.forEach(node => {
    if (node.topic.parentTopicId) {
      const parent = map.get(node.topic.parentTopicId);
      parent?.children.push(node);
    }
    if (node.topic.id === rootId) {
      root = node;
    }
  });

  if (!root) throw new Error('Root topic not found');
  return root;
}
