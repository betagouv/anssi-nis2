import { DonneesFormulaireSimulateur } from "../../DonneesFormulaire.definitions";
import { ResultatEligibilite } from "../../Eligibilite.definitions";
import { fabriqueRegule } from "../../fabriques/Regulation.fabrique";
import {
  causeReguleOSE,
  resultatIncertain,
  resultatNonRegule,
} from "../../Regulation.constantes";
import {
  ResultatRegulationEntite,
  ResultatRegulationNonRegule,
} from "../../Regulation.definitions";
import { estOperateurServicesEssentiels } from "../DonneesFormulaire/DonneesFormulaire.predicats";
import { CalculeRegulationOperation } from "./Regulation.service.definitions";
import { predicatDonneesFormulaire as donneesSimu } from "../DonneesFormulaire/DonneesFormulaire.predicats";
import { isMatching } from "ts-pattern";

const calculateurRegulationParStatutEligibilite: Record<
  ResultatEligibilite,
  (d: DonneesFormulaireSimulateur) => ResultatRegulationEntite
> = {
  EligibleMoyenneGrandeEntreprise: () => fabriqueRegule(causeReguleOSE),
  EligiblePetiteEntreprise: () => fabriqueRegule(causeReguleOSE),
  Incertain: () => resultatIncertain,
  NonEligible: () => resultatNonRegule,
};

export const transformeEligibiliteEnRegulationEntite = (
  e: ResultatEligibilite,
) => calculateurRegulationParStatutEligibilite[e];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const shift: (
  f: (d: DonneesFormulaireSimulateur) => boolean,
) => (
  r: ResultatRegulationEntite,
  d: DonneesFormulaireSimulateur,
) => ResultatRegulationNonRegule | boolean =
  (f: (d: DonneesFormulaireSimulateur) => boolean) =>
  (r: ResultatRegulationEntite, d: DonneesFormulaireSimulateur) =>
    r.decision !== "Incertain" ? r : f(d);
/**
 * Future version en mode railway + automate du calcul d'éligibilité
 * @param f : (d: DonneesFormulaireSimulateur) => boolean
 *    Prédicat sur des données (devrait être une autre structure que DonneesFormulaireSimulateur)
 * @param siVrai : ResultatRegulationEntite
 *    Valeur renvoyée si vrai
 * @returns ResultatRegulationEntite
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const creeResultatOp =
  (
    f: (d: DonneesFormulaireSimulateur) => boolean,
    siVrai: ResultatRegulationEntite,
  ) =>
  (r: ResultatRegulationEntite, d: DonneesFormulaireSimulateur) =>
    r.decision !== "Incertain"
      ? [r, d]
      : [f(d) ? siVrai : resultatIncertain, d];

/**
 * Première application du calcul régulation entité utilisant le shift (début de railway)
 * @param d
 */
export const calculeRegulationEntite: CalculeRegulationOperation = (d) => {
  if (estOperateurServicesEssentiels(d)) {
    return fabriqueRegule(causeReguleOSE);
  }
  if (donneesSimu.uniquement.activiteAutre(d)) {
    return resultatNonRegule;
  }
  if (
    isMatching({
      secteurActivite: ["infrastructureNumerique"],
    })(d)
  )
    return fabriqueRegule({ secteurActivite: ["infrastructureNumerique"] });
  return resultatIncertain;
};
