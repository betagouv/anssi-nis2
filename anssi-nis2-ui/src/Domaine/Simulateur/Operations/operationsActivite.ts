import { activitesParSecteurEtSousSecteur } from "../ActivitesParSecteurEtSousSecteur.ts";
import { SecteurActivite } from "../SecteursActivite";
import { SecteursSansSousSecteur } from "../SousSecteurs";
import { Activite } from "../Activite.ts";
import { ValeursSecteursAvecSousSecteurs } from "../ValeursSousSecteursActivites.ts";
import { ValeurCleSectorielle } from "../ValeursChampsSimulateur";

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
