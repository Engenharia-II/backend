import { FastifyReply, FastifyRequest } from 'fastify';
import { UserInterface } from '@/domain/interfaces/users.interface';
import {
  signUp,
  login
} from '@/application/services/sessions/sessions.service';
import { checkIfUserAlreadyExistsByEmail } from '@/application/services/user/user.service';
import { ResponseLoginInteface } from '@/domain/interfaces/sessions.interface';

class SessionsController {
  /**
   * @description Create a new user account
   * @swagger
   * /sessions/signup:
   *   post:
   *     summary: Create a new user
   *     tags:
   *       - Sessions
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - name
   *               - email
   *               - password
   *             properties:
   *               name:
   *                 type: string
   *               email:
   *                 type: string
   *               password:
   *                 type: string
   *     responses:
   *       200:
   *         description: User created successfully
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                 data:
   *                   type: object
   *                   properties:
   *                     id:
   *                       type: string
   */
  static async signUp(
    request: FastifyRequest,
    reply: FastifyReply
  ): Promise<UserInterface> {
    try {
      const { name, email, password } = request.body as UserInterface;
      await checkIfUserAlreadyExistsByEmail(email);
      const user = await signUp(name, email, password);
      return reply.code(200).send({
        message: 'Usuário criado com sucesso.',
        data: { id: user.id }
      });
    } catch (error) {
      throw error;
    }
  }

  static async login(
    request: FastifyRequest,
    reply: FastifyReply
  ): Promise<ResponseLoginInteface> {
    try {
      const { email, password } = request.body as UserInterface;

      const user = await login(email, password);

      const token = await reply.jwtSign({ id: user.id }, { expiresIn: '7d' });

      reply.setCookie('token', token, {
        path: '/',
        secure: true,
        sameSite: true,
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 // 7 days
      });

      return reply.code(200).send({
        message: 'Login realizado com sucesso.',
        data: { id: user.id, token }
      });
    } catch (error) {
      throw error;
    }
  }
}

export default SessionsController;
