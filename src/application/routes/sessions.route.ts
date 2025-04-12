import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import { UserInterface } from '@/domain/interfaces/users.interface';
import { userSchema } from '@/domain/validations/user.validation';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import SessionsController from '../controllers/sessions/sessions.controller';

class SessionsRoute {
  public prefix_route = '/sessions';

  async routes(fastify: FastifyInstance, _options: FastifyPluginOptions) {
    fastify.withTypeProvider<ZodTypeProvider>().post<{ Body: UserInterface }>(
      '/sign-up',
      {
        schema: {
          body: userSchema
        }
      },
      SessionsController.signUp
    );
  }
}

export default SessionsRoute;
