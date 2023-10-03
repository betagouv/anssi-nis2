import { TypeOrmModuleAsyncOptions } from "@nestjs/typeorm";
import { fabriqueAppDataSource } from "../app-data-source.fabrique";
import { ConfigService } from "@nestjs/config";

export const fabriqueAsynchroneOptionsTypeOrm: () => TypeOrmModuleAsyncOptions =
  () => ({
    inject: [ConfigService],
    useFactory: async (
      configService: ConfigService<{ SCALINGO_POSTGRESQL_URL: string }>,
    ) => fabriqueAppDataSource(configService.get("SCALINGO_POSTGRESQL_URL")),
  });
