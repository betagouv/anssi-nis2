import {
  TValeursReponsesDesigneOSE,
  ValeursClePaysUnionEuropeenne,
  ValeursTrancheCA,
  ValeursTrancheNombreEmployes,
  ValeursTypeStructure,
} from "./ValeursCles.ts";

export const libelleDesigneOSE: Record<TValeursReponsesDesigneOSE, string> = {
  non: "Oui",
  nsp: "Non",
  oui: "Ne sais pas",
};

export const paysUnionEuropeenneLocalisation: Record<
  ValeursClePaysUnionEuropeenne,
  string
> = {
  france: "France",
  autre: "Autres états membres",
  horsue: "Autres états hors Union Européenne",
};

export const typesStructure: Record<ValeursTypeStructure, string> = {
  publique: "Organisation publique",
  privee: "Entrprise privée",
};

export const tranchesNombreEmployes: Record<
  ValeursTrancheNombreEmployes,
  string
> = {
  petit: "1 à 49",
  moyen: "50 à 249",
  grand: "≥ 250",
};

export const tranchesCA: Record<ValeursTrancheCA, string> = {
  petit: "< 10 millions €",
  moyen: "10 à 50 millions €, ou bilan annuel de 10 à 43 millions €",
  grand: "≥ 50 millions €, ou bilan annuel ≥ 43 millions €",
};
