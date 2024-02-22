import { RemoveTag, Tag } from "../../../../../../utils/types/Tag";
import {
  CapsuleAppartenancePaysUnionEuropeenne,
  CapsuleDesignationOperateurServicesEssentiels,
  CapsuleInformationsSecteur,
  CapsuleStructure,
} from "./CapsuleReponse";
import {
  ReponseInformationsSecteurPetit,
  ReponseStructurePetit,
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
    Structure: ReponseStructurePetit;
  };
export type ReponseEtatInformationsSecteurPetit = Tag<"InformationsSecteur"> &
  RemoveTag<ReponseEtatAppartenancePaysUnionEuropeenne> & {
    Structure: ReponseStructurePetit;
    InformationsSecteur: ReponseInformationsSecteurPetit;
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
