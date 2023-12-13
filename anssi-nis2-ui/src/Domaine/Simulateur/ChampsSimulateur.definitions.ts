import { SousSecteurActivite } from "./SousSecteurActivite.definitions";
import { SecteurActivite } from "./SecteurActivite.definitions";
import {
  ValeursAppartenancePaysUnionEuropeenne,
  ValeursDesignationOperateurServicesEssentiels,
  ValeursOuiNon,
  ValeursPetitMoyenGrand,
  ValeursTypeEntitePublique,
  ValeursTypeStructure,
} from "./ChampsSimulateur.valeurs";
import { ValeursActivites } from "./Activite.definitions";

type UnionDe<T extends Readonly<Array<string>>> = T[number];

export type DesignationOperateurServicesEssentiels = UnionDe<
  typeof ValeursDesignationOperateurServicesEssentiels
>;
export type AppartenancePaysUnionEuropeenne = UnionDe<
  typeof ValeursAppartenancePaysUnionEuropeenne
>;
export type TypeStructure = UnionDe<typeof ValeursTypeStructure>;
export type TypeEntitePublique = UnionDe<typeof ValeursTypeEntitePublique>;
export type UnionPetitMoyenGrand = UnionDe<typeof ValeursPetitMoyenGrand>;
export type TrancheNombreEmployes = UnionPetitMoyenGrand;
export type TrancheChiffreAffaire = UnionPetitMoyenGrand;
export type FournitServicesUnionEuropeenne = UnionDe<typeof ValeursOuiNon>;
export type ValeurChampSimulateur =
  | DesignationOperateurServicesEssentiels
  | AppartenancePaysUnionEuropeenne
  | TypeStructure
  | TypeEntitePublique
  | TrancheChiffreAffaire
  | TrancheNombreEmployes
  | SecteurActivite
  | SousSecteurActivite
  | ValeursActivites
  | FournitServicesUnionEuropeenne;
