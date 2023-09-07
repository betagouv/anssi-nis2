import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { SimulateurController } from './simulateurController';
import { SimulateurService } from './simulateur.service';
import { SimulateurDepotToken } from './Domaine/simulateur';
import { InMemorySimulateurDepot } from './simulateur.depot';
import * as path from 'path';
import { MyServeStaticModule } from './my-serve-static.module';
import { DataSource } from 'typeorm';
import { SimulateurReponseModule } from './simulateur-reponse/simulateur-reponse.module';
import { DatabaseModule } from './database/database.module';
import { SimulateurReponse } from './simulateur-reponse/simulateur-reponse.entity';
import { SimulateurReponseController } from './simulateur-reponse/simulateur-reponse.controller';
import { SimulateurReponseService } from './simulateur-reponse/simulateur-reponse.service';
import { provideSimulateurRepouseRepositoryKey } from './constantes';

const databaseConnectionUrl =
  process.env.SCALINGO_POSTGRESQL_URL ||
  'postgres://postgres:secret@localhost:5432/anssi-nis2';

const serverOptions: TypeOrmModuleOptions = {
  url: databaseConnectionUrl,
  type: 'postgres',
  synchronize: true,
  entities: [],
};

const getStaticFrontPath: () => string = () => {
  const currentPathParts = __dirname.split(path.sep);
  const targetPath = [
    ...currentPathParts.slice(0, currentPathParts.length - 2),
    'anssi-nis2-ui',
    'dist',
  ].join(path.sep);
  console.log(`Inside dist ${__dirname} --> ${targetPath}`);
  return path.resolve(targetPath);
};

@Module({
  imports: [
    TypeOrmModule.forRoot(serverOptions),
    MyServeStaticModule.forRoot({
      rootPath: getStaticFrontPath(),
    }),
    SimulateurReponseModule,
    DatabaseModule,
  ],
  controllers: [SimulateurController],
  providers: [
    SimulateurService,
    { provide: SimulateurDepotToken, useClass: InMemorySimulateurDepot },
  ],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
