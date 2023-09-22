import { datasourceKey } from '../constantes';
import { DataSource } from 'typeorm';
import { fabriqueAppDataSource } from '../app-data-source.fabrique';

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
