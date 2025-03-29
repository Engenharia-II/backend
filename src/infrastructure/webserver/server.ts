import fastify, {
  FastifyInstance,
  FastifyPluginAsync,
  FastifyPluginCallback
} from 'fastify';
import config from '../config/constants';

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
    this.app.addHook('preHandler', (req, _reply, done) => {
      if (req.body) {
        req.log.info({ body: req.body }, 'parsed body');
      }
      done();
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

      // eslint-disable-next-line no-console
      console.log(
        `App listening on the http://${this.app_domain}:${this.app_port} 🚀`
      );
    });
  }
}

export default App;
