import { datasourceKey } from '../constantes';
import { DataSource } from 'typeorm';
import { AppDataSource } from '../data-source';

export const databaseProviders = [
  {
    provide: datasourceKey,
    useFactory: async () => {
      const dataSource = new DataSource({
        ...AppDataSource,
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: true,
      });
      return dataSource.initialize();
    },
  },
];
