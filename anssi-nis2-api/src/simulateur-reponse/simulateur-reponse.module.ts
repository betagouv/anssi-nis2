import { Module } from "@nestjs/common";
import { SimulateurReponseController } from "./simulateur-reponse.controller";
import { simulateurReponseProviders } from "./simulateur-reponse.providers";
import { DatabaseModule } from "../database/database.module";
import { SimulateurReponseService } from "./simulateur-reponse.service";
import { APP_GUARD } from "@nestjs/core";
import { ThrottlerGuard } from "@nestjs/throttler";

@Module({
  imports: [DatabaseModule],
  providers: [
    ...simulateurReponseProviders,
    SimulateurReponseService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
  controllers: [SimulateurReponseController],
})
export class SimulateurReponseModule {}
