import { TopicInterface } from './topics.interface';

export interface SubjectInterface {
  id?: string;
  name: string;
  description: string;
  createdAt?: Date | null;
  updatedAt?: Date | null;
}

export type RawSubjectWithStatsRow = {
  subject_id: string;
  name: string;
  description: string;
  created_at: Date;
  updated_at: Date;
  topics: TopicInterface[]; // array de objetos
  total_topics: number;
  completed_topics: number;
  subject_progress: number; // 0–1
  subject_duration: number; // em segundos
};

export type RawSubjectProgressRow = {
  subject_id: string;
  name: string;
  total_topics: bigint;
  completed_topics: bigint;
};
