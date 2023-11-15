import {
  datasourceKey,
  provideInformationsEmailRepositoryKey,
} from "../constantes.ts";
import { DataSource } from "typeorm";
import { InformationsEmail } from "./entities/informations-email.entity.ts";

export const informationsEmailsProviders = [
  {
    provide: provideInformationsEmailRepositoryKey,
    useFactory: (datasource: DataSource) =>
      datasource.getRepository(InformationsEmail),
    inject: [datasourceKey],
  },
];
