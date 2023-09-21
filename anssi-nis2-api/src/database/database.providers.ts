import { datasourceKey } from '../constantes';
import { DataSource } from 'typeorm';
import { fabriqueAppDataSource } from '../data-source';

export const databaseProviders = [
  {
    provide: datasourceKey,
    useFactory: async () => {
      const dataSource = new DataSource(
        await fabriqueAppDataSource(process.env.SCALINGO_POSTGRESQL_URL),
      );
      return dataSource.initialize();
    },
  },
];
