import { FastifyReply, FastifyRequest } from 'fastify';
import {
  checkIFUserIsAdmin,
  getUserById
} from '../../services/user/user.service';
import { AppError } from '@/infrastructure/webserver/app-error';
import userRepository from '@/infrastructure/repositories/user.repository';

class UsersController {
  static async getUserById(request: FastifyRequest, reply: FastifyReply) {
    try {
      const userId = request.user.id;
      const user = await getUserById(userId);
      if (!user) {
        throw new AppError('Usuário não encontrado', 404);
      }
      return reply.status(200).send(user);
    } catch (error) {
      throw error;
    }
  }

  static async listAllUsers(request: FastifyRequest, reply: FastifyReply) {
    try {
      await checkIFUserIsAdmin(request.user.id);
      const users = await userRepository.listAll();
      return reply.status(200).send(users);
    } catch (error) {
      throw error;
    }
  }
}

export default UsersController;
