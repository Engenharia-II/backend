import { FastifyReply, FastifyRequest } from 'fastify';
import { TopicStudyInterface } from '@/domain/interfaces/topic-study.interface';
import {
  listTopicStudiesByUser,
  removeTopicStudy,
  updateTopicStudy
} from '@/application/services/topic-study/topic-study.service';

class TopicStudyController {
  static async listByUser(
    request: FastifyRequest,
    reply: FastifyReply
  ): Promise<TopicStudyInterface[]> {
    try {
      const topicStudies = await listTopicStudiesByUser(request.user.id);
      return reply.status(200).send(topicStudies);
    } catch (error) {
      throw error;
    }
  }

  static async updateTopicStudy(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { id: userId } = request.user;
      const { topicId, finishedAt } = request.body as {
        topicId: string;
        finishedAt?: Date;
      };
      await updateTopicStudy({ userId, topicId, finishedAt });
      return reply
        .status(200)
        .send({ message: 'Estudo do tópico atualizado com sucesso' });
    } catch (error) {
      throw error;
    }
  }

  static async removeTopicStudy(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { id: userId } = request.user;
      const { topicId } = request.body as { topicId: string };
      await removeTopicStudy({ userId, topicId });
      return reply
        .status(200)
        .send({ message: 'Estudo do tópico removido com sucesso' });
    } catch (error) {
      throw error;
    }
  }
}

export default TopicStudyController;
