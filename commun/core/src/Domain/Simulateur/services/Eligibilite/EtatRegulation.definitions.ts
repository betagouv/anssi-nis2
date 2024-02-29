import { Tag } from "../../../../../../utils/types/Tag";
import {
  RegulationEntite,
  ResultatRegulationEntite,
} from "../../Regulation.definitions";
import { UnionReponseEtatNonVide } from "./ReponseEtat.definitions";

export type EtapeEvaluationActive =
  | "DesignationOperateurServicesEssentiels"
  | "AppartenancePaysUnionEuropeenne"
  | "Structure"
  | "InformationsSecteur";
export type EtapeEvaluation = "NonEvalue" | EtapeEvaluationActive;
export type EtatRegulationBase = {
  etapeEvaluee: EtapeEvaluationActive | "NonEvalue";
};

export type EtatRegulationDefinitif = Tag<
  "Definitif",
  "ResultatEvaluationRegulation"
> &
  ResultatRegulationEntite &
  EtatRegulationBase;

export type EtatRegulationDefinitivement<R extends RegulationEntite> =
  EtatRegulationDefinitif & ResultatRegulationEntite<R>;

export type EtatRegulationAvecReponses = EtatRegulationBase &
  UnionReponseEtatNonVide;

export type EtatEvaluationEnSuspens = Tag<
  "EnSuspens",
  "ResultatEvaluationRegulation"
> &
  ResultatRegulationEntite &
  EtatRegulationAvecReponses;

export type EtatRegulationInconnu = Tag<
  "Inconnu",
  "ResultatEvaluationRegulation"
> &
  EtatRegulationAvecReponses;

export type EtatRegulation =
  | EtatRegulationDefinitif
  | EtatEvaluationEnSuspens
  | EtatRegulationInconnu;

export type OperationEvalueEtat = (reponse: EtatRegulation) => EtatRegulation;
