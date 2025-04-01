export interface TopicVersion {
    version: number;
    content: string;
    updatedAt: string;
}

export interface Topic {
    id: string;
    name: string;
    parentTopicId?: string;
    versions: TopicVersion[];
    createdAt: string;
}