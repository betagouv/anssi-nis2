import { ValeursActivites } from "../../Activite";
import { ValeurCleSectorielle } from "../../ChampsSimulateur";
import { activitesParSecteurEtSousSecteur } from "./Activite.operations.ts";

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
export const aucuneActiviteListee = (activites: ValeursActivites[]) =>
  activites.every(estActiviteAutre);
