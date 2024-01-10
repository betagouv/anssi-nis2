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
import { Activites } from "./Activite.definitions";
import { ValeursNomChampsFormulaire } from "./DonneesFormulaire.valeurs";

export type NomsChampsSimulateur = (typeof ValeursNomChampsFormulaire)[number];

export interface DonneesFormulaireSimulateur
  extends Record<NomsChampsSimulateur, ValeurChampSimulateur[]> {
  activites: Activites[];
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
  DonneesFormulaireSimulateur,
  "secteurActivite" | "sousSecteurActivite"
>;
