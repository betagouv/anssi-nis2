import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { SimulateurController } from './simulateurController';
import { SimulateurService } from './simulateur.service';
import { SimulateurDepotToken } from './Domaine/simulateur';
import { InMemorySimulateurDepot } from './simulateur.depot';

const databaseConnectionUrl =
  process.env.SCALINGO_POSTGRESQL_URL ||
  'postgres://postgres:secret@localhost:5432/anssi-nis2';

const serverOptions: TypeOrmModuleOptions = {
  url: databaseConnectionUrl,
  type: 'postgres',
  synchronize: true,
  entities: [],
};

@Module({
  imports: [TypeOrmModule.forRoot(serverOptions)],
  controllers: [SimulateurController],
  providers: [
    SimulateurService,
    { provide: SimulateurDepotToken, useClass: InMemorySimulateurDepot },
  ],
})
export class AppModule {}
