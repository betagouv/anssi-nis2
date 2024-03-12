import { TypeStructure } from "../../ChampsSimulateur.definitions";
import { ReponseAppartenancePaysUnionEuropeenne } from "./ReponseAppartenancePaysUnionEuropeenne.definition";
import { ReponseDesignationOperateurServicesEssentiels } from "./ReponseDesignationOperateurServicesEssentiels.definitino";
import { ReponseInformationsSecteur } from "./ReponseInformationsSecteur.definitions";
import {
  CategorieTaille,
  ReponseStructure,
} from "./ReponseStructure.definitions";

export type CapsuleDesignationOperateurServicesEssentiels = {
  DesignationOperateurServicesEssentiels: ReponseDesignationOperateurServicesEssentiels;
};
export type CapsuleAppartenancePaysUnionEuropeenne = {
  AppartenancePaysUnionEuropeenne: ReponseAppartenancePaysUnionEuropeenne;
};
export type CapsuleStructure<
  Type extends TypeStructure = TypeStructure,
  Taille extends CategorieTaille = CategorieTaille,
> = {
  Structure: ReponseStructure<Type, Taille>;
};
export type CapsuleInformationsSecteur<T extends CategorieTaille> = {
  Structure: ReponseStructure<TypeStructure, T>;
  InformationsSecteur: ReponseInformationsSecteur<T>;
};
export type CapsuleReponseDefinitions =
  | CapsuleDesignationOperateurServicesEssentiels
  | CapsuleAppartenancePaysUnionEuropeenne
  | CapsuleStructure
  | CapsuleInformationsSecteur<CategorieTaille>;
