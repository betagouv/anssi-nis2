import {
  AppartenancePaysUnionEuropeenne,
  DesignationOperateurServicesEssentiels,
  TrancheChiffreAffaire,
  TrancheNombreEmployes,
  TypeStructure,
  ValeurChampSimulateur,
} from "./ValeursChampsSimulateur.ts";
import { Activite } from "./Activite.ts";
import { SecteurActivite } from "./SecteursActivite";
import { SousSecteurActivite } from "./SousSecteurs.ts";

export type NomsChampsSimulateur =
  | "designeOperateurServicesEssentiels"
  | "etatMembre"
  | "typeStructure"
  | "trancheNombreEmployes"
  | "trancheCA"
  | "secteurActivite"
  | "sousSecteurActivite"
  | "activites";

export interface DonneesFormulaireSimulateur
  extends Record<NomsChampsSimulateur, ValeurChampSimulateur[]> {
  activites: Activite[];
  designeOperateurServicesEssentiels: DesignationOperateurServicesEssentiels[];
  etatMembre: AppartenancePaysUnionEuropeenne[];
  secteurActivite: SecteurActivite[];
  sousSecteurActivite: SousSecteurActivite[];
  trancheCA: TrancheChiffreAffaire[];
  trancheNombreEmployes: TrancheNombreEmployes[];
  typeStructure: TypeStructure[];
}

export const donneesFormulaireSimulateurVide: DonneesFormulaireSimulateur = {
  designeOperateurServicesEssentiels: [],
  etatMembre: [],
  secteurActivite: [],
  sousSecteurActivite: [],
  trancheCA: [],
  trancheNombreEmployes: [],
  typeStructure: [],
  activites: [],
};
