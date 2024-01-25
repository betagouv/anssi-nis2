import { Activite } from "../../Activite.definitions";
import {
  DonneesFormulaireSimulateur,
  DonneesSectorielles,
} from "../../DonneesFormulaire.definitions";
import {
  ValeursActivitesConcernesInfrastructureNumerique,
  ValeursActivitesConcernesInfrastructureNumeriqueFranceUniquement,
} from "../../Eligibilite.constantes";
import { ValeurCleSectorielle } from "../../ValeurCleSectorielle.definitions";
import { estSecteurParmi } from "../SecteurActivite/SecteurActivite.predicats";
import { activitesParSecteurEtSousSecteur } from "./Activite.operations";

const prefixeAutreActivite = "autreActivite";

export const activiteEstDansSecteur =
  (secteurActivite: ValeurCleSectorielle) => (activite: Activite) =>
    activitesParSecteurEtSousSecteur[secteurActivite].includes(activite);

export const estActiviteAutre = (activite: Activite) =>
  activite.startsWith(prefixeAutreActivite);
export const estActiviteListee = (activite: Activite) =>
  !activite.startsWith(prefixeAutreActivite);
export const auMoinsUneActiviteListee = (activites: Activite[]) =>
  activites && activites.length > 0 && activites.some(estActiviteListee);

export const auMoinsUneActiviteCommuneAvec =
  (listeActivites1: Activite[]) => (listeActivites2: Activite[]) =>
    listeActivites1.some((activite) => listeActivites2.includes(activite));
export const aucuneActiviteCommuneAvec =
  (listeActivites1: Activite[]) => (listeActivites2: Activite[]) =>
    listeActivites1.every((activite) => !listeActivites2.includes(activite));
export const auMoinsUneActiviteAutre = (activites: Activite[]) =>
  activites && activites.length && activites.some(estActiviteAutre);
export const aucuneActiviteListee = (activites: Activite[]) =>
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
  (liste: Activite[]) =>
  <
    T extends DonneesSectorielles &
      Pick<DonneesFormulaireSimulateur, "activites">,
  >(
    d: T,
  ) =>
    d.activites.some((a) => liste.includes(a));
export const exerceUniquementActivitesDansListe =
  (liste: Activite[]) =>
  <
    T extends DonneesSectorielles &
      Pick<DonneesFormulaireSimulateur, "activites">,
  >(
    d: T,
  ) =>
    d.activites.every((a) => liste.includes(a));
export const exerceAucuneActivitesDansListe =
  (liste: Activite[]) =>
  <
    T extends DonneesSectorielles &
      Pick<DonneesFormulaireSimulateur, "activites">,
  >(
    d: T,
  ) =>
    d.activites.every((a) => !liste.includes(a));
export const contientSecteurNecessitantLocalisation = (
  d: DonneesSectorielles,
) =>
  d.secteurActivite.every(
    (s) =>
      !estSecteurParmi(s)([
        "gestionServicesTic",
        "fournisseursNumeriques",
        "infrastructureNumerique",
      ]),
  );
