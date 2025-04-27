import { FastifyReply, FastifyRequest } from 'fastify';
import {
  checkIFUserIsAdmin,
  deleteUser,
  getUserById,
  listAllUsers,
  listLastContentsAccessByUserId,
  updateUser
} from '../../services/user/user.service';
import { AppError } from '@/infrastructure/webserver/app-error';
import { UserInterface } from '@/domain/interfaces/users.interface';

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

  static async listUsers(request: FastifyRequest, reply: FastifyReply) {
    try {
      await checkIFUserIsAdmin(request.user.id);
      const users = await listAllUsers();
      return reply.status(200).send(users);
    } catch (error) {
      throw error;
    }
  }

  static async updateUser(request: FastifyRequest, reply: FastifyReply) {
    try {
      const id = request.user.id;
      const { name, email, password, confirmPassword } =
        request.body as UserInterface;

      if (password !== confirmPassword) {
        throw new AppError('As senhas não coincidem', 400);
      }
      const updatedUser = await updateUser({
        id,
        name,
        email,
        password
      });
      return reply.status(200).send(updatedUser);
    } catch (error) {
      throw error;
    }
  }

  static async deleteUser(request: FastifyRequest, reply: FastifyReply) {
    try {
      const userId = request.user.id;
      await checkIFUserIsAdmin(userId);
      const { id } = request.params as { id: string };

      if (userId === id) {
        throw new AppError('Você não pode deletar sua própria conta', 400);
      }

      const deletedUser = await deleteUser(id);
      return reply
        .status(200)
        .send({ message: 'Usuário deletado com sucesso', data: deletedUser });
    } catch (error) {
      throw error;
    }
  }

  static async listLastUserContentAccess(
    request: FastifyRequest,
    reply: FastifyReply
  ) {
    try {
      const { id: userId } = request.params as { id: string };
      const contents = await listLastContentsAccessByUserId(userId);
      return reply.status(200).send(contents);
    } catch (error) {
      throw error;
    }
  }
}

export default UsersController;
