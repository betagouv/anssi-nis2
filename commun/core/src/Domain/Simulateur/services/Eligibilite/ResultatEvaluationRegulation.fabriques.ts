// TODO: Causes sur nouveau modèle
import { ResultatRegulationEntite } from "../../Regulation.definitions";
import { EtatEvaluation } from "./EtatEvaluation.definitions";
import { ResultatEvaluationRegulationDefinitif } from "./EtatRegulation.definitions";

export const fabriqueResultatEvaluationRegulationDefinitif = (
  resultatRegulation: ResultatRegulationEntite,
  etapeEvaluee: EtatEvaluation,
): ResultatEvaluationRegulationDefinitif => ({
  _resultatEvaluationRegulation: "Definitif",
  etapeEvaluee,
  ...resultatRegulation,
});
