export type ValeursClePaysUnionEuropeenne = "france" | "autre" | "horsue";
export type ValeursTypeStructure = "publique" | "privee" | "association";
export type ValeursTrancheNombreEmployes = "petit" | "moyen" | "grand";
export type ValeursTrancheCA = "petit" | "moyen" | "grand";
export type ValeursSecteurActivite =
  | "administrationPublique"
  | "banqueSecteurBancaire"
  | "eauPotable"
  | "eauxUsees"
  | "energie"
  | "espace"
  | "fabrication"
  | "fabricationProductionEtDistributionDeProduitsChimiques"
  | "fournisseursNumeriques"
  | "gestionDesDechets"
  | "gestionDesServicesTic"
  | "infrastructureDesMarchesFinanciers"
  | "infrastructureNumerique"
  | "productionTransformationEtDistributionDeDenreesAlimentaires"
  | "recherche"
  | "sante"
  | "servicesPostauxEtDExpedition"
  | "transports"
  | "autre";
export type ValeursSousSecteurEnergie =
  | "electricite"
  | "gaz"
  | "hydrogene"
  | "petrole"
  | "reseauxDeChaleurEtDeFroid";
export type ValeursActivites = string;