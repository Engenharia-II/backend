import { DatabaseConnection } from '../database/connection';
import { PrismaClient } from '@prisma/client';
import { SubjectStudyInterface } from '@/domain/interfaces/subject-study.interface';

export class SubjectStudyRepository {
  private db: PrismaClient;

  constructor() {
    this.db = DatabaseConnection.getInstance().getClient();
  }

  async listByUserId(userId: string): Promise<SubjectStudyInterface[]> {
    try {
      const subjectStudies = await this.db.subjectStudy.findMany({
        where: { userId },
        select: {
          userId: true,
          subjectId: true,
          status: true,
          startedAt: true,
          updatedAt: true,
          finishedAt: true,
          subject: {
            select: {
              id: true,
              name: true,
              description: true
            }
          }
        }
      });
      return subjectStudies;
    } catch (error) {
      throw new Error('Error listing subject studies by user: ' + error);
    }
  }

  async update({
    userId,
    subjectId,
    finishedAt
  }: SubjectStudyInterface): Promise<void> {
    try {
      await this.db.subjectStudy.upsert({
        where: { userId_subjectId: { userId, subjectId } },
        update: {
          status: 'completed',
          updatedAt: new Date(),
          finishedAt
        },
        create: {
          userId,
          subjectId,
          status: 'in_progress',
          startedAt: new Date(),
          updatedAt: new Date(),
          finishedAt
        }
      });
    } catch (error) {
      throw new Error('Error updating subject study: ' + error);
    }
  }

  async delete({ userId, subjectId }: SubjectStudyInterface): Promise<void> {
    try {
      await this.db.subjectStudy.delete({
        where: { userId_subjectId: { userId, subjectId } }
      });
    } catch (error) {
      throw new Error('Error removing subject study: ' + error);
    }
  }
}

export default new SubjectStudyRepository();
