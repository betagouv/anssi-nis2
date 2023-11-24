import {
  ValeursActivitesAdministrationPublique,
  ValeursActivitesConstructionVehiculesAutomobilesRemorquesSemi,
  ValeursActivitesEauPotable,
  ValeursActivitesEauUsees,
  ValeursActivitesElectricite,
  ValeursActivitesEspace,
  ValeursActivitesFabricationAutreMaterielsTransports,
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
  ValeursActivitesTransportsParEaux,
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
export type ActivitesTransportsParEaux =
  (typeof ValeursActivitesTransportsParEaux)[number];
export type ActivitesTransportsRoutiers =
  (typeof ValeursActivitesTransportsRoutiers)[number];
export type ActivitesTransports =
  | ActivitesTransportsAeriens
  | ActivitesTransportsFerroviaires
  | ActivitesTransportsParEaux
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
export type ActivitesAdministrationPublique =
  (typeof ValeursActivitesAdministrationPublique)[number];
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
export type ActivitesConstructionVehiculesAutomobilesRemorquesSemi =
  (typeof ValeursActivitesConstructionVehiculesAutomobilesRemorquesSemi)[number];
export type ActivitesFabricationAutreMaterielsTransports =
  (typeof ValeursActivitesFabricationAutreMaterielsTransports)[number];
export type ActivitesFabrication =
  | ActivitesFabricationDispositifsMedicaux
  | ActivitesFabricationProduitsInformatiquesElectroniquesOptiques
  | ActivitesFabricationEquipementsElectroniques
  | ActivitesFabricationMachinesEquipements
  | ActivitesConstructionVehiculesAutomobilesRemorquesSemi
  | ActivitesFabricationAutreMaterielsTransports;
export type ActivitesFournisseursNumeriques =
  (typeof ValeursActivitesFournisseursNumeriques)[number];
export type ActivitesRecherche = (typeof ValeursActivitesRecherche)[number];
export type ValeursActivites =
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
  | ActivitesAdministrationPublique
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
