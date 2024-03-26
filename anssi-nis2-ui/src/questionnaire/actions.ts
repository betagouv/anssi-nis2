import {
  AppartenancePaysUnionEuropeenne,
  DesignationOperateurServicesEssentiels,
  TrancheChiffreAffaire,
  TrancheNombreEmployes,
  TypeStructure,
} from "anssi-nis2-core/src/Domain/Simulateur/ChampsSimulateur.definitions.ts";

export type ActionQuestionnaire =
  | ActionVide
  | ActionSuivantEtapePrealable
  | ActionValideEtapeDesignation
  | ActionValideEtapeAppartenanceUE
  | ActionValideTypeStructure
  | ActionValideTailleEntitePrivee;

interface ActionVide {
  type: "VIDE";
}

interface ActionSuivantEtapePrealable {
  type: "VALIDE_ETAPE_PREALABLE";
}

interface ActionValideEtapeDesignation {
  type: "VALIDE_ETAPE_DESIGNATION";
  designations: DesignationOperateurServicesEssentiels[];
}

interface ActionValideEtapeAppartenanceUE {
  type: "VALIDE_ETAPE_APPARTENANCE_UE";
  appartenances: AppartenancePaysUnionEuropeenne[];
}

interface ActionValideTypeStructure {
  type: "VALIDE_ETAPE_TYPE_STRUCTURE";
  types: TypeStructure[];
}

interface ActionValideTailleEntitePrivee {
  type: "VALIDE_ETAPE_TAILLE_ENTITE_PRIVEE";
  nombreEmployes: TrancheNombreEmployes[];
  chiffreAffaire: TrancheChiffreAffaire[];
}

export const valideEtapePrealable = (): ActionSuivantEtapePrealable => ({
  type: "VALIDE_ETAPE_PREALABLE",
});

export const valideEtapeDesignation = (
  designations: DesignationOperateurServicesEssentiels[],
): ActionValideEtapeDesignation => ({
  type: "VALIDE_ETAPE_DESIGNATION",
  designations,
});

export const valideEtapeAppartenanceUE = (
  appartenances: AppartenancePaysUnionEuropeenne[],
): ActionValideEtapeAppartenanceUE => ({
  type: "VALIDE_ETAPE_APPARTENANCE_UE",
  appartenances,
});

export const valideTypeStructure = (
  types: TypeStructure[],
): ActionValideTypeStructure => ({
  type: "VALIDE_ETAPE_TYPE_STRUCTURE",
  types,
});

export const valideTailleEntitePrivee = (
  nombreEmployes: TrancheNombreEmployes[],
  chiffreAffaire: TrancheChiffreAffaire[],
): ActionValideTailleEntitePrivee => ({
  type: "VALIDE_ETAPE_TAILLE_ENTITE_PRIVEE",
  nombreEmployes,
  chiffreAffaire,
});
