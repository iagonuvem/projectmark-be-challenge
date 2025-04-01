import { Topic } from '../models/Topic';

export interface TopicNode {
  topic: Topic;
  children: TopicNode[];
}