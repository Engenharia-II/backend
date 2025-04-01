import { FastifyReply, FastifyRequest } from 'fastify';
import { createUser } from '@/application/services/example/example.service';
import { UserInterface } from '@/domain/interfaces/users.interface';

class ExampleController {
  /**
   * @description Create a new user with name and e-mail.
   *
   * @param req: FastifyRequest
   * @param res: FastifyReply
   * @returns {Promise<void>}
   * @memberof ExampleController
   */
  static async create(
    request: FastifyRequest,
    reply: FastifyReply
  ): Promise<UserInterface | void> {
    try {
      const { name, email } = request.body as UserInterface;
      const user = await createUser(name, email);
      return reply
        .code(200)
        .send({ message: 'User created with success.', data: user });
    } catch (error) {
      throw error;
    }
  }
}

export default ExampleController;
