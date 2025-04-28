import { DatabaseConnection } from '../database/connection';
import { PrismaClient } from '@prisma/client';
import { SubjectAccess } from '@/domain/interfaces/subject-access.interface';

export class SubjectAccessRepository {
  private db: PrismaClient;

  constructor() {
    this.db = DatabaseConnection.getInstance().getClient();
  }

  async listLastSubjectsAccess(userId: string): Promise<SubjectAccess[]> {
    try {
      const subjectsAccess = await this.db.subjectAccess.findMany({
        where: { userId },
        orderBy: { lastAccess: 'desc' },
        select: {
          userId: true,
          subjectId: true,
          lastAccess: true
        }
      });
      return subjectsAccess;
    } catch (error) {
      throw new Error('Error listing last subjects access: ' + error);
    }
  }

  async updateLastSubjectAccess(
    userId: string,
    subjectId: string
  ): Promise<void> {
    try {
      await this.db.subjectAccess.upsert({
        where: { userId_subjectId: { userId, subjectId } },
        update: { lastAccess: new Date() },
        create: {
          userId,
          subjectId,
          lastAccess: new Date()
        }
      });
    } catch (error) {
      throw new Error('Error updating last subject access: ' + error);
    }
  }
}

export default new SubjectAccessRepository();
