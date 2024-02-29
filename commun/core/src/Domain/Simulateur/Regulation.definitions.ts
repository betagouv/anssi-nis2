import { Tag } from "../../../../utils/types/Tag";
import { DonneesFormulaireSimulateur } from "./DonneesFormulaire.definitions";

import { ValeursRegulationEntite } from "./RegulationEntite.valeurs";
import { CapsuleReponseDefinitions } from "./services/Eligibilite/CapsuleReponse.definitions";

export type RegulationEntite = (typeof ValeursRegulationEntite)[number];

export type CausesRegulation =
  | Partial<DonneesFormulaireSimulateur>
  | CapsuleReponseDefinitions;

export type InformationsManquantes = Tag<"InformationsManquantes">;
export type EnAttenteTranspositionLoiFrancaise =
  Tag<"EnAttenteTranspositionLoiFrancaise">;
export type DefiniDansUnAutreEtatMembre = Tag<"DefiniDansUnAutreEtatMembre">;
export type ConstructionTestEnCours = Tag<"ConstructionTestEnCours">;
export type CasNonDefini = Tag<"CasNonDefini">;

export type CausesIncertitude =
  | InformationsManquantes
  | EnAttenteTranspositionLoiFrancaise
  | CasNonDefini
  | ConstructionTestEnCours
  | DefiniDansUnAutreEtatMembre;

export const Regulation: Record<RegulationEntite, RegulationEntite> = {
  Regule: "Regule",
  NonRegule: "NonRegule",
  Incertain: "Incertain",
};

export type TypeEntite = "EntiteImportante" | "EntiteEssentielle";

export type ResultatRegulationPositif = {
  decision: typeof Regulation.Regule;
  typeEntite: TypeEntite;
  causes: CausesRegulation;
};

export type ResultatRegulationIncertain = {
  decision: typeof Regulation.Incertain;
  causes: CausesIncertitude;
};

export type ResultatRegulationNonRegule = {
  decision: typeof Regulation.NonRegule;
};

export type ResultatRegulationEntite =
  | ResultatRegulationPositif
  | ResultatRegulationNonRegule
  | ResultatRegulationIncertain;

export type PredicatResultatRegulationEntite = (
  d: ResultatRegulationEntite,
) => boolean;
export type FabriqueCause =
  | ((d: Partial<DonneesFormulaireSimulateur>) => {
      causes: CausesRegulation;
    })
  | (() => NonNullable<unknown>);
