import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as process from "process";
import { LogLevel, ValidationPipe } from "@nestjs/common";
import { NestExpressApplication } from "@nestjs/platform-express";
import { IpFilter } from "express-ipfilter";
import { join } from "path";

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

const POSSIBLE_LOG_LEVELS: readonly LogLevel[] = [
  "error",
  "warn",
  "verbose",
  "debug",
  "log",
  "fatal",
] as const;

const logLevelFromConfig = process.env.NESTJS_LOG_LEVEL
  ? process.env.NESTJS_LOG_LEVEL
  : "log;error;fatal";

const isLogLevel = (s: string): s is LogLevel =>
  POSSIBLE_LOG_LEVELS.includes(s as LogLevel);

const logLevel: LogLevel[] = logLevelFromConfig
  .trim()
  .split(";")
  .filter(isLogLevel);

const sersFichiersStatiques = (app: NestExpressApplication) => {
  app.useStaticAssets(join(__dirname, "../../../statique"), {
    prefix: "/statique",
  });
};

export async function creeServeur() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: logLevel,
  });
  app.set("trust proxy", 1);
  activeFiltrageIp(app);
  app.enableCors();
  app.setGlobalPrefix("api");
  app.useGlobalPipes(new ValidationPipe());

  sersFichiersStatiques(app);

  return {
    ecoute: async () => await app.listen(listeningPort),
    arrete: async () => await app.close(),
  };
}
