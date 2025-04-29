import { DatabaseConnection } from '../database/connection';
import { PrismaClient } from '@prisma/client';
import { SavedContentInterface } from '@/domain/interfaces/saved-content.interface';

export class SavedContentRepository {
  private db: PrismaClient;

  constructor() {
    this.db = DatabaseConnection.getInstance().getClient();
  }

  async save(
    userId: string,
    contentId: string
  ): Promise<SavedContentInterface> {
    try {
      const savedContent = await this.db.savedContent.create({
        data: {
          userId,
          contentId
        }
      });
      return savedContent;
    } catch (error) {
      throw new Error('Error saving content: ' + error);
    }
  }

  async delete(userId: string, contentId: string): Promise<void> {
    try {
      await this.db.savedContent.delete({
        where: {
          userId_contentId: {
            userId,
            contentId
          }
        }
      });
    } catch (error) {
      throw new Error('Error deleting saved content: ' + error);
    }
  }

  async listSavedContent(userId: string): Promise<SavedContentInterface[]> {
    try {
      const savedContent = await this.db.savedContent.findMany({
        where: { userId },
        select: {
          userId: true,
          contentId: true,
          savedAt: true
        }
      });
      return savedContent;
    } catch (error) {
      throw new Error('Error listing saved content: ' + error);
    }
  }
}

export default new SavedContentRepository();
