import { DataSourceOptions } from 'typeorm';
import { SimulateurReponse } from './simulateur-reponse/simulateur-reponse.entity';

const databaseConnectionUrl =
  process.env.SCALINGO_POSTGRESQL_URL ||
  'postgres://postgres:secret@db/anssi-nis2';
// 'postgres://postgres:secret@127.0.0.1:5432/anssi-nis2';

export const AppDataSource: DataSourceOptions = {
  type: 'postgres',
  url: databaseConnectionUrl,
  synchronize: true,
  entities: [SimulateurReponse],
  subscribers: [],
  migrations: [],
};
