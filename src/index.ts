import App from '@/infrastructure/webserver/server';
import ExampleRoute from '@/application/routes/example.route';
import { errorHandler } from './infrastructure/webserver/error-handler';

export const app = new App({
  plugins: [],
  routes: [ExampleRoute]
});

errorHandler(app.app);

app.listen();
