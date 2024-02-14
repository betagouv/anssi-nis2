import { FournitServicesUnionEuropeenne } from "../../../commun/core/src/Domain/Simulateur/ChampsSimulateur.definitions.ts";
import { ValeursActivites } from "../Domaine/Simulateur/Activite.definitions.ts";
import {
  appartenancePaysUnionEuropeenne,
  DesignationOperateurServicesEssentiels,
  TrancheChiffreAffaire,
  TrancheNombreEmployes,
  TypeEntitePublique,
  TypeStructure,
} from "../Domaine/Simulateur/ChampsSimulateur.definitions.ts";
import { SecteurActivite } from "../Domaine/Simulateur/SecteurActivite.definitions.ts";
import { SousSecteurActivite } from "../Domaine/Simulateur/SousSecteurActivite.definitions.ts";

export type DictionnaireLibellesSimulateur = {
  activites: Record<ValeursActivites, string>;
  designationOperateurServicesEssentiels: Record<
    DesignationOperateurServicesEssentiels,
    string
  >;
  appartenancePaysUnionEuropeenne: Record<
    appartenancePaysUnionEuropeenne,
    string
  >;
  secteurActivite: Record<SecteurActivite, string>;
  sousSecteurActivite: Record<SousSecteurActivite, string>;
  trancheChiffreAffaire: Record<TrancheChiffreAffaire, string>;
  trancheNombreEmployes: Record<TrancheNombreEmployes, string>;
  typeStructure: Record<TypeStructure, string>;
  typeEntitePublique: Record<TypeEntitePublique, string>;
  fournitServicesUnionEuropeenne: Record<
    FournitServicesUnionEuropeenne,
    string
  >;
  localisationRepresentant: Record<appartenancePaysUnionEuropeenne, string>;
};
