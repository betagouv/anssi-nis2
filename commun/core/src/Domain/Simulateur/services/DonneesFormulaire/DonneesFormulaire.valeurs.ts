export const ChampsFormulaireFacultatifs = [
  "typeEntitePublique",
  "trancheChiffreAffaire",
  "sousSecteurActivite",
  "activites",
  "localisationFournitureServicesNumeriques",
  "paysDecisionsCyber",
  "paysOperationsCyber",
  "paysPlusGrandNombreSalaries",
] as const;

export const ValeursNomChampsFormulaire = [
  "designationOperateurServicesEssentiels",
  "appartenancePaysUnionEuropeenne",
  "typeStructure",
  "trancheNombreEmployes",
  "secteurActivite",
  ...ChampsFormulaireFacultatifs,
] as const;
