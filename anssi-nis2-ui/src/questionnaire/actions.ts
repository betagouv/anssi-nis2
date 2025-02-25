import { Activite } from "../../../commun/core/src/Domain/Simulateur/Activite.definitions.ts";
import {
  AppartenancePaysUnionEuropeenne,
  DesignationOperateurServicesEssentiels,
  TrancheBilanFinancier,
  TrancheChiffreAffaire,
  TrancheNombreEmployes,
  TypeStructure,
} from "../../../commun/core/src/Domain/Simulateur/ChampsSimulateur.definitions.ts";
import { SecteurActivite } from "../../../commun/core/src/Domain/Simulateur/SecteurActivite.definitions.ts";
import { SousSecteurActivite } from "../../../commun/core/src/Domain/Simulateur/SousSecteurActivite.definitions.ts";

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
  | ActionValideLocalisationEtablissementPrincipal
  | ActionValideLocalisationServicesNumeriques;

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
  bilanFinancier: TrancheBilanFinancier[];
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

interface ActionValideLocalisationServicesNumeriques {
  type: "VALIDE_ETAPE_LOCALISATION_SERVICES_NUMERIQUES";
  pays: AppartenancePaysUnionEuropeenne[];
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
  bilanFinancier: TrancheBilanFinancier[],
): ActionValideTailleEntitePrivee => ({
  type: "VALIDE_ETAPE_TAILLE_ENTITE_PRIVEE",
  nombreEmployes,
  chiffreAffaire,
  bilanFinancier,
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

export const valideLocalisationEtablissementPrincipal = (
  paysDecision: AppartenancePaysUnionEuropeenne[],
  paysOperation: AppartenancePaysUnionEuropeenne[],
  paysSalaries: AppartenancePaysUnionEuropeenne[],
): ActionValideLocalisationEtablissementPrincipal => ({
  type: "VALIDE_ETAPE_LOCALISATION_ETABLISSEMENT_PRINCIPAL",
  paysDecision,
  paysOperation,
  paysSalaries,
});

export const valideLocalisationServicesNumeriques = (
  pays: AppartenancePaysUnionEuropeenne[],
): ActionValideLocalisationServicesNumeriques => ({
  type: "VALIDE_ETAPE_LOCALISATION_SERVICES_NUMERIQUES",
  pays,
});
