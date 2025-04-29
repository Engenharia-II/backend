import {
  listLastTopicsAccessByUserId,
  updateLastTopicAccess
} from '@/application/services/topic-access/topic-access.service';
import { FastifyReply, FastifyRequest } from 'fastify';

class TopicAccessController {
  static async listLastUserTopicAccess(
    request: FastifyRequest,
    reply: FastifyReply
  ) {
    try {
      const { id: userId } = request.params as { id: string };
      const topics = await listLastTopicsAccessByUserId(userId);
      return reply.status(200).send(topics);
    } catch (error) {
      throw error;
    }
  }

  static async updateLastTopicAccess(
    request: FastifyRequest,
    reply: FastifyReply
  ) {
    try {
      const { id: userId } = request.user;
      const { topicId } = request.body as { topicId: string };
      await updateLastTopicAccess(userId, topicId);
      return reply
        .status(200)
        .send({ message: 'Último acesso atualizado com sucesso' });
    } catch (error) {
      throw error;
    }
  }
}

export default TopicAccessController;
