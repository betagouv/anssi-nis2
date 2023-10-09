import {
  TValeursActivites,
  TValeursReponsesDesigneOSE,
  TValeursSecteursActivites,
  TValeursSousSecteursActivites,
  ValeursClePaysUnionEuropeenne,
  ValeursTrancheCA,
  ValeursTrancheNombreEmployes,
  ValeursTypeStructure,
} from "../Simulateur/ValeursCles.ts";

export type DictionnaireLibellesSimulateur = {
  activites: Record<TValeursActivites, string>;
  designeOSE: Record<TValeursReponsesDesigneOSE, string>;
  etatMembre: Record<ValeursClePaysUnionEuropeenne, string>;
  secteurActivite: Record<TValeursSecteursActivites, string>;
  sousSecteurActivite: Record<TValeursSousSecteursActivites, string>;
  trancheCA: Record<ValeursTrancheCA, string>;
  trancheNombreEmployes: Record<ValeursTrancheNombreEmployes, string>;
  typeStructure: Record<ValeursTypeStructure, string>;
};
