import { DonneesFormulaireSimulateur } from "./DonneesFormulaire";

import { ValeursRegulationEntite } from "./RegulationEntite.valeurs";

export type RegulationEntite = (typeof ValeursRegulationEntite)[number];

export type CausesRegulation = Partial<DonneesFormulaireSimulateur>;

export const Regulation: Record<RegulationEntite, RegulationEntite> = {
  Regule: "Regule",
  NonRegule: "NonRegule",
  Incertain: "Incertain",
};

export type ResultatRegulationPositif = {
  decision: typeof Regulation.Regule;
  causes: CausesRegulation;
  donnees: DonneesFormulaireSimulateur;
};

export type ResultatIncertain = {
  decision: typeof Regulation.Incertain;
};

export type ResultatRegulationNonRegule = {
  decision: typeof Regulation.NonRegule;
};

export type ResultatRegulationEntite =
  | ResultatRegulationPositif
  | ResultatRegulationNonRegule
  | ResultatIncertain;