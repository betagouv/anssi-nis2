import { RemoveTag, Tag } from "../../../../../../utils/types/Tag";
import { TypeStructure } from "../../ChampsSimulateur.definitions";
import {
  CapsuleAppartenancePaysUnionEuropeenne,
  CapsuleDesignationOperateurServicesEssentiels,
  CapsuleStructure,
} from "./CapsuleReponse.definitions";
import { CategorieTaille } from "./ReponseStructure.definitions";

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


