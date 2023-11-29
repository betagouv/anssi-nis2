import { Module } from "@nestjs/common";
import { Evenements } from "../simulateur-reponse/entites/evenements.entite-journal";
import { TypeOrmModule } from "@nestjs/typeorm";
import { APP_GUARD } from "@nestjs/core";
import { ThrottlerGuard } from "@nestjs/throttler";
import { JournalService } from "./journal.service";
import { JournalController } from "./journal.controller";
import { ConcerneNis2 } from "../simulateur-reponse/entites/concerne-nis2.entite-journal";

@Module({
  imports: [TypeOrmModule.forFeature([Evenements, ConcerneNis2])],
  exports: [TypeOrmModule],
  providers: [
    JournalService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
  controllers: [JournalController],
})
export class JournalModule {}
