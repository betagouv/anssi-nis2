import { ValeursActivites } from "../../Activite.definitions";
import { activitesParSecteurEtSousSecteur } from "./Activite.operations";
import { ValeurCleSectorielle } from "../../ValeurCleSectorielle.definitions";

import {
  ValeursActivitesConcernesInfrastructureNumerique,
  ValeursActivitesConcernesInfrastructureNumeriqueFranceUniquement,
} from "anssi-nis2-domain/src/Simulateur/Eligibilite.constantes";

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

export const auMoinsUneActiviteCommuneAvec =
  (listeActivites1: ValeursActivites[]) =>
  (listeActivites2: ValeursActivites[]) =>
    listeActivites1.some((activite) => listeActivites2.includes(activite));
export const aucuneActiviteCommuneAvec =
  (listeActivites1: ValeursActivites[]) =>
  (listeActivites2: ValeursActivites[]) =>
    listeActivites1.every((activite) => !listeActivites2.includes(activite));
export const aucuneActiviteListee = (activites: ValeursActivites[]) =>
  activites.every(estActiviteAutre);
export const auMoinsUneActiviteInfraNumConcerneeEnFranceUniquement =
  auMoinsUneActiviteCommuneAvec(
    ValeursActivitesConcernesInfrastructureNumeriqueFranceUniquement,
  );
export const auMoinsUneActiviteInfraNumConcernee =
  auMoinsUneActiviteCommuneAvec(
    ValeursActivitesConcernesInfrastructureNumerique,
  );
export const aucuneActiviteInfraNumConcernee = aucuneActiviteCommuneAvec(
  ValeursActivitesConcernesInfrastructureNumerique,
);
