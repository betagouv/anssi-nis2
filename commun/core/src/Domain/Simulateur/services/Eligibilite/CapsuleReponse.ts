import {
  ReponseAppartenancePaysUnionEuropeenne,
  ReponseDesignationOperateurServicesEssentiels,
  ReponseInformationsSecteurGrand,
  ReponseInformationsSecteurPetit,
  ReponseStructure,
  ReponseStructureGrand,
  ReponseStructurePetit,
} from "./Reponse.definitions";

export type CapsuleDesignationOperateurServicesEssentiels = {
  DesignationOperateurServicesEssentiels: ReponseDesignationOperateurServicesEssentiels;
};
export type CapsuleAppartenancePaysUnionEuropeenne = {
  AppartenancePaysUnionEuropeenne: ReponseAppartenancePaysUnionEuropeenne;
};
export type CapsuleStructure = {
  Structure: ReponseStructure;
};
export type CapsuleInformationsSecteur =
  | {
      Structure: ReponseStructurePetit;
      InformationsSecteur: ReponseInformationsSecteurPetit;
    }
  | {
      Structure: ReponseStructureGrand;
      InformationsSecteur: ReponseInformationsSecteurGrand;
    };
export type CapsuleReponse =
  | CapsuleDesignationOperateurServicesEssentiels
  | CapsuleAppartenancePaysUnionEuropeenne
  | CapsuleStructure
  | CapsuleInformationsSecteur;
