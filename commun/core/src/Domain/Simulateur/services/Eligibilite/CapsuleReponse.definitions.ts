import { TypeStructure } from "../../ChampsSimulateur.definitions";
import {
  CategorieTaille,
  ReponseAppartenancePaysUnionEuropeenne,
  ReponseDesignationOperateurServicesEssentiels,
  ReponseInformationsSecteur,
  ReponseStructure,
  ReponseStructurePrivee,
  ReponseStructurePublique,
} from "./StructuresReponse.definitions";

export type CapsuleDesignationOperateurServicesEssentiels = {
  DesignationOperateurServicesEssentiels: ReponseDesignationOperateurServicesEssentiels;
};
export type CapsuleAppartenancePaysUnionEuropeenne = {
  AppartenancePaysUnionEuropeenne: ReponseAppartenancePaysUnionEuropeenne;
};
export type CapsuleStructure = {
  Structure: ReponseStructure<TypeStructure, CategorieTaille>;
};
export type CapsuleInformationsSecteur<T extends CategorieTaille> = {
  Structure: ReponseStructurePrivee<T> | ReponseStructurePublique<T>;
  InformationsSecteur: ReponseInformationsSecteur<T>;
};
export type CapsuleReponseDefinitions =
  | CapsuleDesignationOperateurServicesEssentiels
  | CapsuleAppartenancePaysUnionEuropeenne
  | CapsuleStructure
  | CapsuleInformationsSecteur<CategorieTaille>;
