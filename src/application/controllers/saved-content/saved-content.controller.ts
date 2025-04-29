import {
  listSavedContentsByUserId,
  removeSavedContent,
  saveContent
} from '@/application/services/saved-content/saved-content.service';
import { FastifyReply, FastifyRequest } from 'fastify';

class SavedContentController {
  static async saveContent(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { id: userId } = request.user;
      const { contentId } = request.body as { contentId: string };
      const savedContent = await saveContent(userId, contentId);
      return reply
        .status(201)
        .send({ message: 'Conteúdo salvo com sucesso.', savedContent });
    } catch (error) {
      throw error;
    }
  }

  static async removeSavedContent(
    request: FastifyRequest,
    reply: FastifyReply
  ) {
    try {
      const { id: userId } = request.user;
      const { contentId } = request.body as { contentId: string };
      await removeSavedContent(userId, contentId);
      return reply
        .status(200)
        .send({ message: 'Conteúdo removido da lista de salvos.' });
    } catch (error) {
      throw error;
    }
  }

  static async listSavedContentsByUserId(
    request: FastifyRequest,
    reply: FastifyReply
  ) {
    try {
      const { id: userId } = request.user;
      const savedContents = await listSavedContentsByUserId(userId);
      return reply.status(200).send(savedContents);
    } catch (error) {
      throw error;
    }
  }
}

export default SavedContentController;
