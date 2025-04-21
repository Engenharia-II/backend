import { FastifyReply, FastifyRequest } from 'fastify';
import { checkIFUserIsAdmin } from '@/application/services/user/user.service';
import { SubjectInterface } from '@/domain/interfaces/subjects.interface';
import { createSubject } from '@/application/services/subjects/subject.service';

class SubjectController {
  static async create(
    request: FastifyRequest,
    reply: FastifyReply
  ): Promise<SubjectInterface> {
    try {
      const { name, description } = request.body as SubjectInterface;
      await checkIFUserIsAdmin(request.user.id);
      const subject = await createSubject({ name, description });
      return reply.status(201).send({
        message: 'Matéria criada com sucesso',
        subject
      });
    } catch (error) {
      throw error;
    }
  }
}

export default SubjectController;
