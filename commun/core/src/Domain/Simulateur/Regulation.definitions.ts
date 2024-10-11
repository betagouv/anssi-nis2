import { ValeursRegulationEntite } from "./RegulationEntite.valeurs";
import { CapsuleReponseDefinitions } from "./services/Eligibilite/CapsuleReponse.definitions";

export type RegulationEntite = (typeof ValeursRegulationEntite)[number];

export type CausesRegulation = CapsuleReponseDefinitions;

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

export const CodesResumesPointsAttention = [
  "NumeriqueUE",
  "EtabliUE",
  "RepresentantUE",
];
export type ResumesPointsAttention =
  (typeof CodesResumesPointsAttention)[number];

export const CodesPrecisionsPointsAttention = [
  "OSE",
  "MecanismeExemptionSecuriteNationale",
  "TelecomFranceEtAutresEMdelUE",
  "TelecomAutresEMdelUEUniquement",
  "NumeriqueEtabliEMUEhorsFrance",
  "ResilienceEntiteCritique",
  "DORA",
  "EnregistrementNomsDeDomaine",
  "CriteresDePossibleInclusion",
];
export type PointsAttentionPrecis =
  (typeof CodesPrecisionsPointsAttention)[number];
