import { resultatReguleOSE } from "../../fabriques/Regulation.fabrique";
import { resultatIncertain } from "../../Regulation.constantes";
import { ResultatRegulationEntite } from "../../Regulation.definitions";
import {
  EtatEvaluation,
  EtatEvaluationActives,
} from "./EtatEvaluation.definitions";
import {
  EtatEvaluation,
  EtatEvaluationAvecReponses,
  EtatEvaluationDefinitif,
  EtatEvaluationEnSuspens,
  EtatEvaluationInconnu,
} from "./EtatRegulation.definitions";
import { UnionReponseEtatNonVide } from "./ReponseEtat.definitions";

export const fabriqueResultatEvaluationInconnu = (
  reponse: UnionReponseEtatNonVide,
  etapeEvaluee: EtatEvaluation = "NonEvalue",
): EtatEvaluationInconnu => ({
  ...reponse,
  _resultatEvaluationRegulation: "Inconnu",
  etapeEvaluee,
});
export const fabriqueResultatEvaluationEnSuspens = (
  etapeEvaluee: EtatEvaluationActives,
  resulat: ResultatRegulationEntite,
  reponse: UnionReponseEtatNonVide,
): EtatEvaluationEnSuspens => ({
  ...resulat,
  ...reponse,
  _resultatEvaluationRegulation: "EnSuspens",
  etapeEvaluee,
});
export const fabriqueResultatEvaluationDefinitif = (
  etapeEvaluee: EtatEvaluationActives,
  resulat: ResultatRegulationEntite,
): EtatEvaluationDefinitif => ({
  _resultatEvaluationRegulation: "Definitif",
  etapeEvaluee,
  ...resulat,
});
export const fabriqueResultatEvaluationReguleOse =
  (): EtatEvaluationDefinitif =>
    fabriqueResultatEvaluationDefinitif(
      "DesignationOperateurServicesEssentiels",
      resultatReguleOSE,
    );
export const fabriqueResultatEnSuspensOse =
  (reponse: EtatEvaluation) => (): EtatEvaluationEnSuspens =>
    fabriqueResultatEvaluationEnSuspens(
      "DesignationOperateurServicesEssentiels",
      resultatIncertain,
      reponse as EtatEvaluationAvecReponses,
    );
