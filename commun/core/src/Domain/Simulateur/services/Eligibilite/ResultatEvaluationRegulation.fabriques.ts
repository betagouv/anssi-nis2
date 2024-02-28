// TODO: Causes sur nouveau modèle
import { ResultatRegulationEntite } from "../../Regulation.definitions";
import { EtatEvaluation } from "./EtatEvaluation.definitions";
import { EtatEvaluationDefinitif } from "./EtatRegulation.definitions";

export const fabriqueResultatEvaluationRegulationDefinitif = (
  resultatRegulation: ResultatRegulationEntite,
  etapeEvaluee: EtatEvaluation,
): EtatEvaluationDefinitif => ({
  _resultatEvaluationRegulation: "Definitif",
  etapeEvaluee,
  ...resultatRegulation,
});
