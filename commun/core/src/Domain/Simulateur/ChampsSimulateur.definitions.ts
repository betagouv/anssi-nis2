import { UnionDe } from "../../../../utils/types/UnionDe";
import { Activite } from "./Activite.definitions";
import {
  ValeursappartenancePaysUnionEuropeenne,
  ValeursDesignationOperateurServicesEssentiels,
  ValeursOuiNon,
  ValeursPetitMoyenGrand,
  ValeursTypeEntitePublique,
  ValeursTypeStructure,
} from "./ChampsSimulateur.valeurs";
import { SecteurActivite } from "./SecteurActivite.definitions";
import { SousSecteurActivite } from "./SousSecteurActivite.definitions";

export type DesignationOperateurServicesEssentiels = UnionDe<
  typeof ValeursDesignationOperateurServicesEssentiels
>;
export type AppartenancePaysUnionEuropeenne = UnionDe<
  typeof ValeursappartenancePaysUnionEuropeenne
>;
export type TypeStructure = UnionDe<typeof ValeursTypeStructure>;
export type TypeEntitePublique = UnionDe<typeof ValeursTypeEntitePublique>;
export type UnionPetitMoyenGrand = UnionDe<typeof ValeursPetitMoyenGrand>;
export type TrancheNombreEmployes = UnionPetitMoyenGrand;
export type TrancheChiffreAffaire = UnionPetitMoyenGrand;
export type TrancheBilanFinancier = UnionPetitMoyenGrand;
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
  | Activite
  | FournitServicesUnionEuropeenne;
