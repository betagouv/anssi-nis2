import { Module } from "@nestjs/common";
import { SimulateurReponseController } from "./simulateur-reponse.controller";
import { SimulateurReponseService } from "./simulateur-reponse.service";
import { APP_GUARD } from "@nestjs/core";
import { ThrottlerGuard } from "@nestjs/throttler";
import { getDataSourceToken, TypeOrmModule } from "@nestjs/typeorm";
import { SimulateurReponse } from "./simulateur-reponse.entity";
import { JournalService } from "../journal/journal.service";
import { Evenements } from "../journal/entites/evenements.entite-journal";
import { SegmentsConcernesNis2 } from "../journal/entites/segments-concernes-nis2.entite-journal";
import { DataSource } from "typeorm";
import { JournalModule } from "../journal/journal.module";

@Module({
  imports: [TypeOrmModule.forFeature([SimulateurReponse]), JournalModule],
  exports: [TypeOrmModule],
  providers: [
    SimulateurReponseService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    {
      provide: JournalService,
      useFactory: (connexionJournal: DataSource) =>
        new JournalService(
          connexionJournal,
          connexionJournal.getRepository(Evenements),
          connexionJournal.getRepository(SegmentsConcernesNis2),
        ),
      inject: [getDataSourceToken("connexionJournal")],
    },
  ],
  controllers: [SimulateurReponseController],
})
export class SimulateurReponseModule {}
