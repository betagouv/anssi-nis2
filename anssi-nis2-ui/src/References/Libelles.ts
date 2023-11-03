import { libellesActivites } from "./LibellesActivites.ts";
import { libellesSecteursActivite } from "./LibellesSecteursActivite.ts";
import { libellesSousSecteursActivite } from "./LibellesSousSecteursActivite.ts";
import { DictionnaireLibellesSimulateur } from "./dictionnaireLibellesSimulateur";
import {
  AppartenancePaysUnionEuropeenne,
  DesignationOperateurServicesEssentiels,
  TrancheChiffreAffaire,
  TrancheNombreEmployes,
  TypeEntitePublique,
  TypeStructure,
} from "../Domaine/Simulateur/ChampsSimulateur.definitions.ts";

export const libellesDesigneOSE: Record<
  DesignationOperateurServicesEssentiels,
  string
> = {
  oui: "Oui",
  non: "Non",
  nsp: "Ne sais pas",
};

export const libellesPaysUnionEuropeenneLocalisation: Record<
  AppartenancePaysUnionEuropeenne,
  string
> = {
  france: "France",
  autre: "Autres états membres",
  horsue: "Autres états hors Union Européenne",
};

export const libellesTypesStructure: Record<TypeStructure, string> = {
  publique: "Organisation ou entreprise publique",
  privee: "Entreprise privée",
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
  designeOperateurServicesEssentiels: libellesDesigneOSE,
  etatMembre: libellesPaysUnionEuropeenneLocalisation,
  secteurActivite: libellesSecteursActivite,
  sousSecteurActivite: libellesSousSecteursActivite,
  trancheCA: libellesTranchesCA,
  trancheNombreEmployes: libellesTranchesNombreEmployes,
  typeStructure: libellesTypesStructure,
};
