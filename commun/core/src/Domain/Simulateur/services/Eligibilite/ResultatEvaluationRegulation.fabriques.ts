// TODO: Causes sur nouveau modèle
import { ResultatRegulationEntite } from "../../Regulation.definitions";
import { ResultatEvaluationRegulationDefinitif } from "./EtatRegulation.definition";
import { EtapesEvaluation } from "./Reponse.definitions";

export const fabriqueResultatEvaluationRegulationDefinitif = (
  resultatRegulation: ResultatRegulationEntite,
  etapeEvaluee: EtapesEvaluation,
): ResultatEvaluationRegulationDefinitif => ({
  _resultatEvaluationRegulation: "Definitif",
  etapeEvaluee,
  ...resultatRegulation,
});
