import { ValeursActivites } from "../../Activite.definitions";
import {
  DonneesSectorielles,
  IDonneesBrutesFormulaireSimulateur,
} from "../../DonneesFormulaire";
import {
  ValeursActivitesConcernesInfrastructureNumerique,
  ValeursActivitesConcernesInfrastructureNumeriqueFranceUniquement,
} from "../../Eligibilite.constantes";
import { ValeurCleSectorielle } from "../../ValeurCleSectorielle.definitions";
import { activitesParSecteurEtSousSecteur } from "./Activite.operations";

const prefixeAutreActivite = "autreActivite";

export const activiteEstDansSecteur =
  (secteurActivite: ValeurCleSectorielle) => (activite: ValeursActivites) =>
    activitesParSecteurEtSousSecteur[secteurActivite].includes(activite);

export const estActiviteAutre = (activite: ValeursActivites) =>
  activite.startsWith(prefixeAutreActivite);
export const estActiviteListee = (activite: ValeursActivites) =>
  !activite.startsWith(prefixeAutreActivite);
export const auMoinsUneActiviteListee = (activites: ValeursActivites[]) =>
  activites && activites.length > 0 && activites.some(estActiviteListee);

export const auMoinsUneActiviteCommuneAvec =
  (listeActivites1: ValeursActivites[]) =>
  (listeActivites2: ValeursActivites[]) =>
    listeActivites1.some((activite) => listeActivites2.includes(activite));
export const aucuneActiviteCommuneAvec =
  (listeActivites1: ValeursActivites[]) =>
  (listeActivites2: ValeursActivites[]) =>
    listeActivites1.every((activite) => !listeActivites2.includes(activite));
export const auMoinsUneActiviteAutre = (activites: ValeursActivites[]) =>
  activites && activites.length && activites.some(estActiviteAutre);
export const aucuneActiviteListee = (activites: ValeursActivites[]) =>
  activites.every(estActiviteAutre);
export const auMoinsUneActiviteInfraNumConcerneeEnFranceUniquement =
  auMoinsUneActiviteCommuneAvec(
    ValeursActivitesConcernesInfrastructureNumeriqueFranceUniquement
  );
export const auMoinsUneActiviteInfraNumConcernee =
  auMoinsUneActiviteCommuneAvec(
    ValeursActivitesConcernesInfrastructureNumerique
  );
export const aucuneActiviteInfraNumConcernee = aucuneActiviteCommuneAvec(
  ValeursActivitesConcernesInfrastructureNumerique
);
export const exerceActiviteDansListe =
  (liste: ValeursActivites[]) =>
  <
    T extends DonneesSectorielles &
      Pick<IDonneesBrutesFormulaireSimulateur, "activites">
  >(
    d: T
  ) =>
    d.activites.some((a) => liste.includes(a));
export const exerceUniquementActivitesDansListe =
  (liste: ValeursActivites[]) =>
  <
    T extends DonneesSectorielles &
      Pick<IDonneesBrutesFormulaireSimulateur, "activites">
  >(
    d: T
  ) =>
    d.activites.every((a) => liste.includes(a));
export const exerceAucuneActivitesDansListe =
  (liste: ValeursActivites[]) =>
  <
    T extends DonneesSectorielles &
      Pick<IDonneesBrutesFormulaireSimulateur, "activites">
  >(
    d: T
  ) =>
    d.activites.every((a) => !liste.includes(a));
