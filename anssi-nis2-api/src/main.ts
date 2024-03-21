import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as process from "process";
import { ValidationPipe } from "@nestjs/common";
import { NestExpressApplication } from "@nestjs/platform-express";

const listeningPort = process.env.PORT || 3000;

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.set('trust proxy', 1);
  app.enableCors();
  app.setGlobalPrefix("api");
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(listeningPort);
}

bootstrap().then((r) => r);
