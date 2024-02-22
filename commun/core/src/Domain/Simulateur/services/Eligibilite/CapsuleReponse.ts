import {
  CategorieTaille,
  ReponseAppartenancePaysUnionEuropeenne,
  ReponseDesignationOperateurServicesEssentiels,
  ReponseInformationsSecteurGrand,
  ReponseInformationsSecteurPetit,
  ReponseStructure,
  ReponseStructurePrivee,
  ReponseStructurePublique,
} from "./Reponse.definitions";

export type CapsuleDesignationOperateurServicesEssentiels = {
  DesignationOperateurServicesEssentiels: ReponseDesignationOperateurServicesEssentiels;
};
export type CapsuleAppartenancePaysUnionEuropeenne = {
  AppartenancePaysUnionEuropeenne: ReponseAppartenancePaysUnionEuropeenne;
};
export type CapsuleStructure = {
  Structure: ReponseStructure<CategorieTaille>;
};
export type CapsuleInformationsSecteur =
  | {
      Structure:
        | ReponseStructurePrivee<"Petit">
        | ReponseStructurePublique<"Petit">;
      InformationsSecteur: ReponseInformationsSecteurPetit;
    }
  | {
      Structure:
        | ReponseStructurePrivee<"Grand">
        | ReponseStructurePublique<"Grand">;
      InformationsSecteur: ReponseInformationsSecteurGrand;
    };
export type CapsuleReponse =
  | CapsuleDesignationOperateurServicesEssentiels
  | CapsuleAppartenancePaysUnionEuropeenne
  | CapsuleStructure
  | CapsuleInformationsSecteur;
