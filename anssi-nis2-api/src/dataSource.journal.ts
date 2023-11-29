import { DataSource } from "typeorm";
import "dotenv/config";
import * as process from "process";
import { SegmentsConcernesNis2 } from "./journal/entites/segments-concernes-nis2.entite-journal";
import { Evenements } from "./journal/entites/evenements.entite-journal";

export const dataSource = new DataSource({
  type: "postgres",
  url: process.env.BASE_DONNEES_JOURNAL,
  entities: [Evenements, SegmentsConcernesNis2],
  subscribers: [],
  migrations: [__dirname + "/migrations.journal/*{.ts,.js}"],
});
