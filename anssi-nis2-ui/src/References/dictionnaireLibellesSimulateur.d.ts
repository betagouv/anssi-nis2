import { ValeursActivites } from "../Domaine/Simulateur/Activite.definitions.ts";
import {
  AppartenancePaysUnionEuropeenne,
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
  designeOperateurServicesEssentiels: Record<
    DesignationOperateurServicesEssentiels,
    string
  >;
  etatMembre: Record<AppartenancePaysUnionEuropeenne, string>;
  secteurActivite: Record<SecteurActivite, string>;
  sousSecteurActivite: Record<SousSecteurActivite, string>;
  trancheCA: Record<TrancheChiffreAffaire, string>;
  trancheNombreEmployes: Record<TrancheNombreEmployes, string>;
  typeStructure: Record<TypeStructure, string>;
  typeEntitePublique: Record<TypeEntitePublique, string>;
};
