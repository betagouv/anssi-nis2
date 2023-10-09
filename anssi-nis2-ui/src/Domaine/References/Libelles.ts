import {
  TValeursReponsesDesigneOSE,
  ValeursClePaysUnionEuropeenne,
  ValeursTrancheCA,
  ValeursTrancheNombreEmployes,
  ValeursTypeStructure,
} from "../Simulateur/ValeursCles.ts";
import { libellesActivites } from "./LibellesActivites.ts";
import { libellesSecteursActivite } from "./LibellesSecteursActivite.ts";
import { libellesSousSecteursActivite } from "./LibellesSousSecteursActivite.ts";
import { DictionnaireLibellesSimulateur } from "./DictionnaireLibellesSimulateur.ts";

export const libellesDesigneOSE: Record<TValeursReponsesDesigneOSE, string> = {
  oui: "Oui",
  non: "Non",
  nsp: "Ne sais pas",
};

export const libellesPaysUnionEuropeenneLocalisation: Record<
  ValeursClePaysUnionEuropeenne,
  string
> = {
  france: "France",
  autre: "Autres états membres",
  horsue: "Autres états hors Union Européenne",
};

export const libellesTypesStructure: Record<ValeursTypeStructure, string> = {
  publique: "Organisation publique",
  privee: "Entrprise privée",
};

export const libellesTranchesNombreEmployes: Record<
  ValeursTrancheNombreEmployes,
  string
> = {
  petit: "1 à 49",
  moyen: "50 à 249",
  grand: "≥ 250",
};

export const libellesTranchesCA: Record<ValeursTrancheCA, string> = {
  petit: "< 10 millions €",
  moyen: "10 à 50 millions €, ou bilan annuel de 10 à 43 millions €",
  grand: "≥ 50 millions €, ou bilan annuel ≥ 43 millions €",
};

export const libellesSimulateur: DictionnaireLibellesSimulateur = {
  activites: libellesActivites,
  designeOSE: libellesDesigneOSE,
  etatMembre: libellesPaysUnionEuropeenneLocalisation,
  secteurActivite: libellesSecteursActivite,
  sousSecteurActivite: libellesSousSecteursActivite,
  trancheCA: libellesTranchesCA,
  trancheNombreEmployes: libellesTranchesNombreEmployes,
  typeStructure: libellesTypesStructure,
};
