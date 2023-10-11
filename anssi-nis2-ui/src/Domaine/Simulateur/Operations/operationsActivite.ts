import { ValeurCleSectorielle } from "../ValeursChampsSimulateur.ts";
import { activitesParSecteurEtSousSecteur } from "../ActivitesParSecteurEtSousSecteur.ts";
import { SecteurActivite } from "../SecteursActivite";
import {
  SecteursSansSousSecteur,
  ValeursSecteursAvecSousSecteurs,
} from "../SousSecteurs.ts";
import { Activite } from "../Activite.ts";

const estUnSecteurSansSousSecteur = (secteur: string) =>
  !(ValeursSecteursAvecSousSecteurs as readonly string[]).includes(secteur);
export const filtreSecteursSansSousSecteurs: (
  secteursActivite: SecteurActivite[],
) => SecteursSansSousSecteur[] = (secteursActivite) =>
  secteursActivite.filter(
    estUnSecteurSansSousSecteur,
  ) as SecteursSansSousSecteur[];
export const activiteEstDansSecteur = (
  activite: Activite,
  secteurActivite: ValeurCleSectorielle,
) => {
  return activitesParSecteurEtSousSecteur[secteurActivite].includes(activite);
};
