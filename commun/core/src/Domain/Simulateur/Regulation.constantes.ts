import {
  CausesRegulation,
  Regulation,
  ResultatRegulationEntite,
  ResultatRegulationIncertain,
} from "./Regulation.definitions";

export const causeReguleOSE: CausesRegulation = {
  designationOperateurServicesEssentiels: ["oui"],
};

export const resultatIncertain: ResultatRegulationEntite = {
  decision: Regulation.Incertain,
};

export const resultatIncertainAutrePaysUE: ResultatRegulationIncertain = {
  decision: "Incertain",
  causes: { _tag: "DefiniDansUnAutreEtatMembre" },
};

export const resultatNonRegule: ResultatRegulationEntite = {
  decision: Regulation.NonRegule,
};
