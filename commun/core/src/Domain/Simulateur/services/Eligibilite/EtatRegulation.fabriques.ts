import { resultatReguleOSE } from "../../fabriques/ResultatRegulation.fabrique";
import { resultatIncertain } from "../../Regulation.constantes";
import { ResultatRegulationEntite } from "../../Regulation.definitions";
import {
  EtatRegulation,
  EtatRegulationAvecReponses,
  EtatRegulationDefinitif,
  EtatEvaluationEnSuspens,
  EtatRegulationInconnu,
  EtapeEvaluation,
  EtapeEvaluationActive,
} from "./EtatRegulation.definitions";
import { UnionReponseEtatNonVide } from "./ReponseEtat.definitions";

export const fabriqueResultatEvaluationInconnu = (
  reponse: UnionReponseEtatNonVide,
  etapeEvaluee: EtapeEvaluation = "NonEvalue",
): EtatRegulationInconnu => ({
  ...reponse,
  _resultatEvaluationRegulation: "Inconnu",
  etapeEvaluee,
});
export const fabriqueResultatEvaluationEnSuspens = (
  etapeEvaluee: EtapeEvaluationActive,
  resulat: ResultatRegulationEntite,
  reponse: UnionReponseEtatNonVide,
): EtatEvaluationEnSuspens => ({
  ...resulat,
  ...reponse,
  _resultatEvaluationRegulation: "EnSuspens",
  etapeEvaluee,
});
export const fabriqueResultatEvaluationDefinitif = (
  etapeEvaluee: EtapeEvaluationActive,
  resulat: ResultatRegulationEntite,
): EtatRegulationDefinitif => ({
  _resultatEvaluationRegulation: "Definitif",
  etapeEvaluee,
  ...resulat,
});
export const fabriqueResultatEvaluationReguleOse =
  (): EtatRegulationDefinitif =>
    fabriqueResultatEvaluationDefinitif(
      "DesignationOperateurServicesEssentiels",
      resultatReguleOSE,
    );
export const fabriqueResultatEnSuspensOse =
  (reponse: EtatRegulation) => (): EtatEvaluationEnSuspens =>
    fabriqueResultatEvaluationEnSuspens(
      "DesignationOperateurServicesEssentiels",
      resultatIncertain,
      reponse as EtatRegulationAvecReponses,
    );
