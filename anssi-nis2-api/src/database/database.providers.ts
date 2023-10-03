import { datasourceKey } from "../constantes";
import { DataSource } from "typeorm";
import { fabriqueAppDataSource } from "../app-data-source.fabrique";
import { ConfigService } from "@nestjs/config";

export const databaseProviders = [
  {
    provide: datasourceKey,
    inject: [ConfigService],
    useFactory: async (
      configService: ConfigService<{ SCALINGO_POSTGRESQL_URL: string }>,
    ) => {
      const dataSource = new DataSource(
        await fabriqueAppDataSource(
          configService.get("SCALINGO_POSTGRESQL_URL"),
        ),
      );
      return dataSource.initialize();
    },
  },
];
