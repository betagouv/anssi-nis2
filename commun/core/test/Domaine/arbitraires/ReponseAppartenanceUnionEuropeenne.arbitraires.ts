import { fc } from "@fast-check/vitest";
import { ReponseAppartenancePaysUnionEuropeenne } from "../../../src/Domain/Simulateur/services/Eligibilite/ReponseAppartenancePaysUnionEuropeenne.definition";
import {
  arbAppartenancePaysUnionEuropeenne_ToujoursAutreUe,
  arbAppartenancePaysUnionEuropeenne_ToujoursFrance,
  arbAppartenancePaysUnionEuropeenne_ToujoursHorsUe,
} from "./ValeursChampsSimulateur.arbitraire";

export const arbReponseAppartenanceUnionEuropeenne_ToujoursFrance =
  fc.record<ReponseAppartenancePaysUnionEuropeenne>({
    appartenancePaysUnionEuropeenne:
      arbAppartenancePaysUnionEuropeenne_ToujoursFrance,
  });
export const arbReponseAppartenanceUnionEuropeenne_ToujoursAutreUE = fc.record({
  appartenancePaysUnionEuropeenne:
    arbAppartenancePaysUnionEuropeenne_ToujoursAutreUe,
});
export const arbReponseAppartenanceUnionEuropeenne_ToujoursHorsUE = fc.record({
  appartenancePaysUnionEuropeenne:
    arbAppartenancePaysUnionEuropeenne_ToujoursHorsUe,
});
