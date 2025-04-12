import App from '@/infrastructure/webserver/server';
import SessionsRoute from '@/application/routes/sessions.route';
import { errorHandler } from './infrastructure/webserver/error-handler';

export const app = new App({
  plugins: [],
  routes: [SessionsRoute]
});

errorHandler(app.app);

if (process.env.NODE_ENV !== 'test') {
  app.listen();
}
