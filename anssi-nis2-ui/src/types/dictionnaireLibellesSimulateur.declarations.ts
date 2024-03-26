import { Activite } from "../../../commun/core/src/Domain/Simulateur/Activite.definitions.ts";
import {
  AppartenancePaysUnionEuropeenne,
  DesignationOperateurServicesEssentiels,
  TrancheChiffreAffaire,
  TrancheNombreEmployes,
  TypeEntitePublique,
  TypeStructure,
} from "../../../commun/core/src/Domain/Simulateur/ChampsSimulateur.definitions.ts";
import { SecteurActivite } from "../../../commun/core/src/Domain/Simulateur/SecteurActivite.definitions.ts";
import { SousSecteurActivite } from "../../../commun/core/src/Domain/Simulateur/SousSecteurActivite.definitions.ts";

export type DictionnaireLibellesSimulateur = {
  activites: Record<Activite, string>;
  designationOperateurServicesEssentiels: Record<
    DesignationOperateurServicesEssentiels,
    string
  >;
  appartenancePaysUnionEuropeenne: Record<
    AppartenancePaysUnionEuropeenne,
    string
  >;
  secteurActivite: Record<SecteurActivite, string>;
  sousSecteurActivite: Record<SousSecteurActivite, string>;
  trancheChiffreAffaire: Record<TrancheChiffreAffaire, string>;
  trancheNombreEmployes: Record<TrancheNombreEmployes, string>;
  typeStructure: Record<TypeStructure, string>;
  typeEntitePublique: Record<TypeEntitePublique, string>;
  localisationFournitureServicesNumeriques: Record<
    AppartenancePaysUnionEuropeenne,
    string
  >;
  paysDecisionsCyber: Record<AppartenancePaysUnionEuropeenne, string>;
  paysOperationsCyber: Record<AppartenancePaysUnionEuropeenne, string>;
  paysPlusGrandNombreSalaries: Record<AppartenancePaysUnionEuropeenne, string>;
};
