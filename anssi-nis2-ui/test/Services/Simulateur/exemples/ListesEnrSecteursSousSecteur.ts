import {
  EnrSecteurSousSecteur,
  SecteursAvecSousSecteurs,
  SousSecteurActivite,
} from "../../../../src/Domaine/Simulateur/SousSecteurs";
import { ValeursSecteursAvecSousSecteurs } from "../../../../src/Domaine/Simulateur/ValeursSousSecteursActivites";
import { SecteurActivite } from "../../../../src/Domaine/Simulateur/SecteursActivite";
import { ValeursSecteursSansSousSecteur } from "../../../../src/Domaine/Simulateur/ValeursSecteursActivites";
import {
  fabriqueListePartielleSecteursAvecSousSecteurs,
  fabriqueTupleSecteurSousSecteurs,
} from "../../../../src/Domaine/Simulateur/services/SecteurActivite/SecteurActivite.operations";

export const listeEnrSecteursSansSousSecteur: EnrSecteurSousSecteur[] =
  ValeursSecteursSansSousSecteur.map((secteur) => ({
    secteur: secteur,
  }));
export const listeEnrSecteursEtSousSecteurs: EnrSecteurSousSecteur[] =
  ValeursSecteursAvecSousSecteurs.map(fabriqueTupleSecteurSousSecteurs).reduce(
    (
      listeTuples: {
        secteur: SecteurActivite;
        sousSecteur: SousSecteurActivite;
      }[],
      [secteur, listeSousSecteurs],
    ) => [
      ...listeTuples,
      ...fabriqueListePartielleSecteursAvecSousSecteurs(
        listeSousSecteurs,
        secteur as SecteursAvecSousSecteurs,
      ),
    ],
    [],
  );

export const listeEnrSecteursAvecLeursSousSecteurs: EnrSecteurSousSecteur[] = [
  ...listeEnrSecteursSansSousSecteur,
  ...listeEnrSecteursEtSousSecteurs,
];
