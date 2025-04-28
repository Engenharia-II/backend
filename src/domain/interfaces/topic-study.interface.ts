export interface TopicStudyInterface {
  userId: string;
  topicId: string;
  status?: string;
  startedAt?: Date;
  updatedAt?: Date;
  finishedAt?: Date | null;
  topic?: {
    id: string;
    name: string;
    description: string;
    position: number;
    subjectId: string;
  };
}
