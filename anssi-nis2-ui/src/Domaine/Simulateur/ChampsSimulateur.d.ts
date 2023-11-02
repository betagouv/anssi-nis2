import { SecteursSansSousSecteur, SousSecteurActivite } from "./SousSecteurs";
import { SecteurActivite } from "./SecteursActivite";
import {
  ValeursAppartenancePaysUnionEuropeenne,
  ValeursDesignationOperateurServicesEssentiels,
  ValeursPetitMoyenGrand,
  ValeursTypeStructure,
} from "./ValeursChampsSimulateur";
import { ValeursActivites } from "./Activite";

export type DesignationOperateurServicesEssentiels =
  (typeof ValeursDesignationOperateurServicesEssentiels)[number];
export declare type AppartenancePaysUnionEuropeenne =
  (typeof ValeursAppartenancePaysUnionEuropeenne)[number];
export type TypeStructure = (typeof ValeursTypeStructure)[number];
type UnionPetitMoyenGrand = (typeof ValeursPetitMoyenGrand)[number];
export type TrancheNombreEmployes = UnionPetitMoyenGrand;
export type TrancheChiffreAffaire = UnionPetitMoyenGrand;
export type ValeurCleSectorielle =
  | SecteursSansSousSecteur
  | SousSecteurActivite;
export type ValeurChampSimulateur =
  | DesignationOperateurServicesEssentiels
  | AppartenancePaysUnionEuropeenne
  | TypeStructure
  | TrancheChiffreAffaire
  | TrancheNombreEmployes
  | SecteurActivite
  | SousSecteurActivite
  | ValeursActivites;
