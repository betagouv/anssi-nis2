import { ValeursActivites } from "../../Activite.definitions.ts";
import { activitesParSecteurEtSousSecteur } from "./Activite.operations.ts";
import { ValeurCleSectorielle } from "../../ValeurCleSectorielle.definitions.ts";

export const activiteEstDansSecteur = (
  activite: ValeursActivites,
  secteurActivite: ValeurCleSectorielle,
) => {
  return activitesParSecteurEtSousSecteur[secteurActivite].includes(activite);
};

const prefixeAutreActivite = "autreActivite";
export const estActiviteAutre = (activite: ValeursActivites) =>
  activite.startsWith(prefixeAutreActivite);
export const estActiviteListee = (activite: ValeursActivites) =>
  !activite.startsWith(prefixeAutreActivite);
export const auMoinsUneActiviteListee = (activites: ValeursActivites[]) =>
  activites && activites.length && activites.some(estActiviteListee);
export const auMoinsUneActiviteAutre = (activites: ValeursActivites[]) =>
  activites && activites.length && activites.some(estActiviteAutre);
export const aucuneActiviteListee = (activites: ValeursActivites[]) =>
  activites.every(estActiviteAutre);
