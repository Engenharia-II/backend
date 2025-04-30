import { DatabaseConnection } from '../database/connection';
import { PrismaClient } from '@prisma/client';
import { SubjectInterface } from '@/domain/interfaces/subjects.interface';

export type RawSubjectProgressRow = {
  subject_id: string;
  name: string;
  total_topics: bigint;
  completed_topics: bigint;
};

export class SubjectRepository {
  private db: PrismaClient;

  constructor() {
    this.db = DatabaseConnection.getInstance().getClient();
  }

  async save({
    name,
    description
  }: SubjectInterface): Promise<SubjectInterface> {
    try {
      const subject = await this.db.subject.create({
        data: {
          name,
          description
        }
      });
      return {
        id: subject.id,
        name,
        description
      };
    } catch (error) {
      throw new Error('Error saving subject to database: ' + error);
    }
  }

  async getById(id: string): Promise<SubjectInterface | null> {
    try {
      const subject = await this.db.subject.findUnique({
        where: { id },
        select: {
          id: true,
          name: true,
          description: true,
          createdAt: true,
          updatedAt: true
        }
      });
      return subject;
    } catch (error) {
      throw new Error('Error finding subject by id: ' + error);
    }
  }

  async listAll(): Promise<SubjectInterface[]> {
    try {
      const subjects = await this.db.subject.findMany({
        select: {
          id: true,
          name: true,
          description: true,
          createdAt: true,
          updatedAt: true
        }
      });
      return subjects;
    } catch (error) {
      throw new Error('Error listing all subjects: ' + error);
    }
  }

  async update({
    id,
    name,
    description
  }: SubjectInterface): Promise<SubjectInterface> {
    try {
      const subject = await this.db.subject.update({
        where: { id },
        data: {
          name,
          description,
          updatedAt: new Date()
        }
      });
      return subject;
    } catch (error) {
      throw new Error('Error updating subject: ' + error);
    }
  }

  async delete(id: string): Promise<SubjectInterface | null> {
    try {
      const subject = await this.db.subject.delete({
        where: { id },
        select: {
          id: true,
          name: true,
          description: true,
          createdAt: true,
          updatedAt: true
        }
      });
      return subject;
    } catch (error) {
      throw new Error('Error deleting subject: ' + error);
    }
  }

  async listAllWithProgress(userId: string) {
    try {
      const rows = await this.db.$queryRaw<RawSubjectProgressRow[]>`
      SELECT 
        s.id              AS subject_id,
        s.name            AS name,
        COUNT(t.id)       AS total_topics,
        COUNT(ts.*)       AS completed_topics
      FROM subjects s
      LEFT JOIN topics t 
        ON t.subject_id = s.id
      LEFT JOIN topic_study ts 
        ON ts.topic_id = t.id 
       AND ts.user_id = ${userId} 
       AND ts.status  = 'completed'
      GROUP BY s.id, s.name
      ORDER BY s.name;
    `;
      return rows;
    } catch (error) {
      throw new Error('Error listing limited subjects with topics: ' + error);
    }
  }
}

export default new SubjectRepository();
