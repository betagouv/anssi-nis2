import { DataSource } from "typeorm";
import "dotenv/config";
import * as process from "process";
import { SimulateurReponse } from "./simulateur-reponse/entites/simulateur-reponse.entity";
import { InformationsEmail } from "./informations-emails/entities/informations-email.entity";

export const dataSource = new DataSource({
  type: "postgres",
  url: process.env.SCALINGO_POSTGRESQL_URL,
  entities: [SimulateurReponse, InformationsEmail],
  subscribers: [],
  migrations: [__dirname + "/migrations/*{.ts,.js}"],
});
