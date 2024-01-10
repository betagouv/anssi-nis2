import { Activites } from "../../Activite.definitions";
import {
  DonneesSectorielles,
  DonneesFormulaireSimulateur,
} from "../../DonneesFormulaire.definitions";
import {
  ValeursActivitesConcernesInfrastructureNumerique,
  ValeursActivitesConcernesInfrastructureNumeriqueFranceUniquement,
} from "../../Eligibilite.constantes";
import { ValeurCleSectorielle } from "../../ValeurCleSectorielle.definitions";
import { activitesParSecteurEtSousSecteur } from "./Activite.operations";

const prefixeAutreActivite = "autreActivite";

export const activiteEstDansSecteur =
  (secteurActivite: ValeurCleSectorielle) => (activite: Activites) =>
    activitesParSecteurEtSousSecteur[secteurActivite].includes(activite);

export const estActiviteAutre = (activite: Activites) =>
  activite.startsWith(prefixeAutreActivite);
export const estActiviteListee = (activite: Activites) =>
  !activite.startsWith(prefixeAutreActivite);
export const auMoinsUneActiviteListee = (activites: Activites[]) =>
  activites && activites.length > 0 && activites.some(estActiviteListee);

export const auMoinsUneActiviteCommuneAvec =
  (listeActivites1: Activites[]) => (listeActivites2: Activites[]) =>
    listeActivites1.some((activite) => listeActivites2.includes(activite));
export const aucuneActiviteCommuneAvec =
  (listeActivites1: Activites[]) => (listeActivites2: Activites[]) =>
    listeActivites1.every((activite) => !listeActivites2.includes(activite));
export const auMoinsUneActiviteAutre = (activites: Activites[]) =>
  activites && activites.length && activites.some(estActiviteAutre);
export const aucuneActiviteListee = (activites: Activites[]) =>
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
export const exerceActiviteDansListe =
  (liste: Activites[]) =>
  <
    T extends DonneesSectorielles &
      Pick<DonneesFormulaireSimulateur, "activites">,
  >(
    d: T,
  ) =>
    d.activites.some((a) => liste.includes(a));
export const exerceUniquementActivitesDansListe =
  (liste: Activites[]) =>
  <
    T extends DonneesSectorielles &
      Pick<DonneesFormulaireSimulateur, "activites">,
  >(
    d: T,
  ) =>
    d.activites.every((a) => liste.includes(a));
export const exerceAucuneActivitesDansListe =
  (liste: Activites[]) =>
  <
    T extends DonneesSectorielles &
      Pick<DonneesFormulaireSimulateur, "activites">,
  >(
    d: T,
  ) =>
    d.activites.every((a) => !liste.includes(a));
