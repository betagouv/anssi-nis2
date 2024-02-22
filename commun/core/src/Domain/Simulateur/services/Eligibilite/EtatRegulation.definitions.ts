import { Tag } from "../../../../../../utils/types/Tag";
import { ResultatRegulationEntite } from "../../Regulation.definitions";
import { EtatEvaluationActives } from "./EtatEvaluation.definitions";
import { UnionReponseEtatNonVide } from "./ReponseEtat.definitions";

export type EtatEvaluation = {
  etapeEvaluee: EtatEvaluationActives | "NonEvalue";
};

export type ResultatEvaluationRegulationDefinitif = Tag<
  "Definitif",
  "ResultatEvaluationRegulation"
> &
  EtatEvaluation &
  ResultatRegulationEntite;

export type ResultatEvaluationRegulationAvecReponses = EtatEvaluation &
  UnionReponseEtatNonVide;
export type ResultatEvaluationRegulationEnSuspens = Tag<
  "EnSuspens",
  "ResultatEvaluationRegulation"
> &
  ResultatRegulationEntite &
  ResultatEvaluationRegulationAvecReponses;

export type ResultatEvaluationRegulationInconnu = Tag<
  "Inconnu",
  "ResultatEvaluationRegulation"
> &
  ResultatEvaluationRegulationAvecReponses;

export type ResultatEvaluationRegulation =
  | ResultatEvaluationRegulationDefinitif
  | ResultatEvaluationRegulationEnSuspens
  | ResultatEvaluationRegulationInconnu;

export type OperationEvalueEtape = (
  reponse: ResultatEvaluationRegulation,
) => ResultatEvaluationRegulation;
