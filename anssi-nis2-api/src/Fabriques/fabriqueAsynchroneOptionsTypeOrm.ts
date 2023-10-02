import { TypeOrmModuleAsyncOptions } from "@nestjs/typeorm";
import { fabriqueAppDataSource } from "../app-data-source.fabrique";
import { recupereUrlBaseDeDonnees } from "../environnement";

export const fabriqueAsynchroneOptionsTypeOrm: () => TypeOrmModuleAsyncOptions =
  () => ({
    useFactory: async () =>
      fabriqueAppDataSource(await recupereUrlBaseDeDonnees()),
  });
