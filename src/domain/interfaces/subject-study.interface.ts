export interface SubjectStudyInterface {
  userId: string;
  subjectId: string;
  status?: string;
  startedAt?: Date;
  updatedAt?: Date;
  finishedAt?: Date | null;
  subject?: {
    id: string;
    name: string;
    description: string;
  };
}
