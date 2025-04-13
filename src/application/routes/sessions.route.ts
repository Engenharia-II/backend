import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import { UserInterface } from '@/domain/interfaces/users.interface';
import { userSchema } from '@/domain/validations/user.validation';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import SessionsController from '../controllers/sessions/sessions.controller';
import { loginSchema } from '@/domain/validations/sessions.validation';

class SessionsRoute {
  public prefix_route = '/sessions';

  async routes(fastify: FastifyInstance, _options: FastifyPluginOptions) {
    const fastifyWithZod = fastify.withTypeProvider<ZodTypeProvider>();

    fastifyWithZod.post<{ Body: UserInterface }>(
      '/sign-up',
      {
        schema: {
          body: userSchema
        }
      },
      SessionsController.signUp
    );

    fastifyWithZod.post<{ Body: UserInterface }>(
      '/login',
      {
        schema: {
          body: loginSchema
        }
      },
      SessionsController.login
    );

    fastifyWithZod.post(
      '/logout',
      {
        preHandler: fastify.authenticate
      },
      SessionsController.logout
    );
  }
}

export default SessionsRoute;
