export const ValeursSecteursComposites = [
  "energie",
  "transports",
  "fabrication",
] as const;

export const ValeursSecteursActivitesAnnexe1 = [
  "energie",
  "transports",
  "banqueSecteurBancaire",
  "infrastructureMarchesFinanciers",
  "sante",
  "eauPotable",
  "eauxUsees",
  "infrastructureNumerique",
  "gestionServicesTic",
  "espace",
] as const;
export const ValeursSecteursActivitesAnnexe2 = [
  "servicesPostauxExpedition",
  "gestionDechets",
  "fabricationProductionDistributionProduitsChimiques",
  "productionTransformationDistributionDenreesAlimentaires",
  "fabrication",
  "fournisseursNumeriques",
  "recherche",
] as const;

export const ValeursSecteursActivites = [
  ...ValeursSecteursActivitesAnnexe1,
  ...ValeursSecteursActivitesAnnexe2,
  "autreSecteurActivite",
] as const;
