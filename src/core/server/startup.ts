import { ApplicationFactory } from './app';

function bootstrap() {
  const app = ApplicationFactory.create();
  app.start();
}

bootstrap();
