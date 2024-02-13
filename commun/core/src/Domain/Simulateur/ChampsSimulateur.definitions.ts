import { SousSecteurActivite } from "./SousSecteurActivite.definitions";
import { SecteurActivite } from "./SecteurActivite.definitions";
import {
  ValeursappartenancePaysUnionEuropeenne,
  ValeursDesignationOperateurServicesEssentiels,
  ValeursOuiNon,
  ValeursPetitMoyenGrand,
  ValeursTypeEntitePublique,
  ValeursTypeStructure,
} from "./ChampsSimulateur.valeurs";
import { Activite } from "./Activite.definitions";

type UnionDe<T extends Readonly<Array<string>>> = T[number];

export type DesignationOperateurServicesEssentiels = UnionDe<
  typeof ValeursDesignationOperateurServicesEssentiels
>;
export type appartenancePaysUnionEuropeenne = UnionDe<
  typeof ValeursappartenancePaysUnionEuropeenne
>;
export type TypeStructure = UnionDe<typeof ValeursTypeStructure>;
export type TypeEntitePublique = UnionDe<typeof ValeursTypeEntitePublique>;
export type UnionPetitMoyenGrand = UnionDe<typeof ValeursPetitMoyenGrand>;
export type TrancheNombreEmployes = UnionPetitMoyenGrand;
export type TrancheChiffreAffaire = UnionPetitMoyenGrand;
export type FournitServicesUnionEuropeenne = UnionDe<typeof ValeursOuiNon>;
export type ValeurChampSimulateur =
  | DesignationOperateurServicesEssentiels
  | appartenancePaysUnionEuropeenne
  | TypeStructure
  | TypeEntitePublique
  | TrancheChiffreAffaire
  | TrancheNombreEmployes
  | SecteurActivite
  | SousSecteurActivite
  | Activite
  | FournitServicesUnionEuropeenne;
