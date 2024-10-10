import {
  arbReponseAppartenanceUnionEuropeenne_ToujoursFrance,
} from "./ReponseAppartenanceUnionEuropeenne.arbitraires";
import {
  arbReponseDesignationOperateurServicesEssentiels_JamaisOui,
} from "./ReponseDesignationOperateurServicesEssentiels.arbitraires";
import { TupleArb_DesignationOSE_AppartenanceUE } from "./ResultatEvaluationRegulation.arbitraires.definitions";

export const arbTuple_JamaisOse_ToujoursFrance: TupleArb_DesignationOSE_AppartenanceUE =
  [
    arbReponseDesignationOperateurServicesEssentiels_JamaisOui,
    arbReponseAppartenanceUnionEuropeenne_ToujoursFrance,
  ];
