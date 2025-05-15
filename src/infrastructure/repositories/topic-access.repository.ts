import { DatabaseConnection } from '../database/connection';
import { PrismaClient } from '@prisma/client';
import { TopicAccessInterface } from '@/domain/interfaces/topic-access.interface';

export class TopicAccessRepository {
  private db: PrismaClient;

  constructor() {
    this.db = DatabaseConnection.getInstance().getClient();
  }

  async listLastTopicsAccess(userId: string): Promise<TopicAccessInterface[]> {
    try {
      const topicsAccess = await this.db.topicAccess.findMany({
        where: { userId },
        orderBy: { lastAccess: 'desc' },
        select: {
          userId: true,
          topicId: true,
          lastAccess: true,
          topic: {
            select: {
              id: true,
              name: true,
              description: true,
              createdAt: true,
              updatedAt: true,
              subject: {
                select: {
                  name: true,
                  id: true
                }
              }
            }
          }
        }
      });
      return topicsAccess;
    } catch (error) {
      throw new Error('Error listing last topics access: ' + error);
    }
  }

  async updateLastTopicAccess(userId: string, topicId: string): Promise<void> {
    try {
      await this.db.topicAccess.upsert({
        where: { userId_topicId: { userId, topicId } },
        update: { lastAccess: new Date() },
        create: {
          userId,
          topicId,
          lastAccess: new Date()
        }
      });
    } catch (error) {
      throw new Error('Error updating last topic access: ' + error);
    }
  }
}

export default new TopicAccessRepository();
