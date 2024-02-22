import { RemoveTag, Tag } from "../../../../../../utils/types/Tag";
import {
  CapsuleAppartenancePaysUnionEuropeenne,
  CapsuleDesignationOperateurServicesEssentiels,
  CapsuleInformationsSecteur,
  CapsuleStructure,
} from "./CapsuleReponse.definitions";
import {
  ReponseInformationsSecteur,
  ReponseStructurePrivee,
  ReponseStructurePublique,
} from "./Reponse.definitions";

export type ReponseEtatVide = Tag<"ReponseEtatVide">;
export type ReponseEtatDesignationOperateurServicesEssentiels =
  Tag<"DesignationOperateurServicesEssentiels"> &
    CapsuleDesignationOperateurServicesEssentiels;
export type ReponseEtatAppartenancePaysUnionEuropeenne =
  Tag<"AppartenancePaysUnionEuropeenne"> &
    RemoveTag<ReponseEtatDesignationOperateurServicesEssentiels> &
    CapsuleAppartenancePaysUnionEuropeenne;
export type ReponseEtatStructure = Tag<"Structure"> &
  RemoveTag<ReponseEtatAppartenancePaysUnionEuropeenne> &
  CapsuleStructure;
export type ReponseEtatStructurePetit = Tag<"Structure"> &
  RemoveTag<ReponseEtatAppartenancePaysUnionEuropeenne> & {
    Structure:
      | ReponseStructurePrivee<"Petit">
      | ReponseStructurePublique<"Petit">;
  };
export type ReponseEtatStructureGrand = Tag<"Structure"> &
  RemoveTag<ReponseEtatAppartenancePaysUnionEuropeenne> & {
    Structure:
      | ReponseStructurePrivee<"Grand">
      | ReponseStructurePublique<"Grand">;
  };
export type ReponseEtatInformationsSecteurPetit = Tag<"InformationsSecteur"> &
  RemoveTag<ReponseEtatAppartenancePaysUnionEuropeenne> & {
    Structure:
      | ReponseStructurePrivee<"Petit">
      | ReponseStructurePublique<"Petit">;
    InformationsSecteur: ReponseInformationsSecteur<"Petit">;
  };
export type ReponseEtatInformationsSecteurGrand = Tag<"InformationsSecteur"> &
  RemoveTag<ReponseEtatAppartenancePaysUnionEuropeenne> & {
    Structure:
      | ReponseStructurePrivee<"Grand">
      | ReponseStructurePublique<"Grand">;
    InformationsSecteur: ReponseInformationsSecteur<"Grand">;
  };
export type ReponseEtatInformationsSecteur = Tag<"InformationsSecteur"> &
  RemoveTag<ReponseEtatAppartenancePaysUnionEuropeenne> &
  CapsuleInformationsSecteur;
export type UnionReponseEtatNonVide =
  | ReponseEtatDesignationOperateurServicesEssentiels
  | ReponseEtatAppartenancePaysUnionEuropeenne
  | ReponseEtatStructure
  | ReponseEtatInformationsSecteur;
export type UnionReponseEtat = ReponseEtatVide | UnionReponseEtatNonVide;
