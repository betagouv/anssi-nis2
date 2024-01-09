import { DonneesFormulaireSimulateur } from "../../DonneesFormulaire";
import { ResultatEligibilite } from "../../Eligibilite.definitions";
import { fabriqueRegule } from "../../fabriques/Regulation.fabrique";
import {
  causeReguleOSE,
  reguleOSE,
  resultatIncertain,
} from "../../Regulation.constantes";
import { ResultatRegulationEntite } from "../../Regulation.definitions";
import { estOperateurServicesEssentiels } from "../Eligibilite/Eligibilite.operations";
import { CalculeRegulationOperation } from "./Regulation.service.definitions";

export const transformeEligibiliteEnRegulationEntite =
  (e: ResultatEligibilite) => (d: DonneesFormulaireSimulateur) =>
    e === "Incertain" ? resultatIncertain : fabriqueRegule(causeReguleOSE)(d);

const shift =
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
  if (shift(estOperateurServicesEssentiels)(resultatIncertain, d)) {
    return reguleOSE;
  }
  return resultatIncertain;
};
