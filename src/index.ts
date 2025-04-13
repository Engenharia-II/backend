import App from '@/infrastructure/webserver/server';
import SessionsRoute from '@/application/routes/sessions.route';
import { errorHandler } from './infrastructure/webserver/error-handler';
import AuthPlugin from './infrastructure/plugins/auth.plugin';

export const app = new App({
  plugins: [AuthPlugin],
  routes: [SessionsRoute]
});

errorHandler(app.app);

if (process.env.NODE_ENV !== 'test') {
  app.listen();
}
