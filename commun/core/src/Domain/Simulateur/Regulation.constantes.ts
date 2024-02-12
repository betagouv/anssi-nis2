import {
  CausesRegulation,
  Regulation,
  ResultatRegulationEntite,
} from "./Regulation.definitions";

export const causeReguleOSE: CausesRegulation = {
  designationOperateurServicesEssentiels: ["oui"],
};

export const resultatIncertain: ResultatRegulationEntite = {
  decision: Regulation.Incertain,
};

export const resultatNonRegule: ResultatRegulationEntite = {
  decision: Regulation.NonRegule,
};
