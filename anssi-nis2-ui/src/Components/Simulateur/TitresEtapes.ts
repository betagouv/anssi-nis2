import { TypeEtape } from "anssi-nis2-core/src/Domain/Simulateur/InformationsEtape.ts";

export const TitresEtapes: Partial<Record<TypeEtape, string>> = {
  activites: "Activités pratiquées",
  appartenanceUnionEuropeenne: "Localisation de l'activité",
  designationOperateurServicesEssentiels: "Désignation éventuelle",
  localisationEtablissementPrincipal: "Localisation de votre activité",
  localisationFournitureServicesNumeriques: "Localisation de votre activité",
  prealable: "Pour bien débuter",
  secteursActivite: "Secteurs d'activité",
  sousSecteursActivite: "Sous-secteurs d'activité",
  resultat: "Résultat",
  tailleEntitePrivee: "Taille de l'organisation",
  typeStructure: "Type de structure",
};
