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
    entities: [],
    subscribers: [],
    migrations: [],
    logging: ["query"],
    schema: "journal_nis2",
  };
};
