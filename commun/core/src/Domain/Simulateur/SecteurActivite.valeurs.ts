export const ValeursSecteursAvecSousSecteurs = [
  "energie",
  "transports",
  "fabrication",
] as const;
export const ValeursSecteurAvecActivitesEssentielles = [
  "infrastructureNumerique",
] as const;
export const ValeursSecteursImportantsAvecBesoinLocalisation = [
  "gestionServicesTic",
  "fournisseursNumeriques",
] as const;
export const ValeursSecteursAvecBesoinLocalisationRepresentant = [
  ...ValeursSecteursImportantsAvecBesoinLocalisation,
  ...ValeursSecteurAvecActivitesEssentielles,
] as const;
export const ValeursSecteursActivites = [
  "administrationPublique",
  "banqueSecteurBancaire",
  "eauPotable",
  "eauxUsees",
  "espace",
  ...ValeursSecteursAvecSousSecteurs,
  "fabricationProductionDistributionProduitsChimiques",
  ...ValeursSecteursAvecBesoinLocalisationRepresentant,
  "gestionDechets",
  "infrastructureMarchesFinanciers",
  "productionTransformationDistributionDenreesAlimentaires",
  "recherche",
  "sante",
  "servicesPostauxExpedition",
  "transports",
  "autreSecteurActivite",
] as const;
