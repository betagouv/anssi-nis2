import { TypeOrmModuleAsyncOptions } from "@nestjs/typeorm";
import {
  fabriqueAppDataSource,
  fabriqueAppDataSourceJournal,
} from "../app-data-source.fabrique";
import { ConfigService } from "@nestjs/config";

export const fabriqueAsynchroneOptionsTypeOrm: () => TypeOrmModuleAsyncOptions =
  () => ({
    inject: [ConfigService],
    useFactory: async (
      configService: ConfigService<{ SCALINGO_POSTGRESQL_URL: string }>,
    ) => fabriqueAppDataSource(configService.get("SCALINGO_POSTGRESQL_URL")),
  });
export const fabriqueAsynchroneOptionsTypeOrmJournal: () => TypeOrmModuleAsyncOptions =
  () => ({
    name: "connexionJournal",
    inject: [ConfigService],
    useFactory: async (
      configService: ConfigService<{ BASE_DONNEES_JOURNAL: string }>,
    ) =>
      fabriqueAppDataSourceJournal(configService.get("BASE_DONNEES_JOURNAL")),
  });
