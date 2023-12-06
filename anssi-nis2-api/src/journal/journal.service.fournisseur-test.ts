import { CreeEvenementsJournalDto } from "./dto/creeEvenementJournal";
import { Evenements } from "./entites/evenements.entite-journal";
import { CreeConcerneNis2Dto } from "./dto/creeConcerneNis2Dto";
import { SegmentsConcernesNis2 } from "./entites/segments-concernes-nis2.entite-journal";
import { JournalService } from "./journal.service";
import { fabriqueMockRepository } from "../test/utilitaires/facilitateurs";
import { DataSource, Repository } from "typeorm";

const depotSauvegardeEvenement = jest.fn(
  async (
    evenementsJournalDto: CreeEvenementsJournalDto,
  ): Promise<Evenements> => ({
    ...evenementsJournalDto,
    id: 1,
    date: new Date(Date.now()),
  }),
);
const depotSauvegardeSegments = jest.fn(
  async (
    creeConcerneNis2Dto: CreeConcerneNis2Dto,
  ): Promise<SegmentsConcernesNis2> => ({
    ...creeConcerneNis2Dto,
    id: 1,
    evenementId: creeConcerneNis2Dto.evenement?.id ?? 1,
  }),
);
export const fournisseurTestJournalService = {
  provide: JournalService,
  useFactory: (connexionJournal: DataSource) =>
    new JournalService(
      connexionJournal,
      fabriqueMockRepository<CreeEvenementsJournalDto, Evenements>({
        save: depotSauvegardeEvenement,
      }) as unknown as Repository<Evenements>,
      fabriqueMockRepository<CreeConcerneNis2Dto, SegmentsConcernesNis2>({
        save: depotSauvegardeSegments,
      }) as unknown as Repository<SegmentsConcernesNis2>,
    ),
};
