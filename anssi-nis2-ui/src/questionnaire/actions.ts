import {
  AppartenancePaysUnionEuropeenne,
  DesignationOperateurServicesEssentiels,
  TrancheChiffreAffaire,
  TrancheNombreEmployes,
  TypeStructure,
} from "anssi-nis2-core/src/Domain/Simulateur/ChampsSimulateur.definitions.ts";
import { SecteurActivite } from "anssi-nis2-core/src/Domain/Simulateur/SecteurActivite.definitions.ts";
import { SousSecteurActivite } from "anssi-nis2-core/src/Domain/Simulateur/SousSecteurActivite.definitions.ts";
import { Activite } from "anssi-nis2-core/src/Domain/Simulateur/Activite.definitions.ts";

export type ActionQuestionnaire =
  | ActionVide
  | ActionSuivantEtapePrealable
  | ActionValideEtapeDesignation
  | ActionValideEtapeAppartenanceUE
  | ActionValideTypeStructure
  | ActionValideTailleEntitePrivee
  | ActionValideSecteursActivite
  | ActionValideSousSecteursActivite
  | ActionValideActivites
  | ActionValideLocalisationEtablissementPrincipal;

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

interface ActionValideSecteursActivite {
  type: "VALIDE_ETAPE_SECTEURS_ACTIVITE";
  secteurs: SecteurActivite[];
}

interface ActionValideSousSecteursActivite {
  type: "VALIDE_ETAPE_SOUS_SECTEURS_ACTIVITE";
  sousSecteurs: SousSecteurActivite[];
}

interface ActionValideActivites {
  type: "VALIDE_ETAPE_ACTIVITES";
  activites: Activite[];
}

interface ActionValideLocalisationEtablissementPrincipal {
  type: "VALIDE_ETAPE_LOCALISATION_ETABLISSEMENT_PRINCIPAL";
  paysDecision: AppartenancePaysUnionEuropeenne[];
  paysOperation: AppartenancePaysUnionEuropeenne[];
  paysSalaries: AppartenancePaysUnionEuropeenne[];
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

export const valideSecteursActivite = (
  secteurs: SecteurActivite[],
): ActionValideSecteursActivite => ({
  type: "VALIDE_ETAPE_SECTEURS_ACTIVITE",
  secteurs,
});

export const valideSousSecteursActivite = (
  sousSecteurs: SousSecteurActivite[],
): ActionValideSousSecteursActivite => ({
  type: "VALIDE_ETAPE_SOUS_SECTEURS_ACTIVITE",
  sousSecteurs,
});

export const valideActivites = (
  activites: Activite[],
): ActionValideActivites => ({
  type: "VALIDE_ETAPE_ACTIVITES",
  activites,
});

export function valideLocalisationEtablissementPrincipal(
  paysDecision: AppartenancePaysUnionEuropeenne[],
  paysOperation: AppartenancePaysUnionEuropeenne[],
  paysSalaries: AppartenancePaysUnionEuropeenne[],
): ActionValideLocalisationEtablissementPrincipal {
  return {
    type: "VALIDE_ETAPE_LOCALISATION_ETABLISSEMENT_PRINCIPAL",
    paysDecision,
    paysOperation,
    paysSalaries,
  };
}
