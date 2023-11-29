import { InjectDataSource, InjectRepository } from "@nestjs/typeorm";
import { Evenements } from "./entites/evenements.entite-journal";
import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { SimulateurFormData } from "../Domaine/donneesSimulateur";
import { SegmentsConcernesNis2 } from "./entites/segments-concernes-nis2.entite-journal";
import { CreeEvenementsJournalDto } from "./dto/creeEvenementsJournalDto";
import { CreeConcerneNis2Dto } from "./dto/creeConcerneNis2Dto";

@Injectable()
export class JournalService {
  constructor(
    @InjectDataSource("connexionJournal")
    private dataSource: DataSource,
    @InjectRepository(Evenements)
    private evenementsRepository: Repository<Evenements>,
    @InjectRepository(SegmentsConcernesNis2)
    private concerneNis2Repository: Repository<SegmentsConcernesNis2>,
  ) {}

  async trace(reponses: SimulateurFormData): Promise<SegmentsConcernesNis2[]> {
    const evt: CreeEvenementsJournalDto = {
      donnees: JSON.stringify(reponses),
      type: "resultatTestConcerneNis2",
    };
    const evenement: Evenements = await this.evenementsRepository.save(evt);
    const concerneNis2: CreeConcerneNis2Dto = {
      evenement: evenement,
      typeStructure: reponses.typeStructure[0],
      trancheChiffreAffaire: reponses.trancheCA[0],
      trancheNombreEmployes: reponses.trancheNombreEmployes[0],
      secteur: reponses.secteurActivite[0],
      sousSecteur: undefined,
    };
    const resultat = await this.concerneNis2Repository.save(concerneNis2);
    return [resultat];
  }
}
