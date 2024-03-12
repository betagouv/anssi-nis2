import { AppartenancePaysUnionEuropeenne } from "../../ChampsSimulateur.definitions";

export type EtablissementPrincipalNeFournitPasUE = {
  fournitServicesUnionEuropeenne: "non";
};
export type EtablissementPrincipalFournitUE = {
  fournitServicesUnionEuropeenne: "oui";
  localisationRepresentant: AppartenancePaysUnionEuropeenne;
};
export type EtablissementPrincipalLocalisation =
  | EtablissementPrincipalNeFournitPasUE
  | EtablissementPrincipalFournitUE;