import { FastifyReply, FastifyRequest } from 'fastify';
import { UserInterface } from '@/domain/interfaces/users.interface';
import { signUp } from '@/application/services/sessions/sessions.service';
import { checkIfUserAlreadyExistsByEmail } from '@/application/services/user/user.service';

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
}

export default SessionsController;
