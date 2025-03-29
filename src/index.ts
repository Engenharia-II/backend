import App from '@/infrastructure/webserver/server';
import ExampleRoute from '@/application/routes/example.route';
import { errorHandler } from './infrastructure/webserver/error-handler';

export const app = new App({
  plugins: [],
  routes: [ExampleRoute]
});

errorHandler(app.app);

if (process.env.NODE_ENV !== 'test') {
  app.listen();
}
