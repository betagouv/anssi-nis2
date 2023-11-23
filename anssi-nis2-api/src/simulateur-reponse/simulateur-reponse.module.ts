import { Module } from "@nestjs/common";
import { SimulateurReponseController } from "./simulateur-reponse.controller";
import { SimulateurReponseService } from "./simulateur-reponse.service";
import { APP_GUARD } from "@nestjs/core";
import { ThrottlerGuard } from "@nestjs/throttler";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SimulateurReponse } from "./simulateur-reponse.entity";
import { databaseProviders } from "../database/database.providers";

@Module({
  imports: [TypeOrmModule.forFeature([SimulateurReponse])],
  exports: [TypeOrmModule],
  providers: [
    SimulateurReponseService,
    ...databaseProviders,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
  controllers: [SimulateurReponseController],
})
export class SimulateurReponseModule {}
