import { datasourceKey } from '../constantes';
import { DataSource, DataSourceOptions } from 'typeorm';

const databaseConnectionUrl =
  process.env.SCALINGO_POSTGRESQL_URL ||
  'postgres://postgres:secret@172.20.0.2:5432/anssi-nis2';

const serverOptions: DataSourceOptions = {
  url: databaseConnectionUrl,
  type: 'postgres',
  synchronize: true,
  entities: [],
};

export const databaseProviders = [
  {
    provide: datasourceKey,
    useFactory: async () => {
      const dataSource = new DataSource({
        ...serverOptions,
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: true,
      });
      return dataSource.initialize();
    },
  },
];
