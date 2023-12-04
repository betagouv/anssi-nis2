import { InjectDataSource, InjectRepository } from "@nestjs/typeorm";
import { Evenements } from "./entites/evenements.entite-journal";
import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { IDonneesBrutesFormulaireSimulateur } from "anssi-nis2-ui/src/Domaine/Simulateur/DonneesFormulaire";
import { extraitSectorisationDonneesSimulateur } from "anssi-nis2-ui/src/Domaine/Simulateur/services/Sectorisation/Sectorisation.operations";
import { SegmentsConcernesNis2 } from "./entites/segments-concernes-nis2.entite-journal";

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
    reponses: IDonneesBrutesFormulaireSimulateur,
  ): Promise<SegmentsConcernesNis2[]> {
    const evenement: Evenements = await this.evenementsRepository.save({
      donnees: JSON.stringify(reponses),
      type: "resultatTestConcerneNis2",
    });
    const emptySegmentsConcernesNis2: SegmentsConcernesNis2 = {
      evenementId: 0,
      secteur: "autreSecteurActivite",
      sousSecteur: undefined,
      trancheChiffreAffaire: undefined,
      typeStructure: "privee",
      trancheNombreEmployes: "petit",
      evenement: evenement,
      id: 0,
    };
    // return [evenement];
    const resultat: SegmentsConcernesNis2[] = [];
    const valeursSectorielles = extraitSectorisationDonneesSimulateur(reponses);
    for (const sectorisation of valeursSectorielles) {
      const { type, secteur } = sectorisation;
      const sousSecteur =
        type === "avecSousSecteur" ? sectorisation.sousSecteur : undefined;
      const segmentsCourants: SegmentsConcernesNis2 = {
        ...emptySegmentsConcernesNis2,
        evenement: evenement,
        typeStructure: reponses.typeStructure[0],
        trancheChiffreAffaire: reponses.trancheCA[0],
        trancheNombreEmployes: reponses.trancheNombreEmployes[0],
        secteur: secteur,
        sousSecteur: sousSecteur,
      };
      const enregistrmentCourant =
        await this.concerneNis2Repository.save<SegmentsConcernesNis2>(
          segmentsCourants,
        );
      resultat.push(enregistrmentCourant);
    }
    return resultat;
  }
}
