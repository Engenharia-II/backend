import {
  createContent,
  deleteContent,
  getContentById,
  listContents,
  updateContent
} from '@/application/services/contents/content.service';
import { checkIFUserIsAdmin } from '@/application/services/user/user.service';
import { ContentInterface } from '@/domain/interfaces/contents.interface';
import { FastifyReply, FastifyRequest } from 'fastify';

export class ContentController {
  static async create(
    request: FastifyRequest,
    reply: FastifyReply
  ): Promise<ContentInterface> {
    try {
      const {
        name,
        description,
        duration,
        isFree,
        publicationDate,
        topicId,
        type,
        url,
        tumbnailUrl
      } = request.body as ContentInterface;
      await checkIFUserIsAdmin(request.user.id);
      const content = await createContent({
        name,
        description,
        duration,
        isFree,
        publicationDate,
        topicId,
        type,
        url,
        tumbnailUrl
      });
      return reply.status(201).send({
        message: 'Conteúdo criado com sucesso',
        content
      });
    } catch (error) {
      throw error;
    }
  }

  static async getById(
    request: FastifyRequest,
    reply: FastifyReply
  ): Promise<ContentInterface> {
    try {
      const { id } = request.params as { id: string };
      const content = await getContentById(id);
      return reply.status(200).send(content);
    } catch (error) {
      throw error;
    }
  }

  static async list(
    _request: FastifyRequest,
    reply: FastifyReply
  ): Promise<ContentInterface[]> {
    try {
      const contents = await listContents();
      return reply.status(200).send(contents);
    } catch (error) {
      throw error;
    }
  }

  static async update(
    request: FastifyRequest,
    reply: FastifyReply
  ): Promise<ContentInterface> {
    try {
      const { id } = request.params as { id: string };
      const {
        name,
        description,
        duration,
        isFree,
        publicationDate,
        topicId,
        type,
        url,
        tumbnailUrl
      } = request.body as ContentInterface;
      await checkIFUserIsAdmin(request.user.id);
      const content = await updateContent({
        id,
        name,
        description,
        duration,
        isFree,
        publicationDate,
        topicId,
        type,
        url,
        tumbnailUrl
      });
      return reply.status(200).send({
        message: 'Conteúdo atualizado com sucesso',
        content
      });
    } catch (error) {
      throw error;
    }
  }

  static async delete(
    request: FastifyRequest,
    reply: FastifyReply
  ): Promise<ContentInterface> {
    try {
      const { id } = request.params as { id: string };
      await checkIFUserIsAdmin(request.user.id);
      const content = await deleteContent(id);
      return reply.status(200).send({
        message: 'Conteúdo deletado com sucesso',
        content
      });
    } catch (error) {
      throw error;
    }
  }
}

export default new ContentController();
