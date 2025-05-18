import { DatabaseConnection } from '@/infrastructure/database/connection';
import { PrismaClient } from '@prisma/client';

class UpdateSubjectStatusService {
  private db: PrismaClient;

  constructor() {
    this.db = DatabaseConnection.getInstance().getClient();
  }

  /**
   * Updates the subject study status based on topic completion
   * - If all topics are completed, mark subject as 'completed'
   * - If some topics are completed, but not all, mark as 'in_progress'
   * - Status is only updated if it needs to be changed
   */
  async updateSubjectStatus(topicId: string, userId: string): Promise<void> {
    try {
      // First, get the subject ID for the topic
      const topic = await this.db.topic.findUnique({
        where: { id: topicId },
        select: { subjectId: true }
      });

      if (!topic) {
        throw new Error(`Topic with id ${topicId} not found`);
      }

      const subjectId = topic.subjectId;

      // Count total topics in the subject
      const totalTopics = await this.db.topic.count({
        where: { subjectId }
      });

      // Count completed topics by the user in this subject
      const completedTopics = await this.db.topicStudy.count({
        where: {
          userId,
          status: 'completed',
          topic: {
            subjectId
          }
        }
      });

      // Check if the subject study entry exists for this user
      const existingStudy = await this.db.subjectStudy.findUnique({
        where: {
          userId_subjectId: {
            userId,
            subjectId
          }
        }
      });

      // Determine the new status
      let newStatus: string;
      if (completedTopics === 0) {
        return; // No completed topics, no need for subject status
      } else if (completedTopics === totalTopics) {
        newStatus = 'completed';
      } else {
        newStatus = 'in_progress';
      }

      // Update or create the subject study entry
      if (existingStudy) {
        if (existingStudy.status !== newStatus) {
          // Only update if status is changing
          await this.db.subjectStudy.update({
            where: {
              userId_subjectId: {
                userId,
                subjectId
              }
            },
            data: {
              status: newStatus,
              updatedAt: new Date(),
              finishedAt: newStatus === 'completed' ? new Date() : null
            }
          });
        }
      } else {
        // Create a new subject study entry
        await this.db.subjectStudy.create({
          data: {
            userId,
            subjectId,
            status: newStatus,
            finishedAt: newStatus === 'completed' ? new Date() : null
          }
        });
      }
    } catch (error) {
      throw new Error(`Error updating subject status: ${error}`);
    }
  }
}

export default new UpdateSubjectStatusService();
