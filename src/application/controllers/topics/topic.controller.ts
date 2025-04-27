import { listByTopicId } from '@/application/services/contents/content.service';
import {
  createTopic,
  deleteTopic,
  getTopicById,
  listTopics,
  updateTopic
} from '@/application/services/topics/topic.service';
import { checkIFUserIsAdmin } from '@/application/services/user/user.service';
import { ContentInterface } from '@/domain/interfaces/contents.interface';
import { TopicInterface } from '@/domain/interfaces/topics.interface';
import { FastifyReply, FastifyRequest } from 'fastify';

class TopicController {
  static async create(
    request: FastifyRequest,
    reply: FastifyReply
  ): Promise<TopicInterface> {
    try {
      const { name, description, position, subjectId } =
        request.body as TopicInterface;
      await checkIFUserIsAdmin(request.user.id);
      const topic = await createTopic({
        name,
        description,
        position,
        subjectId
      });
      return reply.status(201).send({
        message: 'Tópico criado com sucesso',
        topic
      });
    } catch (error) {
      throw error;
    }
  }

  static async getById(
    request: FastifyRequest,
    reply: FastifyReply
  ): Promise<TopicInterface> {
    try {
      const { id } = request.params as { id: string };
      const topic = await getTopicById(id);
      return reply.status(200).send(topic);
    } catch (error) {
      throw error;
    }
  }

  static async list(
    _request: FastifyRequest,
    reply: FastifyReply
  ): Promise<TopicInterface[]> {
    try {
      const topics = await listTopics();
      return reply.status(200).send(topics);
    } catch (error) {
      throw error;
    }
  }

  static async update(
    request: FastifyRequest,
    reply: FastifyReply
  ): Promise<TopicInterface> {
    try {
      const { id } = request.params as { id: string };
      const { name, description, position, subjectId } =
        request.body as TopicInterface;
      await checkIFUserIsAdmin(request.user.id);
      const topic = await updateTopic({
        id,
        name,
        description,
        position,
        subjectId
      });
      return reply.status(200).send({
        message: 'Tópico atualizado com sucesso',
        topic
      });
    } catch (error) {
      throw error;
    }
  }

  static async delete(
    request: FastifyRequest,
    reply: FastifyReply
  ): Promise<void> {
    try {
      const { id } = request.params as { id: string };
      await checkIFUserIsAdmin(request.user.id);
      await deleteTopic(id);
      return reply.status(200).send({
        message: 'Tópico deletado com sucesso'
      });
    } catch (error) {
      throw error;
    }
  }

  static async listContentsByTopic(
    request: FastifyRequest,
    reply: FastifyReply
  ): Promise<ContentInterface[]> {
    try {
      const { id: topicId } = request.params as { id: string };
      const contents = await listByTopicId(topicId);
      return reply.status(200).send(contents);
    } catch (error) {
      throw error;
    }
  }
}

export default TopicController;
