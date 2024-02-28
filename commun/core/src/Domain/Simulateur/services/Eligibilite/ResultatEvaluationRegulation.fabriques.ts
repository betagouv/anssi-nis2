// TODO: Causes sur nouveau modèle
import { ResultatRegulationEntite } from "../../Regulation.definitions";
import {
  EtapeEvaluation,
  EtatRegulationDefinitif,
} from "./EtatRegulation.definitions";

export const fabriqueResultatEvaluationRegulationDefinitif = (
  resultatRegulation: ResultatRegulationEntite,
  etapeEvaluee: EtapeEvaluation,
): EtatRegulationDefinitif => ({
  _resultatEvaluationRegulation: "Definitif",
  etapeEvaluee,
  ...resultatRegulation,
});
