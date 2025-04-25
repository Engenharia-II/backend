import {
  ContentInterface,
  ContentType
} from '@/domain/interfaces/contents.interface';
import { DatabaseConnection } from '../database/connection';
import { PrismaClient } from '@prisma/client';

export class ContentRepository {
  private db: PrismaClient;

  constructor() {
    this.db = DatabaseConnection.getInstance().getClient();
  }

  async save({
    name,
    description,
    topicId,
    duration,
    isFree,
    publicationDate,
    type,
    url,
    tumbnailUrl
  }: ContentInterface): Promise<ContentInterface> {
    try {
      const content = await this.db.content.create({
        data: {
          name,
          description,
          topicId,
          duration,
          isFree,
          publicationDate,
          type,
          url,
          tumbnailUrl
        }
      });
      return {
        id: content.id,
        name,
        description,
        topicId,
        duration,
        isFree,
        publicationDate,
        type,
        url,
        tumbnailUrl
      };
    } catch (error) {
      throw new Error('Error saving content to database: ' + error);
    }
  }

  async getById(id: string): Promise<ContentInterface | null> {
    try {
      const content = await this.db.content.findUnique({
        where: { id },
        select: {
          id: true,
          name: true,
          description: true,
          topicId: true,
          duration: true,
          isFree: true,
          publicationDate: true,
          type: true,
          url: true,
          tumbnailUrl: true,
          createdAt: true,
          updatedAt: true
        }
      });
      return content
        ? {
            ...content,
            type: content.type as ContentType
          }
        : null;
    } catch (error) {
      throw new Error('Error finding content by id: ' + error);
    }
  }

  async listAll(): Promise<ContentInterface[]> {
    try {
      const contents = await this.db.content.findMany({
        select: {
          id: true,
          name: true,
          description: true,
          topicId: true,
          duration: true,
          isFree: true,
          publicationDate: true,
          type: true,
          url: true,
          tumbnailUrl: true,
          createdAt: true,
          updatedAt: true
        }
      });
      return contents.map((content) => ({
        ...content,
        type: content.type as ContentType
      }));
    } catch (error) {
      throw new Error('Error listing all contents: ' + error);
    }
  }

  async update({
    id,
    name,
    description,
    topicId,
    duration,
    isFree,
    publicationDate,
    type,
    url,
    tumbnailUrl
  }: ContentInterface): Promise<ContentInterface> {
    try {
      const content = await this.db.content.update({
        where: { id },
        data: {
          name,
          description,
          topicId,
          duration,
          isFree,
          publicationDate,
          type,
          url,
          tumbnailUrl
        }
      });
      return {
        ...content,
        type: content.type as ContentType
      };
    } catch (error) {
      throw new Error('Error updating content: ' + error);
    }
  }

  async delete(id: string): Promise<ContentInterface | null> {
    try {
      const content = await this.db.content.delete({
        where: { id },
        select: {
          id: true,
          name: true,
          description: true,
          topicId: true,
          duration: true,
          isFree: true,
          publicationDate: true,
          type: true,
          url: true,
          tumbnailUrl: true,
          createdAt: true,
          updatedAt: true
        }
      });
      return content
        ? {
            ...content,
            type: content.type as ContentType
          }
        : null;
    } catch (error) {
      throw new Error('Error deleting content: ' + error);
    }
  }
}

export default new ContentRepository();
