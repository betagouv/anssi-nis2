import { DataSourceOptions } from "typeorm";
import { Evenements } from "./simulateur-reponse/entites/evenements.entite-journal";
import { ConcerneNis2 } from "./simulateur-reponse/entites/concerne-nis2.entite-journal";

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
    url: databaseConnectionUrl,
    entities: [Evenements, ConcerneNis2],
    subscribers: [],
    migrations: [],
  };
};
