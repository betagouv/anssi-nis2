import {
  ValeursActivitesConstructionVehiculesAutomobiles,
  ValeursActivitesEauPotable,
  ValeursActivitesEauUsees,
  ValeursActivitesElectricite,
  ValeursActivitesEspace,
  ValeursActivitesFabricationAutresMaterielTransports,
  ValeursActivitesFabricationDispositifsMedicaux,
  ValeursActivitesFabricationEquipementsElectroniques,
  ValeursActivitesFabricationMachinesEquipements,
  ValeursActivitesFabricationProductionDistributionProduitsChimiques,
  ValeursActivitesFabricationProduitsInformatiquesElectroniquesOptiques,
  ValeursActivitesFournisseursNumeriques,
  ValeursActivitesGaz,
  ValeursActivitesGestionDechets,
  ValeursActivitesGestionServicesTic,
  ValeursActivitesHydrogene,
  ValeursActivitesInfrastructureMarcheFinancier,
  ValeursActivitesInfrastructureNumerique,
  ValeursActivitesPetrole,
  ValeursActivitesProductionTransformationDistributionDenreesAlimentaires,
  ValeursActivitesRecherche,
  ValeursActivitesReseauxChaleurFroid,
  ValeursActivitesSante,
  ValeursActivitesSecteurBancaire,
  ValeursActivitesServicesPostauxExpedition,
  ValeursActivitesTransportsAeriens,
  ValeursActivitesTransportsFerroviaires,
  ValeursActivitesTransportsParEau,
  ValeursActivitesTransportsRoutiers,
} from "./Activite.valeurs";

export type ActivitesElectricite = (typeof ValeursActivitesElectricite)[number];
export type ActivitesReseauxChaleurFroid =
  (typeof ValeursActivitesReseauxChaleurFroid)[number];
export type ActivitesPetrole = (typeof ValeursActivitesPetrole)[number];
export type ActivitesGaz = (typeof ValeursActivitesGaz)[number];
export type ActivitesHydrogene = (typeof ValeursActivitesHydrogene)[number];
export type ActivitesEnergie =
  | ActivitesElectricite
  | ActivitesReseauxChaleurFroid
  | ActivitesPetrole
  | ActivitesGaz
  | ActivitesHydrogene;
export type ActivitesTransportsAeriens =
  (typeof ValeursActivitesTransportsAeriens)[number];
export type ActivitesTransportsFerroviaires =
  (typeof ValeursActivitesTransportsFerroviaires)[number];
export type ActivitesTransportsParEau =
  (typeof ValeursActivitesTransportsParEau)[number];
export type ActivitesTransportsRoutiers =
  (typeof ValeursActivitesTransportsRoutiers)[number];
export type ActivitesTransports =
  | ActivitesTransportsAeriens
  | ActivitesTransportsFerroviaires
  | ActivitesTransportsParEau
  | ActivitesTransportsRoutiers;
export type ActivitesSecteurBancaire =
  (typeof ValeursActivitesSecteurBancaire)[number];
export type ActivitesInfrastructureMarcheFinancier =
  (typeof ValeursActivitesInfrastructureMarcheFinancier)[number];
export type ActivitesSante = (typeof ValeursActivitesSante)[number];
export type ActivitesEauPotable = (typeof ValeursActivitesEauPotable)[number];
export type ActivitesEauUsees = (typeof ValeursActivitesEauUsees)[number];
export type ActivitesInfrastructureNumerique =
  (typeof ValeursActivitesInfrastructureNumerique)[number];
export type ActivitesGestionServicesTic =
  (typeof ValeursActivitesGestionServicesTic)[number];
export type ActivitesEspace = (typeof ValeursActivitesEspace)[number];
export type ActivitesServicesPostauxExpedition =
  (typeof ValeursActivitesServicesPostauxExpedition)[number];
export type ActivitesGestionDechets =
  (typeof ValeursActivitesGestionDechets)[number];
export type ActivitesFabricationProductionDistributionProduitsChimiques =
  (typeof ValeursActivitesFabricationProductionDistributionProduitsChimiques)[number];
export type ActivitesProductionTransformationDistributionDenreesAlimentaires =
  (typeof ValeursActivitesProductionTransformationDistributionDenreesAlimentaires)[number];
export type ActivitesFabricationDispositifsMedicaux =
  (typeof ValeursActivitesFabricationDispositifsMedicaux)[number];
export type ActivitesFabricationProduitsInformatiquesElectroniquesOptiques =
  (typeof ValeursActivitesFabricationProduitsInformatiquesElectroniquesOptiques)[number];
export type ActivitesFabricationEquipementsElectroniques =
  (typeof ValeursActivitesFabricationEquipementsElectroniques)[number];
export type ActivitesFabricationMachinesEquipements =
  (typeof ValeursActivitesFabricationMachinesEquipements)[number];
export type ActivitesConstructionVehiculesAutomobiles =
  (typeof ValeursActivitesConstructionVehiculesAutomobiles)[number];
export type ActivitesFabricationAutresMaterielTransports =
  (typeof ValeursActivitesFabricationAutresMaterielTransports)[number];
export type ActivitesFabrication =
  | ActivitesFabricationDispositifsMedicaux
  | ActivitesFabricationProduitsInformatiquesElectroniquesOptiques
  | ActivitesFabricationEquipementsElectroniques
  | ActivitesFabricationMachinesEquipements
  | ActivitesConstructionVehiculesAutomobiles
  | ActivitesFabricationAutresMaterielTransports;
export type ActivitesFournisseursNumeriques =
  (typeof ValeursActivitesFournisseursNumeriques)[number];
export type ActivitesRecherche = (typeof ValeursActivitesRecherche)[number];
export type Activite =
  // Annexe 1
  | ActivitesEnergie
  | ActivitesTransports
  | ActivitesSecteurBancaire
  | ActivitesInfrastructureMarcheFinancier
  | ActivitesSante
  | ActivitesEauPotable
  | ActivitesEauUsees
  | ActivitesInfrastructureNumerique
  | ActivitesGestionServicesTic
  | ActivitesEspace
  // Annexe 2
  | ActivitesServicesPostauxExpedition
  | ActivitesGestionDechets
  | ActivitesFabricationProductionDistributionProduitsChimiques
  | ActivitesProductionTransformationDistributionDenreesAlimentaires
  | ActivitesFabrication
  | ActivitesFournisseursNumeriques
  | ActivitesRecherche;

export type DescriptionActivite = {
  titre: string;
  description: string;
};
