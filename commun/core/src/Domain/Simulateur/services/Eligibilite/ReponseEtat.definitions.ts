import { RemoveTag, Tag } from "../../../../../../utils/types/Tag";
import { TypeStructure } from "../../ChampsSimulateur.definitions";
import {
  CapsuleAppartenancePaysUnionEuropeenne,
  CapsuleDesignationOperateurServicesEssentiels,
  CapsuleInformationsSecteur,
  CapsuleStructure,
} from "./CapsuleReponse.definitions";
import { ReponseInformationsSecteur } from "./ReponseInformationsSecteur.definitions";
import {
  CategorieTaille,
  ReponseStructure,
} from "./ReponseStructure.definitions";

export type ReponseEtatVide = Tag<"ReponseEtatVide">;
export type ReponseEtatDesignationOperateurServicesEssentiels =
  Tag<"DesignationOperateurServicesEssentiels"> &
    CapsuleDesignationOperateurServicesEssentiels;
export type ReponseEtatAppartenancePaysUnionEuropeenne =
  Tag<"AppartenancePaysUnionEuropeenne"> &
    RemoveTag<ReponseEtatDesignationOperateurServicesEssentiels> &
    CapsuleAppartenancePaysUnionEuropeenne;
export type ReponseEtatStructure<
  Type extends TypeStructure = TypeStructure,
  Taille extends CategorieTaille = CategorieTaille,
> = Tag<"Structure"> &
  RemoveTag<ReponseEtatAppartenancePaysUnionEuropeenne> &
  CapsuleStructure<Type, Taille>;

export type ReponseEtatInformationsSecteurPetit = Tag<"InformationsSecteur"> &
  RemoveTag<ReponseEtatAppartenancePaysUnionEuropeenne> & {
    Structure: ReponseStructure<TypeStructure, "Petit">;
    InformationsSecteur: ReponseInformationsSecteur<"Petit">;
  };
export type ReponseEtatInformationsSecteurGrand = Tag<"InformationsSecteur"> &
  RemoveTag<ReponseEtatAppartenancePaysUnionEuropeenne> & {
    Structure: ReponseStructure<TypeStructure, "Grand">;
    InformationsSecteur: ReponseInformationsSecteur<"Grand">;
  };

export type ReponseEtatInformationsSecteur<
  T extends CategorieTaille = CategorieTaille,
> = Tag<"InformationsSecteur"> &
  RemoveTag<ReponseEtatAppartenancePaysUnionEuropeenne> &
  CapsuleInformationsSecteur<T>;

export type UnionReponseEtatNonVide =
  | ReponseEtatDesignationOperateurServicesEssentiels
  | ReponseEtatAppartenancePaysUnionEuropeenne
  | ReponseEtatStructure
  | ReponseEtatInformationsSecteur;
export type UnionReponseEtat = ReponseEtatVide | UnionReponseEtatNonVide;
