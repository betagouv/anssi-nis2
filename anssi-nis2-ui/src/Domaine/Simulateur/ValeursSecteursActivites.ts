import { SecteurActivite } from "./SecteursActivite";
import { estUnSecteurSansDesSousSecteurs } from "./Operations/operationsSecteurs.ts";

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
export const ValeursSecteursSansSousSecteur: readonly SecteurActivite[] =
  ValeursSecteursActivites.filter(estUnSecteurSansDesSousSecteurs);

export const listeSecteursActiviteSaufAutre: readonly SecteurActivite[] =
  ValeursSecteursActivites.filter(
    (secteur) => secteur !== "autreSecteurActivite",
  );
