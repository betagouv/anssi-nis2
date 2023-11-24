import { SousSecteurActivite } from "anssi-nis2-domain/src/Simulateur/SousSecteurActivite.definitions";
import { SecteurActivite } from "anssi-nis2-domain/src/Simulateur/SecteurActivite.definitions";
import {
  ValeursAppartenancePaysUnionEuropeenne,
  ValeursDesignationOperateurServicesEssentiels,
  ValeursPetitMoyenGrand,
  ValeursTypeEntitePublique,
  ValeursTypeStructure,
} from "./ChampsSimulateur.valeurs";
import { ValeursActivites } from "anssi-nis2-domain/src/Simulateur/Activite.definitions";

export type DesignationOperateurServicesEssentiels =
  (typeof ValeursDesignationOperateurServicesEssentiels)[number];
export declare type AppartenancePaysUnionEuropeenne =
  (typeof ValeursAppartenancePaysUnionEuropeenne)[number];
export type TypeStructure = (typeof ValeursTypeStructure)[number];
export type TypeEntitePublique = (typeof ValeursTypeEntitePublique)[number];
export type UnionPetitMoyenGrand = (typeof ValeursPetitMoyenGrand)[number];
export type TrancheNombreEmployes = UnionPetitMoyenGrand;
export type TrancheChiffreAffaire = UnionPetitMoyenGrand;
export type ValeurChampSimulateur =
  | DesignationOperateurServicesEssentiels
  | AppartenancePaysUnionEuropeenne
  | TypeStructure
  | TypeEntitePublique
  | TrancheChiffreAffaire
  | TrancheNombreEmployes
  | SecteurActivite
  | SousSecteurActivite
  | ValeursActivites;
