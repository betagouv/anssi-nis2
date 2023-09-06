import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as process from 'process';

const listeningPort = 3000 || process.env.PORT;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  //app.setGlobalPrefix('api');
  await app.listen(listeningPort);
}

bootstrap().then(() => '');
