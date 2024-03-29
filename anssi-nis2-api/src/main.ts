import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as process from "process";
import { ValidationPipe } from "@nestjs/common";
import { NestExpressApplication } from "@nestjs/platform-express";
import { IpFilter } from "express-ipfilter";

const listeningPort = process.env.PORT || 3000;

const activeFiltrageIp = (app: NestExpressApplication) => {
  const ipAutorisees = process.env.ADRESSES_IP_AUTORISEES?.split(",") ?? [];
  const activerFiltrageIp = ipAutorisees.length > 0;

  if (!activerFiltrageIp) return;

  app.use(
    IpFilter(ipAutorisees, {
      // IpFilter n'utilise pas `trust proxy` par défaut, donc :
      // X-Real-Ip fournit l'adresse du noeud qui précéde le reverse proxy Scalingo
      detectIp: (requete) => requete.headers["x-real-ip"] as string,
      mode: "allow",
      log: false,
    }),
  );
};

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: ["error", "warn", "verbose", "debug", "log", "fatal"],
  });
  app.set("trust proxy", 1);
  activeFiltrageIp(app);
  app.enableCors();
  app.setGlobalPrefix("api");
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(listeningPort);
}

bootstrap().then((r) => r);
