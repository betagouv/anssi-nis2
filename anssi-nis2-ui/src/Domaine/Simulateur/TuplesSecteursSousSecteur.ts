import {
  EnrSecteurSousSecteur,
  SecteursAvecSousSecteurs,
  SousSecteurActivite,
} from "./SousSecteurs";
import { ValeursSecteursAvecSousSecteurs } from "./ValeursSousSecteursActivites.ts";
import {
  fabriqueTupleSecteurSousSecteurs,
  listePartielleSecteursAvecSousSecteurs,
  ValeursSecteursSansSousSecteur,
} from "./Operations/operationsSecteurs.ts";
import { SecteurActivite } from "./SecteursActivite";
import { ValeursSecteursActivites } from "./ValeursSecteursActivites.ts";

export const tuplesSecteursSansSousSecteur: EnrSecteurSousSecteur[] =
  ValeursSecteursSansSousSecteur.map((secteur) => ({
    secteur: secteur,
  }));
export const tuplesSecteursEtSousSecteurs: EnrSecteurSousSecteur[] =
  ValeursSecteursAvecSousSecteurs.map(fabriqueTupleSecteurSousSecteurs).reduce(
    (
      listeTuples: {
        secteur: SecteurActivite;
        sousSecteur: SousSecteurActivite;
      }[],
      [secteur, listeSousSecteurs],
    ) => [
      ...listeTuples,
      ...listePartielleSecteursAvecSousSecteurs(
        listeSousSecteurs,
        secteur as SecteursAvecSousSecteurs,
      ),
    ],
    [],
  );
export const listeSecteursActiviteSaufAutre: readonly SecteurActivite[] =
  ValeursSecteursActivites.filter(
    (secteur) => secteur !== "autreSecteurActivite",
  );
