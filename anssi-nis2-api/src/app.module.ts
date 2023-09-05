import { Module } from '@nestjs/common';
import { SimulateurController } from './simulateurController';
import { SimulateurService } from './simulateur.service';
import { SimulateurDepotToken } from './Domaine/simulateur';
import { InMemorySimulateurDepot } from './simulateur.depot';

@Module({
  imports: [],
  controllers: [SimulateurController],
  providers: [
    SimulateurService,
    { provide: SimulateurDepotToken, useClass: InMemorySimulateurDepot },
  ],
})
export class AppModule {}
