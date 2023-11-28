import { DataSource } from "typeorm";
import { SimulateurReponse } from "./entites/simulateur-reponse.entity";
import {
  datasourceKey,
  provideSimulateurReponseRepositoryKey,
} from "../constantes";

export const simulateurReponseProviders = [
  {
    provide: provideSimulateurReponseRepositoryKey,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(SimulateurReponse),
    inject: [datasourceKey],
  },
];
