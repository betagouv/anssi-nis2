import { InjectDataSource, InjectRepository } from "@nestjs/typeorm";
import { DonneesFormulaireSimulateur } from "~core/src/Domain/Simulateur/services/DonneesFormulaire/DonneesFormulaire.definitions";
import { extraitSectorisationDonneesSimulateur } from "~core/src/Domain/Simulateur/services/Sectorisation/Sectorisation.operations";
import { Evenements } from "./entites/evenements.entite-journal";
import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { SegmentsConcernesNis2 } from "./entites/segments-concernes-nis2.entite-journal";
import { emptySegmentsConcernesNis2 } from "./entites/emptySegmentsConcernesNis2";
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

  async trace(
    reponses: DonneesFormulaireSimulateur,
  ): Promise<SegmentsConcernesNis2[]> {
    const donnees = this.assaini(reponses);
    const evenement: Evenements = await this.evenementsRepository.save({
      donnees: JSON.stringify(reponses),
      type: "resultatTestConcerneNis2",
    });
    const segments: CreeConcerneNis2Dto[] = [];
    const valeursSectorielles = extraitSectorisationDonneesSimulateur(donnees);
    for (const sectorisation of valeursSectorielles) {
      const { type, secteur } = sectorisation;
      const sousSecteur =
        type === "avecSousSecteur" ? sectorisation.sousSecteur : undefined;
      const segmentsCourants = {
        ...emptySegmentsConcernesNis2,
        evenement: evenement,
        typeStructure: donnees.typeStructure[0],
        trancheChiffreAffaire: donnees.trancheChiffreAffaire[0],
        trancheNombreEmployes: donnees.trancheNombreEmployes[0],
        secteur: secteur,
        sousSecteur: sousSecteur,
      };
      segments.push(segmentsCourants);
      // const enregistrmentCourant = await this.concerneNis2Repository.save(
      //   segmentsCourants,
      // );
      // resultat.push(enregistrmentCourant);
    }
    return this.concerneNis2Repository.save(segments);
  }

  private assaini(reponses: DonneesFormulaireSimulateur) {
    return reponses.secteurActivite === undefined
      ? JSON.parse(reponses as unknown as string)
      : reponses;
  }
}
