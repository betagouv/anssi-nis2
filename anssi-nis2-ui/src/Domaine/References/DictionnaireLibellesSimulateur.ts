import {
  DesignationOperateurServicesEssentiels,
  AppartenancePaysUnionEuropeenne,
  TrancheChiffreAffaire,
  TrancheNombreEmployes,
  TypeStructure,
} from "../Simulateur/ValeursChampsSimulateur.ts";
import { SecteurActivite } from "../Simulateur/SecteursActivite";

import { SousSecteurActivite } from "../Simulateur/SousSecteurs.ts";
import { Activite } from "../Simulateur/Activite.ts";

export type DictionnaireLibellesSimulateur = {
  activites: Record<Activite, string>;
  designeOSE: Record<DesignationOperateurServicesEssentiels, string>;
  etatMembre: Record<AppartenancePaysUnionEuropeenne, string>;
  secteurActivite: Record<SecteurActivite, string>;
  sousSecteurActivite: Record<SousSecteurActivite, string>;
  trancheCA: Record<TrancheChiffreAffaire, string>;
  trancheNombreEmployes: Record<TrancheNombreEmployes, string>;
  typeStructure: Record<TypeStructure, string>;
};
