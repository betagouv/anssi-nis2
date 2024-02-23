import {
  Activite,
  ActivitesInfrastructureNumeriqueEligiblesPetitEntite,
  ActiviteInfrastructureNumeriqueAvecBesoinLocalisation,
} from "../../Activite.definitions";
import {
  ValeursActivitesInfrastructureNumeriqueEligiblesPetitEntite,
  ValeursActivitesInfrastructureNumeriqueAvecBesoinLocalisation,
} from "../../Activite.valeurs";
import {
  DonneesFormulaireSimulateur,
  DonneesSectorielles,
} from "../../DonneesFormulaire.definitions";
import {
  ValeursActivitesConcernesInfrastructureNumerique,
  ValeursActivitesConcernesInfrastructureNumeriqueFranceUniquement,
} from "../../Eligibilite.constantes";
import { SecteurActivite } from "../../SecteurActivite.definitions";
import { ValeurCleSectorielle } from "../../ValeurCleSectorielle.definitions";
import { activitesParSecteurEtSousSecteur } from "./Activite.operations";

const prefixeAutreActivite = "autreActivite";

export const activiteEstDansSecteur =
  (secteurActivite: ValeurCleSectorielle | SecteurActivite) =>
  (activite: Activite) =>
    activitesParSecteurEtSousSecteur[
      secteurActivite as ValeurCleSectorielle
    ].includes(activite);

export const estActiviteAutre = <T extends Activite>(activite: T) =>
  activite.startsWith(prefixeAutreActivite);
export const estActiviteListee = (activite: Activite) =>
  !activite.startsWith(prefixeAutreActivite);
export const auMoinsUneActiviteListee = (activites: Activite[]) =>
  activites && activites.length > 0 && activites.some(estActiviteListee);

export const auMoinsUneActiviteCommuneAvec =
  (activitesCherchees: Activite[]) => (listeTesteeActivites: Activite[]) =>
    activitesCherchees.some((activite) =>
      listeTesteeActivites.includes(activite),
    );
export const aucuneActiviteCommuneAvec =
  (activitesCherchees: Activite[]) => (listeTesteeActivites: Activite[]) =>
    activitesCherchees.every(
      (activite) => !listeTesteeActivites.includes(activite),
    );

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

export const estActiviteInfraNumConcerneeFranceUniquement = (
  activite: Activite,
) =>
  ValeursActivitesConcernesInfrastructureNumeriqueFranceUniquement.includes(
    activite,
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
export const estActiviteInfrastructureNumeriqueEligiblesPetitEntite = (
  a: Activite,
) =>
  ValeursActivitesInfrastructureNumeriqueEligiblesPetitEntite.includes(
    a as ActivitesInfrastructureNumeriqueEligiblesPetitEntite,
  );
export const estActiviteInfrastructureNumeriqueEligiblesGrandeEntite = (
  a: Activite | ActiviteInfrastructureNumeriqueAvecBesoinLocalisation,
): a is ActiviteInfrastructureNumeriqueAvecBesoinLocalisation =>
  ValeursActivitesInfrastructureNumeriqueAvecBesoinLocalisation.includes(
    a as ActiviteInfrastructureNumeriqueAvecBesoinLocalisation,
  );
