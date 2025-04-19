import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import UsersController from '../controllers/users/users.controller';

class UsersRoute {
  public prefix_route = '/users';

  async routes(fastify: FastifyInstance, _options: FastifyPluginOptions) {
    const fastifyWithZod = fastify.withTypeProvider<ZodTypeProvider>();

    fastifyWithZod.get(
      '/get-by-id',
      {
        preHandler: fastify.authenticate
      },
      UsersController.getUserById
    );
  }
}

export default UsersRoute;
