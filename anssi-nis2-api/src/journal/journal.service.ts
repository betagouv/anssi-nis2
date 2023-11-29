import { InjectDataSource, InjectRepository } from "@nestjs/typeorm";
import { Evenements } from "./entites/evenements.entite-journal";
import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { SegmentsConcernesNis2 } from "./entites/segments-concernes-nis2.entite-journal";
import { IDonneesBrutesFormulaireSimulateur } from "anssi-nis2-domain/src/Simulateur/DonneesFormulaire";
import { extraitCouplesSectoriels } from "anssi-nis2-domain/src/Simulateur/services/ValeursSectorielles/ValeursSectorielles.operations";

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
    const resultat: SegmentsConcernesNis2[] = [];
    const valeursSectorielles = extraitCouplesSectoriels(reponses);
    for (const [secteur, sousSecteur] of valeursSectorielles) {
      resultat.push(
        await this.concerneNis2Repository.save({
          evenement: evenement,
          typeStructure: reponses.typeStructure[0],
          trancheChiffreAffaire: reponses.trancheCA[0],
          trancheNombreEmployes: reponses.trancheNombreEmployes[0],
          secteur: secteur,
          sousSecteur: sousSecteur,
        }),
      );
    }
    return resultat;
  }
}
