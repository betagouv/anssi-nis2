import { DataSource } from 'typeorm';
import { SimulateurReponse } from './simulateur-reponse/simulateur-reponse.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  url: 'postgres://postgres:secret@172.20.0.2:5432/anssi-nis2',
  synchronize: true,
  // logging: true,
  entities: [SimulateurReponse],
  subscribers: [],
  migrations: [],
});
