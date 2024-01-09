import { DonneesFormulaireSimulateur } from "./DonneesFormulaire";

import { ValeursRegulationEntite } from "./RegulationEntite.valeurs";

export type RegulationEntite = (typeof ValeursRegulationEntite)[number];

export type CausesRegulation = Partial<DonneesFormulaireSimulateur>;

export type ResultatRegulationPositif = {
  decision: "Regule";
  causes: CausesRegulation;
  donnees: DonneesFormulaireSimulateur;
};

export type ResultatIncertain = {
  decision: "Incertain";
};

export type ResultatRegulationNonRegule = {
  decision: "NonRegule";
};

export type ResultatRegulationEntite =
  | ResultatRegulationPositif
  | ResultatRegulationNonRegule
  | ResultatIncertain;
