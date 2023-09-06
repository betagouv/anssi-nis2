import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { SimulateurController } from './simulateurController';
import { SimulateurService } from './simulateur.service';
import { SimulateurDepotToken } from './Domaine/simulateur';
import { InMemorySimulateurDepot } from './simulateur.depot';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path';

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
    ...currentPathParts.slice(0, currentPathParts.length - 1),
    'anssi-nis2-ui',
    'dist',
  ].join(path.sep);
  console.log(`Inside dist ${__dirname} --> ${targetPath}`);
  return path.resolve(targetPath);
};

@Module({
  imports: [
    TypeOrmModule.forRoot(serverOptions),
    ServeStaticModule.forRoot({
      rootPath: getStaticFrontPath(),
    }),
  ],
  controllers: [SimulateurController],
  providers: [
    SimulateurService,
    { provide: SimulateurDepotToken, useClass: InMemorySimulateurDepot },
  ],
})
export class AppModule {}
