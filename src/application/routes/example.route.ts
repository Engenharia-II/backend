import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import ExampleController from '../controllers/example/example.controller';
import { UserInterface } from '@/domain/interfaces/users.interface';
import { RegisterSchema } from '@/domain/validations/user.validation';

class ExampleRoute {
  public prefix_route = '/example';

  async routes(fastify: FastifyInstance, _options: FastifyPluginOptions) {
    fastify.post<{ Body: UserInterface }>(
      '/user/create',
      {
        schema: {
          body: RegisterSchema
        }
      },
      ExampleController.create
    );
  }
}

export default ExampleRoute;
