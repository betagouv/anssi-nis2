import {
  datasourceKey,
  provideInformationsEmailRepositoryKey,
} from "../constantes";
import { DataSource } from "typeorm";
import { InformationsEmail } from "./entities/informations-email.entity";

export const informationsEmailsProviders = [
  {
    provide: provideInformationsEmailRepositoryKey,
    useFactory: (datasource: DataSource) =>
      datasource.getRepository(InformationsEmail),
    inject: [datasourceKey],
  },
];
