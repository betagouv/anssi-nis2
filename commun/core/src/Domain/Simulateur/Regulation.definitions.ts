import { Tag } from "../../../../utils/types/Tag";

import { ValeursRegulationEntite } from "./RegulationEntite.valeurs";
import { CapsuleReponseDefinitions } from "./services/Eligibilite/CapsuleReponse.definitions";

export type RegulationEntite = (typeof ValeursRegulationEntite)[number];

export type CausesRegulation = CapsuleReponseDefinitions;

export type InformationsManquantes = Tag<"InformationsManquantes">;
export type EnAttenteTranspositionLoiFrancaise =
  Tag<"EnAttenteTranspositionLoiFrancaise">;
export type DefiniDansUnAutreEtatMembre = Tag<"DefiniDansUnAutreEtatMembre">;
export type ConstructionTestEnCours = Tag<"ConstructionTestEnCours"> & {
  typeConstructionEnCours: "EntitePublique" | "HorsUnionEuropeenne";
};
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

export type TypeEntite =
  | "EntiteImportante"
  | "EntiteEssentielle"
  | "AutreEtatMembreUE"
  | "EnregistrementUniquement";

export const TypeEntite: Record<TypeEntite, TypeEntite> = {
  EntiteImportante: "EntiteImportante",
  EntiteEssentielle: "EntiteEssentielle",
  AutreEtatMembreUE: "AutreEtatMembreUE",
  EnregistrementUniquement: "EnregistrementUniquement",
};

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

export type ResultatRegulationEntite<
  R extends RegulationEntite = RegulationEntite
> = R extends "Regule"
  ? ResultatRegulationPositif
  : R extends "NonRegule"
  ? ResultatRegulationNonRegule
  : ResultatRegulationIncertain;

//------------------------------------
// TYPES RÉÉCRITS

export type ResultatEligibilite = {
  regulation: RegulationEntite;
  typeEntite: TypeEntite;
  pointsAttention: {
    resumes: ResumesPointsAttention[];
    precisions: PointsAttentionPrecis[];
  };
};

export type ResumesPointsAttention =
  | "MecanismeExemption"
  | "TelecomUE";

export type PointsAttentionPrecis =
  | "ResilienceEntiteCritique"
  | "SecuriteNationale"
  | "DORA"
  | "EnregistrementNomsDeDomaines"
  | "CriteresDePossibleInclusion";
