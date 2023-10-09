import {
  SecteursSansSousSecteur,
  SousSecteurActivite,
} from "./SousSecteurs.ts";
import { SecteurActivite } from "./SecteursActivite";
import { Activite } from "./Activite.ts";

export const ValeursDesignationOperateurServicesEssentiels = [
  "oui",
  "non",
  "nsp",
] as const;
export type DesignationOperateurServicesEssentiels =
  (typeof ValeursDesignationOperateurServicesEssentiels)[number];
export type AppartenancePaysUnionEuropeenne = "france" | "autre" | "horsue";
export type TypeStructure = "publique" | "privee";
type UnionPetitMoyenGrand = "petit" | "moyen" | "grand";
export type TrancheNombreEmployes = UnionPetitMoyenGrand;
export type TrancheChiffreAffaire = UnionPetitMoyenGrand;

export type ValeurCleSectorielle =
  | SecteursSansSousSecteur
  | SousSecteurActivite;

export type ValeurChampSimulaire =
  | DesignationOperateurServicesEssentiels
  | AppartenancePaysUnionEuropeenne
  | TypeStructure
  | TrancheChiffreAffaire
  | TrancheNombreEmployes
  | SecteurActivite
  | SousSecteurActivite
  | Activite;
