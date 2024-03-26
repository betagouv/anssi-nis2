import {
  AppartenancePaysUnionEuropeenne,
  DesignationOperateurServicesEssentiels,
  FournitServicesUnionEuropeenne,
  TrancheChiffreAffaire,
  TrancheNombreEmployes,
  TypeEntitePublique,
  TypeStructure,
} from "../../../commun/core/src/Domain/Simulateur/ChampsSimulateur.definitions.ts";
import { DictionnaireLibellesSimulateur } from "../types/dictionnaireLibellesSimulateur.declarations.ts";
import { libellesActivites } from "./LibellesActivites.ts";
import { libellesSecteursActivite } from "./LibellesSecteursActivite.ts";
import { libellesSousSecteursActivite } from "./LibellesSousSecteursActivite.ts";

export const libellesFournitServicesUnionEuropeenne: Record<
  FournitServicesUnionEuropeenne,
  string
> = {
  oui: "Oui",
  non: "Non",
};

export const libellesDesigneOSE: Record<
  DesignationOperateurServicesEssentiels,
  string
> = {
  ...libellesFournitServicesUnionEuropeenne,
  nsp: "Ne sais pas",
};

export const libellesPaysUnionEuropeenneLocalisation: Record<
  AppartenancePaysUnionEuropeenne,
  string
> = {
  france: "France",
  autre: "Autres états membres de l'Union Européenne",
  horsue: "Autres états hors Union Européenne",
};
export const libellesPaysUnionEuropeenneLocalisationUE: Record<
  Exclude<AppartenancePaysUnionEuropeenne, "horsue">,
  string
> = {
  france: "France",
  autre: "Autres états membres de l'Union Européenne",
};

export const libellesTypesStructure: Record<TypeStructure, string> = {
  privee: "Entreprise privée ou publique",
  publique: "Administration publique",
};

export const libellesTypeEntitePublique: Record<TypeEntitePublique, string> = {
  administrationCentrale: "Administration centrale",
  autreStructurePublique: "Autre structure publique",
  collectiviteTerritoriale: "Collectivité territoriale",
};

export const libellesTranchesNombreEmployes: Record<
  TrancheNombreEmployes,
  string
> = {
  petit: "1 à 49",
  moyen: "50 à 249",
  grand: "≥ 250",
};

export const libellesTranchesCA: Record<TrancheChiffreAffaire, string> = {
  petit: "< 10 millions €",
  moyen: "10 à 50 millions €, ou bilan annuel de 10 à 43 millions €",
  grand: "≥ 50 millions €, ou bilan annuel ≥ 43 millions €",
};

export const libellesSimulateur: DictionnaireLibellesSimulateur = {
  activites: libellesActivites,
  designationOperateurServicesEssentiels: libellesDesigneOSE,
  appartenancePaysUnionEuropeenne: libellesPaysUnionEuropeenneLocalisation,
  secteurActivite: libellesSecteursActivite,
  sousSecteurActivite: libellesSousSecteursActivite,
  trancheChiffreAffaire: libellesTranchesCA,
  trancheNombreEmployes: libellesTranchesNombreEmployes,
  typeStructure: libellesTypesStructure,
  typeEntitePublique: libellesTypeEntitePublique,
  localisationFournitureServicesNumeriques:
    libellesPaysUnionEuropeenneLocalisation,
  paysDecisionsCyber: libellesPaysUnionEuropeenneLocalisation,
  paysOperationsCyber: libellesPaysUnionEuropeenneLocalisation,
  paysPlusGrandNombreSalaries: libellesPaysUnionEuropeenneLocalisation,
};
