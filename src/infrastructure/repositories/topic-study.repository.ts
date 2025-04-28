import { DatabaseConnection } from '../database/connection';
import { PrismaClient } from '@prisma/client';
import { TopicStudyInterface } from '@/domain/interfaces/topic-study.interface';

export class TopicStudyRepository {
  private db: PrismaClient;

  constructor() {
    this.db = DatabaseConnection.getInstance().getClient();
  }

  async listByUserId(userId: string): Promise<TopicStudyInterface[]> {
    try {
      const topicStudies = await this.db.topicStudy.findMany({
        where: { userId },
        select: {
          userId: true,
          topicId: true,
          status: true,
          startedAt: true,
          updatedAt: true,
          finishedAt: true,
          topic: {
            select: {
              id: true,
              name: true,
              description: true,
              position: true,
              subjectId: true
            }
          }
        }
      });
      return topicStudies;
    } catch (error) {
      throw new Error('Error listing topic studies by user: ' + error);
    }
  }

  async update({
    userId,
    topicId,
    finishedAt
  }: TopicStudyInterface): Promise<void> {
    try {
      await this.db.topicStudy.upsert({
        where: { userId_topicId: { userId, topicId } },
        update: {
          status: 'completed',
          updatedAt: new Date(),
          finishedAt
        },
        create: {
          userId,
          topicId,
          status: 'completed',
          startedAt: new Date(),
          updatedAt: new Date(),
          finishedAt
        }
      });
    } catch (error) {
      throw new Error('Error updating topic study: ' + error);
    }
  }

  async delete({ userId, topicId }: TopicStudyInterface): Promise<void> {
    try {
      await this.db.topicStudy.delete({
        where: { userId_topicId: { userId, topicId } }
      });
    } catch (error) {
      throw new Error('Error removing topic study: ' + error);
    }
  }
}

export default new TopicStudyRepository();
