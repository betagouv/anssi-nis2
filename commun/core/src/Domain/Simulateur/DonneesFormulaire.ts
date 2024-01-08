import { SecteurActivite } from "./SecteurActivite.definitions";
import { SousSecteurActivite } from "./SousSecteurActivite.definitions";
import {
  AppartenancePaysUnionEuropeenne,
  DesignationOperateurServicesEssentiels,
  FournitServicesUnionEuropeenne,
  TrancheChiffreAffaire,
  TrancheNombreEmployes,
  TypeEntitePublique,
  TypeStructure,
  ValeurChampSimulateur,
} from "./ChampsSimulateur.definitions";
import { ValeursActivites } from "./Activite.definitions";
import { ValeursNomChampsFormulaire } from "./DonneesFormulaire.valeurs";

export type NomsChampsSimulateur = (typeof ValeursNomChampsFormulaire)[number];

export interface IDonneesBrutesFormulaireSimulateur
  extends Record<NomsChampsSimulateur, ValeurChampSimulateur[]> {
  activites: ValeursActivites[];
  designeOperateurServicesEssentiels: DesignationOperateurServicesEssentiels[];
  etatMembre: AppartenancePaysUnionEuropeenne[];
  secteurActivite: SecteurActivite[];
  sousSecteurActivite: SousSecteurActivite[];
  trancheCA: TrancheChiffreAffaire[];
  trancheNombreEmployes: TrancheNombreEmployes[];
  typeStructure: TypeStructure[];
  typeEntitePublique: TypeEntitePublique[];
  fournitServicesUnionEuropeenne: FournitServicesUnionEuropeenne[];
  localisationRepresentant: AppartenancePaysUnionEuropeenne[];
}

export type DonneesSectorielles = Pick<
  IDonneesBrutesFormulaireSimulateur,
  "secteurActivite" | "sousSecteurActivite"
>;
