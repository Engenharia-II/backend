import { DatabaseConnection } from '../database/connection';
import { PrismaClient } from '@prisma/client';
import { TopicInterface } from '@/domain/interfaces/topics.interface';

export class TopicRepository {
  private db: PrismaClient;

  constructor() {
    this.db = DatabaseConnection.getInstance().getClient();
  }

  async save({
    name,
    description,
    position,
    subjectId
  }: TopicInterface): Promise<TopicInterface> {
    try {
      const topic = await this.db.topic.create({
        data: {
          name,
          description,
          position,
          subjectId
        }
      });
      return {
        id: topic.id,
        name,
        description,
        position,
        subjectId
      };
    } catch (error) {
      throw new Error('Error saving topic to database: ' + error);
    }
  }

  async getById(id: string): Promise<TopicInterface | null> {
    try {
      const topic = await this.db.topic.findUnique({
        where: { id },
        select: {
          id: true,
          name: true,
          description: true,
          position: true,
          subjectId: true,
          createdAt: true,
          updatedAt: true
        }
      });
      return topic;
    } catch (error) {
      throw new Error('Error finding topic by id: ' + error);
    }
  }

  async listAll(): Promise<TopicInterface[]> {
    try {
      const topics = await this.db.topic.findMany({
        select: {
          id: true,
          name: true,
          description: true,
          position: true,
          subjectId: true,
          createdAt: true,
          updatedAt: true
        }
      });
      return topics;
    } catch (error) {
      throw new Error('Error listing all topics: ' + error);
    }
  }

  async update({
    id,
    name,
    description,
    position,
    subjectId
  }: TopicInterface): Promise<TopicInterface> {
    try {
      const topic = await this.db.topic.update({
        where: { id, subjectId },
        data: {
          name,
          description,
          position,
          updatedAt: new Date()
        }
      });
      return topic;
    } catch (error) {
      throw new Error('Error updating topic: ' + error);
    }
  }

  async delete(id: string): Promise<TopicInterface | null> {
    try {
      const topic = await this.db.topic.delete({
        where: { id },
        select: {
          id: true,
          name: true,
          description: true,
          position: true,
          subjectId: true,
          createdAt: true,
          updatedAt: true
        }
      });
      return topic;
    } catch (error) {
      throw new Error('Error deleting topic: ' + error);
    }
  }

  async listBySubjectId(subjectId: string): Promise<TopicInterface[]> {
    try {
      const topics = await this.db.topic.findMany({
        where: { subjectId },
        select: {
          id: true,
          name: true,
          description: true,
          position: true,
          subjectId: true,
          createdAt: true,
          updatedAt: true
        },
        orderBy: {
          position: 'asc'
        }
      });
      return topics;
    } catch (error) {
      throw new Error('Error listing topics by subject: ' + error);
    }
  }
}

export default new TopicRepository();
