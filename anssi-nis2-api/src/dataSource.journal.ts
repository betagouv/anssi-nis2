import { DataSource } from "typeorm";
import "dotenv/config";
import * as process from "process";
import { ConcerneNis2 } from "./simulateur-reponse/entites/concerne-nis2.entite-journal";
import { Evenements } from "./simulateur-reponse/entites/evenements.entite-journal";

export const dataSource = new DataSource({
  type: "postgres",
  url: process.env.BASE_DONNEES_JOURNAL,
  entities: [Evenements, ConcerneNis2],
  subscribers: [],
  migrations: [__dirname + "/migrations.journal/*{.ts,.js}"],
});
