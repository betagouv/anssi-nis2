import { SecteurActivite } from "./SecteurActivite.definitions.ts";
import { estUnSecteurSansDesSousSecteurs } from "./services/SecteurActivite/SecteurActivite.predicats.ts";

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
export const ValeursSecteursSansSousSecteur: SecteurActivite[] =
  ValeursSecteursActivites.filter(estUnSecteurSansDesSousSecteurs);
