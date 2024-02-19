import { DonneesFormulaireSimulateur } from "./DonneesFormulaire.definitions";

import { ValeursRegulationEntite } from "./RegulationEntite.valeurs";
import { CapsuleInformations } from "./services/Eligibilite/Reponse.definitions";

export type RegulationEntite = (typeof ValeursRegulationEntite)[number];

export type CausesRegulation =
  | Partial<DonneesFormulaireSimulateur>
  | CapsuleInformations;

export const Regulation: Record<RegulationEntite, RegulationEntite> = {
  Regule: "Regule",
  NonRegule: "NonRegule",
  Incertain: "Incertain",
};

export type ResultatRegulationPositif = {
  decision: typeof Regulation.Regule;
  causes: CausesRegulation;
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

export type PredicatResultatRegulationEntite = (
  d: ResultatRegulationEntite,
) => boolean;
export type FabriqueCause =
  | ((d: Partial<DonneesFormulaireSimulateur>) => {
      causes: CausesRegulation;
    })
  | (() => NonNullable<unknown>);
