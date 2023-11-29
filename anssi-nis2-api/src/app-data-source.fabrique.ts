import { DataSourceOptions } from "typeorm";
import { Evenements } from "./journal/entites/evenements.entite-journal";
import { SegmentsConcernesNis2 } from "./journal/entites/segments-concernes-nis2.entite-journal";

export const fabriqueAppDataSource = async (
  databaseConnectionUrl: string,
): Promise<DataSourceOptions> => ({
  type: "postgres",
  url: databaseConnectionUrl,
  entities: [__dirname + "/../**/*.entity{.ts,.js}"],
  subscribers: [],
  migrations: [],
});
export const fabriqueAppDataSourceJournal = async (
  databaseConnectionUrl: string,
): Promise<DataSourceOptions> => {
  return {
    type: "postgres",
    name: "connexionJournal",
    url: databaseConnectionUrl,
    entities: [Evenements, SegmentsConcernesNis2],
    subscribers: [],
    migrations: [],
    logging: ["query"],
    schema: "journal_nis2",
  };
};
