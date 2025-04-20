import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import UsersController from '../controllers/users/users.controller';
import {
  idUserSchema,
  updateUserSchema
} from '@/domain/validations/user.validation';

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

    fastifyWithZod.get(
      '/list-all',
      {
        preHandler: fastify.authenticate
      },
      UsersController.listUsers
    );

    fastifyWithZod.put(
      '/update',
      {
        preHandler: fastify.authenticate,
        schema: {
          body: updateUserSchema
        }
      },
      UsersController.updateUser
    );

    fastifyWithZod.delete(
      '/delete',
      {
        preHandler: fastify.authenticate,
        schema: {
          body: idUserSchema
        }
      },
      UsersController.deleteUser
    );
  }
}

export default UsersRoute;
