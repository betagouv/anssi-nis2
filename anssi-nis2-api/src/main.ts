import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as process from "process";
import { ValidationPipe } from "@nestjs/common";
// import { SentryService } from "@ntegral/nestjs-sentry";

const listeningPort = process.env.PORT || 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.setGlobalPrefix("api");
  // app.useLogger(SentryService.SentryServiceInstance());
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(listeningPort);
}

bootstrap().then((r) => r);
