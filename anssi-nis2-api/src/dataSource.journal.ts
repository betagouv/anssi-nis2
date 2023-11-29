import { DataSource } from "typeorm";
import "dotenv/config";
import * as process from "process";
import { ConcerneNis2 } from "./simulateur-reponse/entites/concerne-nis2.entite-journal";

export const dataSource = new DataSource({
  type: "postgres",
  url: process.env.BASE_DONNEES_JOURNAL,
  entities: [ConcerneNis2],
  subscribers: [],
  migrations: [__dirname + "/migrations.journal/*{.ts,.js}"],
});
