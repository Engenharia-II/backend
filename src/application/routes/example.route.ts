import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import ExampleController from '../controllers/example/example.controller';
import { UserInterface } from '@/domain/interfaces/users.interface';
import { userSchema } from '@/domain/validations/user.validation';
import { ZodTypeProvider } from 'fastify-type-provider-zod';

class ExampleRoute {
  public prefix_route = '/example';

  async routes(fastify: FastifyInstance, _options: FastifyPluginOptions) {
    fastify.withTypeProvider<ZodTypeProvider>().post<{ Body: UserInterface }>(
      '/user/create',
      {
        schema: {
          body: userSchema
        }
      },
      ExampleController.create
    );
  }
}

export default ExampleRoute;
