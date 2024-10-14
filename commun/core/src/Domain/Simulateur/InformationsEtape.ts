const typeEtapes = [
  "designationOperateurServicesEssentiels",
  "appartenanceUnionEuropeenne",
  "typeStructure",
  "tailleEntitePublique",
  "tailleEntitePrivee",
  "secteursActivite",
  "sousSecteursActivite",
  "activites",
  "localisationFournitureServicesNumeriques",
  "localisationEtablissementPrincipal",
  "prealable",
  "resultat",
  "inexistante",
  "variante",
] as const;
export type TypeEtape = (typeof typeEtapes)[number];
