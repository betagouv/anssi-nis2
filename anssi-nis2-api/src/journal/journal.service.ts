import { InjectRepository } from "@nestjs/typeorm";
import { Evenements } from "../simulateur-reponse/entites/evenements.entite-journal";
import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { SimulateurFormData } from "../Domaine/donneesSimulateur";
import { ConcerneNis2 } from "../simulateur-reponse/entites/concerne-nis2.entite-journal";

type CreeEvenementsJournalDto = Pick<Evenements, "donnees" | "type">;
type CreeConcerneNis2Dto = Pick<
  ConcerneNis2,
  | "evenement"
  | "secteur"
  | "sousSecteur"
  | "trancheChiffreAffaire"
  | "trancheNombreEmploye"
  | "typeStructure"
>;

@Injectable()
export class JournalService {
  constructor(
    @InjectRepository(Evenements)
    private evenementsRepository: Repository<Evenements>,
    @InjectRepository(ConcerneNis2)
    private concerneNis2Repository: Repository<ConcerneNis2>,
  ) {}

  async trace(reponses: SimulateurFormData): Promise<ConcerneNis2[]> {
    const evt: CreeEvenementsJournalDto = {
      donnees: JSON.stringify(reponses),
      type: "resultatTestConcerneNis2",
    };
    const evenement: Evenements = await this.evenementsRepository.save(evt);
    const concerneNis2: CreeConcerneNis2Dto = {
      evenement: evenement,
      secteur: undefined,
      sousSecteur: undefined,
      trancheChiffreAffaire: undefined,
      trancheNombreEmploye: undefined,
      typeStructure: undefined,
    };
    return [await this.concerneNis2Repository.save(concerneNis2)];
  }
}
