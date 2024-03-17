export const ChampsFormulaireFacultatifs = [
  "typeEntitePublique",
  "trancheChiffreAffaire",
  "sousSecteurActivite",
  "activites",
  "fournitServicesUnionEuropeenne", // TODO : peut-être à supprimer
  "localisationRepresentant", // TODO : peut-être à supprimer
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
