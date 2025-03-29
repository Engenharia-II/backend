import App from '@/infrastructure/webserver/server';
import ExampleRoute from '@/application/routes/example.route';

export const app = new App({
  plugins: [],
  routes: [ExampleRoute]
});

app.listen();
