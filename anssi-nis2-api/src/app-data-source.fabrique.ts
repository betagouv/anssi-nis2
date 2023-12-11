import { DataSourceOptions } from "typeorm";

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
    entities: [__dirname + "/../**/*.entite-journal{.ts,.js}"],
    subscribers: [],
    migrations: [],
    schema: "journal_nis2",
  };
};
