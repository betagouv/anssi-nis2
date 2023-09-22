import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import * as path from 'path';
import { ServeurStaticConfigurableModule } from './serveur-static-configurable.module';
import { DataSource } from 'typeorm';
import { SimulateurReponseModule } from './simulateur-reponse/simulateur-reponse.module';
import { DatabaseModule } from './database/database.module';
import { fabriqueAppDataSource } from './app-data-source.fabrique';
import { ConfigModule } from '@nestjs/config';
import * as process from 'process';
import { ServeStaticModuleAsyncOptions } from '@nestjs/serve-static/dist/interfaces/serve-static-options.interface';

const getStaticFrontPath: () => Promise<string> = async (
  sousDossier = ['anssi-nis2-ui', 'dist'],
) => {
  const logger = new Logger(getStaticFrontPath.name);
  const currentPathParts = __dirname.split(path.sep);
  const targetPath = [
    ...currentPathParts.slice(0, currentPathParts.indexOf('anssi-nis2-api')),
    ...sousDossier,
  ].join(path.sep);

  logger.log(`Site statique depuis : ${__dirname} --> ${targetPath}`);
  return path.resolve(targetPath);
};

const fabriqueAsynchroneOptionsTypeOrm: TypeOrmModuleAsyncOptions = {
  useFactory: async () =>
    fabriqueAppDataSource(process.env.SCALINGO_POSTGRESQL_URL),
};

const fabriqueAsynchroneOptionsServeurStatique: ServeStaticModuleAsyncOptions =
  {
    useFactory: async () => [
      {
        rootPath: await getStaticFrontPath(),
        useClass: ServeurStaticConfigurableModule,
      },
    ],
  };

@Module({
  imports: [
    TypeOrmModule.forRootAsync(fabriqueAsynchroneOptionsTypeOrm),
    ServeurStaticConfigurableModule.forRootAsync(
      fabriqueAsynchroneOptionsServeurStatique,
    ),
    SimulateurReponseModule,
    DatabaseModule,
    ConfigModule.forRoot(),
  ],
})
export class AppModule {
  private readonly logger = new Logger(AppModule.name);

  constructor(private dataSource: DataSource) {
    this.logger.log(
      `Démarrage du serveur sur base de données ${dataSource.options.type}`,
    );
  }
}
