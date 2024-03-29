import {
  arbReponseAppartenanceUnionEuropeenne_ToujoursAutreUE,
  arbReponseAppartenanceUnionEuropeenne_ToujoursFrance,
  arbReponseAppartenanceUnionEuropeenne_ToujoursHorsUE,
} from "./ReponseAppartenanceUnionEuropeenne.arbitraires";
import { arbReponseDesignationOperateurServicesEssentiels_JamaisOui } from "./ReponseDesignationOperateurServicesEssentiels.arbitraires";
import { TupleArb_DesignationOSE_AppartenanceUE } from "./ResultatEvaluationRegulation.arbitraires.definitions";

export const arbTuple_JamaisOse_ToujoursHorsUE: TupleArb_DesignationOSE_AppartenanceUE =
  [
    arbReponseDesignationOperateurServicesEssentiels_JamaisOui,
    arbReponseAppartenanceUnionEuropeenne_ToujoursHorsUE,
  ];
export const arbTuple_JamaisOse_ToujoursFrance: TupleArb_DesignationOSE_AppartenanceUE =
  [
    arbReponseDesignationOperateurServicesEssentiels_JamaisOui,
    arbReponseAppartenanceUnionEuropeenne_ToujoursFrance,
  ];
export const arbTuple_JamaisOse_ToujoursAutreUE: TupleArb_DesignationOSE_AppartenanceUE =
  [
    arbReponseDesignationOperateurServicesEssentiels_JamaisOui,
    arbReponseAppartenanceUnionEuropeenne_ToujoursAutreUE,
  ];
