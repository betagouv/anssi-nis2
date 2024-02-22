export type EtatEvaluationActives =
  | "DesignationOperateurServicesEssentiels"
  | "AppartenancePaysUnionEuropeenne"
  | "Structure"
  | "InformationsSecteur";
export type EtatEvaluation = "NonEvalue" | EtatEvaluationActives;
