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
export type CapsuleInformationsSecteur =
  | {
      Structure:
        | ReponseStructurePrivee<"Petit">
        | ReponseStructurePublique<"Petit">;
      InformationsSecteur: ReponseInformationsSecteur<"Petit">;
    }
  | {
      Structure:
        | ReponseStructurePrivee<"Grand">
        | ReponseStructurePublique<"Grand">;
      InformationsSecteur: ReponseInformationsSecteur<"Grand">;
    };
export type CapsuleReponseDefinitions =
  | CapsuleDesignationOperateurServicesEssentiels
  | CapsuleAppartenancePaysUnionEuropeenne
  | CapsuleStructure
  | CapsuleInformationsSecteur;
