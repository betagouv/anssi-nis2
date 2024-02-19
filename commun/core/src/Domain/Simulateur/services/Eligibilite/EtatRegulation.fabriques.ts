import { resultatReguleOSE } from "../../fabriques/Regulation.fabrique";
import { resultatIncertain } from "../../Regulation.constantes";
import { ResultatRegulationEntite } from "../../Regulation.definitions";
import {
  ResultatEvaluationRegulation,
  ResultatEvaluationRegulationAvecReponses,
  ResultatEvaluationRegulationDefinitif,
  ResultatEvaluationRegulationEnSuspens,
  ResultatEvaluationRegulationInconnu,
} from "./EtatRegulation.definition";
import {
  DonneesCompletesEvaluees,
  EtapesEvaluation,
  UnionReponseEtatNonVide,
} from "./Reponse.definitions";

export const fabriqueResultatEvaluationInconnu = (
  reponse: UnionReponseEtatNonVide,
  etapeEvaluee: EtapesEvaluation = "NonEvalue",
): ResultatEvaluationRegulationInconnu => ({
  ...reponse,
  _resultatEvaluationRegulation: "Inconnu",
  etapeEvaluee,
});
export const fabriqueResultatEvaluationEnSuspens = (
  etapeEvaluee: DonneesCompletesEvaluees,
  resulat: ResultatRegulationEntite,
  reponse: UnionReponseEtatNonVide,
): ResultatEvaluationRegulationEnSuspens => ({
  ...resulat,
  ...reponse,
  _resultatEvaluationRegulation: "EnSuspens",
  etapeEvaluee,
});
export const fabriqueResultatEvaluationDefinitif = (
  etapeEvaluee: DonneesCompletesEvaluees,
  resulat: ResultatRegulationEntite,
): ResultatEvaluationRegulationDefinitif => ({
  _resultatEvaluationRegulation: "Definitif",
  etapeEvaluee,
  ...resulat,
});
export const fabriqueResultatEvaluationReguleOse =
  (): ResultatEvaluationRegulationDefinitif =>
    fabriqueResultatEvaluationDefinitif(
      "DesignationOperateurServicesEssentiels",
      resultatReguleOSE,
    );
export const fabriqueResultatEnSuspensOse =
  (reponse: ResultatEvaluationRegulation) =>
  (): ResultatEvaluationRegulationEnSuspens =>
    fabriqueResultatEvaluationEnSuspens(
      "DesignationOperateurServicesEssentiels",
      resultatIncertain,
      reponse as ResultatEvaluationRegulationAvecReponses,
    );
