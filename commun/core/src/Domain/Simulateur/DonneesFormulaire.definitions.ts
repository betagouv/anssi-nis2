import { Activite } from "./Activite.definitions";
import {
  appartenancePaysUnionEuropeenne,
  DesignationOperateurServicesEssentiels,
  FournitServicesUnionEuropeenne,
  TrancheChiffreAffaire,
  TrancheNombreEmployes,
  TypeEntitePublique,
  TypeStructure,
  ValeurChampSimulateur,
} from "./ChampsSimulateur.definitions";
import { ValeursNomChampsFormulaire } from "./DonneesFormulaire.valeurs";
import { SecteurActivite } from "./SecteurActivite.definitions";
import { SousSecteurActivite } from "./SousSecteurActivite.definitions";

export type NomsChampsSimulateur = (typeof ValeursNomChampsFormulaire)[number];

export interface DonneesFormulaireSimulateur
  extends Record<NomsChampsSimulateur, ValeurChampSimulateur[]> {
  activites: Activite[];
  designationOperateurServicesEssentiels: DesignationOperateurServicesEssentiels[];
  appartenancePaysUnionEuropeenne: appartenancePaysUnionEuropeenne[];
  secteurActivite: SecteurActivite[];
  sousSecteurActivite: SousSecteurActivite[];
  trancheChiffreAffaire: TrancheChiffreAffaire[];
  trancheNombreEmployes: TrancheNombreEmployes[];
  typeStructure: TypeStructure[];
  typeEntitePublique: TypeEntitePublique[];
  fournitServicesUnionEuropeenne: FournitServicesUnionEuropeenne[];
  localisationRepresentant: appartenancePaysUnionEuropeenne[];
}

export type DonneesSectorielles = Pick<
  DonneesFormulaireSimulateur,
  "secteurActivite" | "sousSecteurActivite"
>;

export type PredicatDonneesFormulaireSimulateur = (
  d: DonneesFormulaireSimulateur,
) => boolean;

type PredicatsSurChamp<C extends NomsChampsSimulateur> = {
  contient: <T extends DonneesFormulaireSimulateur[C][number]>(
    valeur: T,
  ) => (donnees: DonneesFormulaireSimulateur) => boolean;
  est: <T extends DonneesFormulaireSimulateur[C]>(
    valeurs: T,
  ) => (d: DonneesFormulaireSimulateur) => boolean;
  satisfait: (
    f: <T extends DonneesFormulaireSimulateur[C]>(valeurs: T) => boolean,
  ) => (d: DonneesFormulaireSimulateur) => boolean;
};
export type FabriquePredicatChamp = <C extends NomsChampsSimulateur>(
  champ: C,
) => PredicatsSurChamp<C>;
export type ChampsAvecPredicats = {
  [K in NomsChampsSimulateur]: PredicatsSurChamp<K>;
};
