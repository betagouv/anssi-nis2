import {
  CategorieTaille,
  ReponseAppartenancePaysUnionEuropeenne,
  ReponseDesignationOperateurServicesEssentiels,
  ReponseInformationsSecteur,
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
