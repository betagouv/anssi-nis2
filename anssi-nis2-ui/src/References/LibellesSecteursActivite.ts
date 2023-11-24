import { SecteurActivite } from "../../../anssi-nis2-domain/src/Simulateur/SecteurActivite.definitions.ts";

export const libellesSecteursActivite: Record<SecteurActivite, string> = {
  administrationPublique: "Administration publique / administration centrale",
  banqueSecteurBancaire: "Banques (secteur bancaire)",
  eauPotable: "Eau potable",
  eauxUsees: "Eaux usées",
  energie: "Énergie",
  espace: "Espace",
  fabrication: "Fabrication",
  fabricationProductionDistributionProduitsChimiques:
    "Fabrication, production et distribution de produits chimiques",
  fournisseursNumeriques: "Fournisseurs numériques",
  gestionDechets: "Gestion des déchets",
  gestionServicesTic: "Gestion des services TIC",
  infrastructureMarchesFinanciers: "Infrastructure des marchés financiers",
  infrastructureNumerique: "Infrastructure numérique",
  productionTransformationDistributionDenreesAlimentaires:
    "Production transformation et distribution de denrées alimentaires",
  recherche: "Recherche",
  sante: "Santé",
  servicesPostauxExpedition: "Services postaux et d'expédition",
  transports: "Transports",
  autreSecteurActivite: "Autre secteur d'activité",
};
