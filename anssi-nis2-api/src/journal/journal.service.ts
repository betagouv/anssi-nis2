import { InjectDataSource, InjectRepository } from "@nestjs/typeorm";
import { Evenements } from "./entites/evenements.entite-journal";
import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { IDonneesBrutesFormulaireSimulateur } from "anssi-nis2-ui/src/Domaine/Simulateur/DonneesFormulaire";
import { SegmentsConcernesNis2 } from "./entites/segments-concernes-nis2.entite-journal";
import { SecteurActivite } from "anssi-nis2-ui/src/Domaine/Simulateur/SecteurActivite.definitions";
import {
  SecteursAvecSousSecteurs,
  SousSecteurActivite,
} from "anssi-nis2-ui/src/Domaine/Simulateur/SousSecteurActivite.definitions";
import { estDansSecteur } from "anssi-nis2-ui/src/Domaine/Simulateur/services/SousSecteurActivite/SousSecteurActivite.predicats";
import { estUnSecteurSansSousSecteur } from "anssi-nis2-ui/src/Domaine/Simulateur/services/SecteurActivite/SecteurActivite.predicats";
import { Sectorisation } from "anssi-nis2-ui/src/Domaine/Simulateur/Sectorisation.definitions";

function extraitSousSecteurs(
  secteur: SecteurActivite,
  sousSecteurs: SousSecteurActivite[],
): Sectorisation[] {
  if (estUnSecteurSansSousSecteur(secteur) || sousSecteurs.length == 0)
    return [{ type: "sansSousSecteur", secteur: secteur }];
  return sousSecteurs
    .filter(estDansSecteur(secteur as SecteursAvecSousSecteurs))
    .reduce(
      (acc, sousSecteur) => [
        ...acc,
        {
          type: "avecSousSecteur",
          secteur: secteur,
          sousSecteur: sousSecteur,
        },
      ],
      [],
    );
}

function extraitCouplesSectoriels(
  reponses: IDonneesBrutesFormulaireSimulateur,
): Sectorisation[] {
  return reponses.secteurActivite.reduce(
    (acc, secteur) => [
      ...acc,
      ...extraitSousSecteurs(secteur, reponses.sousSecteurActivite),
    ],
    [],
  );
}

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
    const valeursSectorielles = extraitCouplesSectoriels(reponses);
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
