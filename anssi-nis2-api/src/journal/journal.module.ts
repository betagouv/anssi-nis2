import { Module } from "@nestjs/common";
import { Evenements } from "./entites/evenements.entite-journal";
import { TypeOrmModule, getDataSourceToken } from "@nestjs/typeorm";
import { APP_GUARD } from "@nestjs/core";
import { ThrottlerGuard } from "@nestjs/throttler";
import { JournalService } from "./journal.service";
import { JournalController } from "./journal.controller";
import { DataSource } from "typeorm";
import { SegmentsConcernesNis2 } from "./entites/segments-concernes-nis2.entite-journal";

@Module({
  imports: [TypeOrmModule.forFeature([Evenements, SegmentsConcernesNis2])],
  exports: [TypeOrmModule, JournalService],
  providers: [
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
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
  controllers: [JournalController],
})
export class JournalModule {}
