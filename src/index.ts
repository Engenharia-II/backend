import App from '@/infrastructure/webserver/server';
import SessionsRoute from '@/application/routes/sessions.route';
import { errorHandler } from './infrastructure/webserver/error-handler';
import AuthPlugin from './infrastructure/plugins/auth.plugin';
import UsersRoute from '@/application/routes/users.routes';
import SubjectsRoute from './application/routes/subjects.routes';
import TopicsRoute from './application/routes/topics.routes';
import ContentsRoute from './application/routes/contents.routes';
import TopicStudyRoute from './application/routes/topic-study.routes';
import SubjectStudyRoute from './application/routes/subject-study.routes';
import SubjectAccessRoute from './application/routes/subject-access.routes';
import TopicAccessRoute from './application/routes/topic-access.routes';

export const app = new App({
  plugins: [AuthPlugin],
  routes: [
    SessionsRoute,
    UsersRoute,
    SubjectsRoute,
    TopicsRoute,
    ContentsRoute,
    TopicStudyRoute,
    SubjectStudyRoute,
    SubjectAccessRoute,
    TopicAccessRoute
  ]
});

errorHandler(app.app);

if (process.env.NODE_ENV !== 'test') {
  app.listen();
}
