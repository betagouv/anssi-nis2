import {
  Activites,
  DesignationOperateurServicesEssentiels,
  AppartenancePaysUnionEuropeenne,
  TrancheChiffreAffaire,
  TrancheNombreEmployes,
  TypeStructure,
} from "../Simulateur/ValeursCles.ts";
import { SecteursActivites } from "../Simulateur/SecteursActivite";

import { SousSecteursActivites } from "../Simulateur/SousSecteurs.ts";

export type DictionnaireLibellesSimulateur = {
  activites: Record<Activites, string>;
  designeOSE: Record<DesignationOperateurServicesEssentiels, string>;
  etatMembre: Record<AppartenancePaysUnionEuropeenne, string>;
  secteurActivite: Record<SecteursActivites, string>;
  sousSecteurActivite: Record<SousSecteursActivites, string>;
  trancheCA: Record<TrancheChiffreAffaire, string>;
  trancheNombreEmployes: Record<TrancheNombreEmployes, string>;
  typeStructure: Record<TypeStructure, string>;
};
