export interface TopicInterface {
  id?: string;
  name: string;
  description: string;
  position: number;
  subjectId: string;
  subject?: string;
  createdAt?: Date | null;
  updatedAt?: Date | null;
}
