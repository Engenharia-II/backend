import App from '@/infrastructure/webserver/server';
import SessionsRoute from '@/application/routes/sessions.route';
import { errorHandler } from './infrastructure/webserver/error-handler';
import AuthPlugin from './infrastructure/plugins/auth.plugin';
import UsersRoute from '@/application/routes/users.routes';
import SubjectsRoute from './application/routes/subjects.routes';
import TopicsRoute from './application/routes/topics.routes';

export const app = new App({
  plugins: [AuthPlugin],
  routes: [SessionsRoute, UsersRoute, SubjectsRoute, TopicsRoute]
});

errorHandler(app.app);

if (process.env.NODE_ENV !== 'test') {
  app.listen();
}
