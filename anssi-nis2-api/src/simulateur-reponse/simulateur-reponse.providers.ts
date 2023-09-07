import { DataSource } from 'typeorm';
import { SimulateurReponse } from './simulateur-reponse.entity';
import {
  datasourceKey,
  provideSimulateurRepouseRepositoryKey,
} from '../constantes';

export const simulateurReponseProviders = [
  {
    provide: provideSimulateurRepouseRepositoryKey,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(SimulateurReponse),
    inject: [datasourceKey],
  },
];
