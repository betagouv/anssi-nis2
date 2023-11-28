import { Module } from "@nestjs/common";
import { SimulateurReponseController } from "./simulateur-reponse.controller";
import { SimulateurReponseService } from "./simulateur-reponse.service";
import { APP_GUARD } from "@nestjs/core";
import { ThrottlerGuard } from "@nestjs/throttler";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SimulateurReponse } from "./entites/simulateur-reponse.entity";

@Module({
  imports: [TypeOrmModule.forFeature([SimulateurReponse])],
  exports: [TypeOrmModule],
  providers: [
    SimulateurReponseService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
  controllers: [SimulateurReponseController],
})
export class SimulateurReponseModule {}
