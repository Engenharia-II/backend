import { FastifyReply, FastifyRequest } from 'fastify';
import { getUserById } from '../../services/user/user.service';
import { AppError } from '@/infrastructure/webserver/app-error';

class UsersController {
  static async getUserById(request: FastifyRequest, reply: FastifyReply) {
    const userId = request.user.id;
    const user = await getUserById(userId);
    if (!user) {
      throw new AppError('Usuário não encontrado', 404);
    }
    return reply.status(200).send(user);
  }
}

export default UsersController;
