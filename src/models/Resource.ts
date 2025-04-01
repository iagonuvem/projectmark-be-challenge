export interface Resource {
    id: string;
    topicId: string;
    url: string;
    description: string;
    type: 'video' | 'article' | 'pdf';
    createdAt: string;
    updatedAt: string;
}