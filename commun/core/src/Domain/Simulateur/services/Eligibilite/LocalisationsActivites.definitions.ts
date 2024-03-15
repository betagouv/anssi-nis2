import { AppartenancePaysUnionEuropeenne } from "../../ChampsSimulateur.definitions";

export type LocalisationsServices = {
  localisationFournitureServicesNumeriques: Set<AppartenancePaysUnionEuropeenne>;
};

export type LocalisationEtablissementPrincipal =
  | {
      paysDecisionsCyber: Extract<
        AppartenancePaysUnionEuropeenne,
        "france" | "autre"
      >;
    }
  | {
      paysDecisionsCyber: Extract<AppartenancePaysUnionEuropeenne, "horsue">;
      paysOperationsCyber: Extract<
        AppartenancePaysUnionEuropeenne,
        "france" | "autre"
      >;
    }
  | {
      paysDecisionsCyber: Extract<AppartenancePaysUnionEuropeenne, "horsue">;
      paysOperationsCyber: Extract<AppartenancePaysUnionEuropeenne, "horsue">;
      paysPlusGrandNombreSalaries: Extract<
        AppartenancePaysUnionEuropeenne,
        "france" | "autre"
      >;
    };
