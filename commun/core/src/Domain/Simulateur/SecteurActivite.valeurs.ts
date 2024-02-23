export const ValeursSecteursActivites = [
  "administrationPublique",
  "banqueSecteurBancaire",
  "eauPotable",
  "eauxUsees",
  "energie",
  "espace",
  "fabrication",
  "fabricationProductionDistributionProduitsChimiques",
  "fournisseursNumeriques",
  "gestionDechets",
  "gestionServicesTic",
  "infrastructureMarchesFinanciers",
  "infrastructureNumerique",
  "productionTransformationDistributionDenreesAlimentaires",
  "recherche",
  "sante",
  "servicesPostauxExpedition",
  "transports",
  "autreSecteurActivite",
] as const;
export const ValeursSecteursAvecSousSecteurs = [
  "energie",
  "transports",
  "fabrication",
] as const;
export const ValeursSecteursNecessitantLocalisationRepresentant = [
  "gestionServicesTic",
  "fournisseursNumeriques",
  "infrastructureNumerique",
] as const;
export const ValeursSecteurAvecBesoinLocalisationRepresentantPetiteEntite = [
  "infrastructureNumerique",
] as const;
