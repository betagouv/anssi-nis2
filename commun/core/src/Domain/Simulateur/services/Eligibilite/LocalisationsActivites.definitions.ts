import { AppartenancePaysUnionEuropeenne } from "../../ChampsSimulateur.definitions";

// export type EtablissementPrincipalNeFournitPasUE = {
//   fournitServicesUnionEuropeenne: "non";
// };
// export type EtablissementPrincipalFournitUE = {
//   fournitServicesUnionEuropeenne: "oui";
//   localisationRepresentant: AppartenancePaysUnionEuropeenne;
// };
// export type EtablissementPrincipalLocalisation =
//   | EtablissementPrincipalNeFournitPasUE
//   | EtablissementPrincipalFournitUE;

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
