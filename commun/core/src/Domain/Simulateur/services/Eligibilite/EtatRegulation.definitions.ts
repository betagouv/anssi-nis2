import { Tag } from "../../../../../../utils/types/Tag";
import { ResultatRegulationEntite } from "../../Regulation.definitions";
import { EtatEvaluationActives } from "./EtatEvaluation.definitions";
import { UnionReponseEtatNonVide } from "./ReponseEtat.definitions";

export type EtatEvaluationBase = {
  etapeEvaluee: EtatEvaluationActives | "NonEvalue";
};

export type EtatEvaluationDefinitif = Tag<
  "Definitif",
  "ResultatEvaluationRegulation"
> &
  EtatEvaluationBase &
  ResultatRegulationEntite;

export type EtatEvaluationAvecReponses = EtatEvaluationBase &
  UnionReponseEtatNonVide;
export type EtatEvaluationEnSuspens = Tag<
  "EnSuspens",
  "ResultatEvaluationRegulation"
> &
  ResultatRegulationEntite &
  EtatEvaluationAvecReponses;

export type EtatEvaluationInconnu = Tag<
  "Inconnu",
  "ResultatEvaluationRegulation"
> &
  EtatEvaluationAvecReponses;

export type EtatEvaluation =
  | EtatEvaluationDefinitif
  | EtatEvaluationEnSuspens
  | EtatEvaluationInconnu;

export type OperationEvalueEtat = (reponse: EtatEvaluation) => EtatEvaluation;
