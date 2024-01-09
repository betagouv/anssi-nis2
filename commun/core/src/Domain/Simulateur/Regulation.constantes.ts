import { fabriqueDonneesFormulaire } from "./fabriques/DonneesFormulaire.fabrique";
import {
  CausesRegulation,
  RegulationEntite,
  ResultatRegulationEntite,
} from "./Regulation.definitions";

export const causeReguleOSE: CausesRegulation = {
  designeOperateurServicesEssentiels: ["oui"],
};
export const reguleOSE: ResultatRegulationEntite = {
  decision: "Regule",
  causes: causeReguleOSE,
  donnees: fabriqueDonneesFormulaire(causeReguleOSE),
};
export const resultatIncertain: ResultatRegulationEntite = {
  decision: "Incertain",
};

export const Regulation: Record<RegulationEntite, RegulationEntite> = {
  Regule: "Regule",
  NonRegule: "NonRegule",
  Incertain: "Incertain",
};
