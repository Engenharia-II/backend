import fastify, {
  FastifyInstance,
  FastifyPluginAsync,
  FastifyPluginCallback
} from 'fastify';
import fastifySwagger from '@fastify/swagger';
import config from '../config/constants';
import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler
} from 'fastify-type-provider-zod';
import fastifySwaggerUi from '@fastify/swagger-ui';
import cors from '@fastify/cors';
import helmet from '@fastify/helmet';

interface CustomRouteHandler {
  prefix_route: string;
  routes: FastifyPluginAsync;
}

class App {
  public app: FastifyInstance;
  public app_domain: string = config.app.domain;
  public app_port: number = config.app.port;

  constructor(appInit: {
    plugins: FastifyPluginCallback[];
    routes: (new () => CustomRouteHandler)[];
  }) {
    this.app = fastify({
      logger: true
    });

    this.app.register(cors, {
      origin: process.env.FRONTEND_URL,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
      exposedHeaders: ['Content-Type', 'Authorization'],
      credentials: true,
      maxAge: 86400
    });

    this.app.register(helmet, {
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
          objectSrc: ["'none'"],
          upgradeInsecureRequests: []
        }
      }
    });

    this.app.setValidatorCompiler(validatorCompiler);
    this.app.setSerializerCompiler(serializerCompiler);

    this.app.register(fastifySwagger, {
      openapi: {
        info: {
          title: 'CaminhoDev API Documentation',
          description: 'API documentation for the caminhoDev',
          version: '1.0.0'
        }
      },
      transform: jsonSchemaTransform
    });

    this.app.addHook('preHandler', (req, _reply, done) => {
      if (req.body) {
        req.log.info({ body: req.body }, 'parsed body');
      }
      done();
    });

    this.app.register(fastifySwaggerUi, {
      routePrefix: '/docs'
    });

    this.register(appInit.plugins);
    this.routes(appInit.routes);
  }

  private register(plugins: FastifyPluginCallback[]) {
    plugins.forEach((plugin) => {
      this.app.register(plugin);
    });
  }

  public routes(routes: (new () => CustomRouteHandler)[]) {
    routes.forEach((Route) => {
      const router = new Route();
      this.app.register(router.routes, { prefix: router.prefix_route });
    });

    this.app.get('/healthcheck', async (request, reply) => {
      reply.send({ healthcheck: 'server is alive' });
    });
  }

  public listen() {
    this.app.listen({ host: this.app_domain, port: this.app_port }, (err) => {
      if (err) {
        this.app.log.fatal({ msg: `Application startup error`, err });
        process.exit(1);
      }

      if (process.env.NODE_ENV !== 'test') {
        // eslint-disable-next-line no-console
        console.log(
          `App listening on the http://${this.app_domain}:${this.app_port} 🚀`
        );
      }
    });
  }

  public async close() {
    if (this.app) {
      await this.app.close();
    }
  }
}

export default App;
