import {
  CausesRegulation,
  Regulation,
  ResultatRegulationEntite,
} from "./Regulation.definitions";

export const causeReguleOSE: CausesRegulation = {
  designeOperateurServicesEssentiels: ["oui"],
};

export const resultatIncertain: ResultatRegulationEntite = {
  decision: Regulation.Incertain,
};

export const resultatNonRegule: ResultatRegulationEntite = {
  decision: Regulation.NonRegule,
};
