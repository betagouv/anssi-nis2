import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SimulateurController } from './simulateurController';
import { SimulateurService } from './simulateur.service';
import { SimulateurDepotToken } from './Domaine/simulateur';
import { InMemorySimulateurDepot } from './simulateur.depot';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      port: 5432,
      username: 'postgres',
      password: 'secret',
      database: 'anssi-nis2',
      host: 'localhost',
      synchronize: true,
      entities: [],
    }),
  ],
  controllers: [SimulateurController],
  providers: [
    SimulateurService,
    { provide: SimulateurDepotToken, useClass: InMemorySimulateurDepot },
  ],
})
export class AppModule {}
