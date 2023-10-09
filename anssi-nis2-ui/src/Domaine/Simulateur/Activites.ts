export const ValeursActivitesElectricite = [
  "acteurDuMarche",
  "entrepriseElectriciteRemplissantFonctionFourniture",
  "exploitantsPointRecharge",
  "gestionnaireReseau",
  "gestionnaireReseauTransport",
  "operateurDesigneMarcheOuNemo",
  "producteur",
  "autreActiviteElectricite",
] as const;
export type ActivitesElectricite = (typeof ValeursActivitesElectricite)[number];
export const ValeursActivitesReseauxChaleurFroid = [
  "operateurReseauChaleurFroid",
  "autreActiviteReseauxChaleurFroid",
] as const;
export type ActivitesReseauxChaleurFroid =
  (typeof ValeursActivitesReseauxChaleurFroid)[number];
export const ValeursActivitesPetrole = [
  "exploitantsOleoduc",
  "exploitantsInstallationPetrole",
  "entiteCentralesStockage",
  "autreActivitePetrole",
] as const;
export type ActivitesPetrole = (typeof ValeursActivitesPetrole)[number];
export const ValeursActivitesGaz = [
  "entrepriseFourniture",
  "gestionnaireReseauDistribution",
  "gestionnaireReseauTransport",
  "gestionnaireInstallationStockage",
  "gestionnaireInstallationGNL",
  "autreActiviteGaz",
] as const;
export type ActivitesGaz = (typeof ValeursActivitesGaz)[number];
export const ValeursActivitesHydrogene = [
  "exploitantsSystemeHydrogene",
  "autreActiviteHydrogene",
] as const;
export type ActivitesHydrogene = (typeof ValeursActivitesHydrogene)[number];
export const ValeursActivitesEnergie = [
  ...ValeursActivitesElectricite,
  ...ValeursActivitesReseauxChaleurFroid,
  ...ValeursActivitesPetrole,
  ...ValeursActivitesGaz,
  ...ValeursActivitesHydrogene,
] as const;
export type ActivitesEnergie =
  | ActivitesElectricite
  | ActivitesReseauxChaleurFroid
  | ActivitesPetrole
  | ActivitesGaz
  | ActivitesHydrogene;
export const ValeursActivitesTransportsAeriens = [
  "transporteursAeriensCommercial",
  "entiteGestionnaireAeroports",
  "serviceControleCirculationAerienne",
  "autreActiviteTransportsAeriens",
] as const;
export type ActivitesTransportsAeriens =
  (typeof ValeursActivitesTransportsAeriens)[number];
export const ValeursActivitesTransportsFerroviaires = [
  "gestionnaireInfrastructure",
  "entrepriseFerroviaire",
  "autreActiviteTransportsFerroviaires",
] as const;
export type ActivitesTransportsFerroviaires =
  (typeof ValeursActivitesTransportsFerroviaires)[number];
export const ValeursActivitesTransportsParEaux = [
  "societeTransportEaux",
  "entiteGestionnairePorts",
  "exploitantsServiceTrafficMaritime",
  "autreActiviteTransportsParEaux",
] as const;
export type ActivitesTransportsParEaux =
  (typeof ValeursActivitesTransportsParEaux)[number];
export const ValeursActivitesTransportsRoutiers = [
  "autoritesRoutieresControleGestionCirculation",
  "exploitantsSystemeTransportIntelligents",
  "autreActiviteTransportsRoutiers",
] as const;
export type ActivitesTransportsRoutiers =
  (typeof ValeursActivitesTransportsRoutiers)[number];
export const ValeursActivitesTransports = [
  ...ValeursActivitesTransportsAeriens,
  ...ValeursActivitesTransportsFerroviaires,
  ...ValeursActivitesTransportsParEaux,
  ...ValeursActivitesTransportsRoutiers,
] as const;
export type ActivitesTransports =
  | ActivitesTransportsAeriens
  | ActivitesTransportsFerroviaires
  | ActivitesTransportsParEaux
  | ActivitesTransportsRoutiers;
export const ValeursActivitesSecteurBancaire = [
  "etablissementCredit",
  "autreActiviteSecteurBancaire",
] as const;
export type ActivitesSecteurBancaire =
  (typeof ValeursActivitesSecteurBancaire)[number];
export const ValeursActivitesInfrastructureMarcheFinancier = [
  "exploitantsPlateformesNegociation",
  "contrepartieCentrales",
  "autreActiviteInfrastructureMarcheFinancie",
] as const;
export type ActivitesInfrastructureMarcheFinancier =
  (typeof ValeursActivitesInfrastructureMarcheFinancier)[number];
export const ValeursActivitesSante = [
  "prestataireSoinsSante",
  "laboratoireReferenceUE",
  "rechercheDeveloppementMedicament",
  "fabriquantProduitPreparationsPharmaceutiques",
  "fabriquantDispositifsMedicauxCritiques",
  "autreActiviteSante",
] as const;
export type ActivitesSante = (typeof ValeursActivitesSante)[number];
export const ValeursActivitesEauPotable = [
  "fournisseursDistributeursEauxConsommation",
  "autreActiviteEauPotable",
] as const;
export type ActivitesEauPotable = (typeof ValeursActivitesEauPotable)[number];
export const ValeursActivitesEauUsees = [
  "collectantEvacuantTraitantEaux",
  "autreActiviteEauPotable",
] as const;
export type ActivitesEauUsees = (typeof ValeursActivitesEauUsees)[number];
export const ValeursActivitesInfrastructureNumerique = [
  "fournisseurPointEchangeInternet",
  "fournisseurServicesDNS",
  "registresNomsDomainesPremierNiveau",
  "fournisseurServicesInformatiqueNuage",
  "fournisseurServiceCentresDonnees",
  "fournisseurReseauxDiffusionContenu",
  "prestataireServiceConfiance",
  "fournisseurReseauxCommunicationElectroniquesPublics",
  "fournisseurServiceCommunicationElectroniquesPublics",
  "autreActiviteInfrastructureNumerique",
] as const;
export type ActivitesInfrastructureNumerique =
  (typeof ValeursActivitesInfrastructureNumerique)[number];
export const ValeursActivitesGestionServicesTic = [
  "fournisseurServicesGeres",
  "fournisseurServicesSecuriteGeres",
  "autreActiviteGestionServicesTic",
] as const;
export type ActivitesGestionServicesTic =
  (typeof ValeursActivitesGestionServicesTic)[number];
export const ValeursActivitesAdministrationPublique = [
  "administrationPouvoirsPublicsCentraux",
  "administrationPubliqueNiveauRegional",
  "autreActiviteAdministrationPublique",
] as const;
export type ActivitesAdministrationPublique =
  (typeof ValeursActivitesAdministrationPublique)[number];
export const ValeursActivitesEspace = [
  "exploitantsInfrastructureTerrestresFournitureServicesSpaciaux",
  "autreActiviteEspace",
] as const;
export type ActivitesEspace = (typeof ValeursActivitesEspace)[number];
export const ValeursActivitesServicesPostauxExpedition = [
  "prestatairesServicesPostauxExpedition",
  "autreActiviteServicesPostauxExpedition",
] as const;
export type ActivitesServicesPostauxExpedition =
  (typeof ValeursActivitesServicesPostauxExpedition)[number];
export const ValeursActivitesGestionDechets = [
  "executantOperationGestionDechets",
  "autreActiviteGestionDechets",
] as const;
export type ActivitesGestionDechets =
  (typeof ValeursActivitesGestionDechets)[number];
export const ValeursActivitesFabricationProductionDistributionProduitsChimiques =
  [
    "fabricationDistributionSubstances",
    "autreActiviteFabricationProductionDistributionProduitsChimiques",
  ] as const;
export type ActivitesFabricationProductionDistributionProduitsChimiques =
  (typeof ValeursActivitesFabricationProductionDistributionProduitsChimiques)[number];
export const ValeursActivitesProductionTransformationDistributionDenreesAlimentaires =
  [
    "secteurAlimentaireDistributionGrosProductionTransformationIndustrielle",
    "autreActiviteProductionTransformationDistributionDenreesAlimentaires",
  ] as const;
export type ActivitesProductionTransformationDistributionDenreesAlimentaires =
  (typeof ValeursActivitesProductionTransformationDistributionDenreesAlimentaires)[number];
export const ValeursActivitesFabricationDispositifsMedicaux = [
  "fabriquantDispositifsMedicaux",
  "autreActiviteFabricationDispositifsMedicaux",
] as const;
export type ActivitesFabricationDispositifsMedicaux =
  (typeof ValeursActivitesFabricationDispositifsMedicaux)[number];
export const ValeursActivitesFabricationProduitsInformatiquesElectroniquesOptiques =
  [
    "fabriquantProduitsInformatiquesElectroniquesOptiques",
    "fabriquantComposantCartesElectroniques",
    "fabriquantOrdinateursEquipementsPeripheriques",
    "fabriquantEquipementCommunication",
    "fabriquantProduitsElectroniquesGrandPublic",
    "fabriquantInstrumentsMesureEssaiNavigationHorlogerie",
    "fabriquantEquipementIrradiationMedicaleElectromedicauxElectrotherapeutiques",
    "fabriquantMaterielOptiquePhotographiquesSupportsMagnetiquesOptiques",
    "autreActiviteFabricationProduitsInformatiquesElectroniquesOptiques",
  ] as const;
export type ActivitesFabricationProduitsInformatiquesElectroniquesOptiques =
  (typeof ValeursActivitesFabricationProduitsInformatiquesElectroniquesOptiques)[number];
export const ValeursActivitesFabricationEquipementsElectroniques = [
  "fabriquantMoteursGeneratriceTransformation",
  "fabriquantPilesAccumulateursElectriques",
  "fabriquantFilsCablesMaterielInstallationElectrique",
  "fabriquantAppareilEclairage",
  "fabriquantAppareilsMenagers",
  "autreActiviteFabricationEquipementsElectroniques",
] as const;
export type ActivitesFabricationEquipementsElectroniques =
  (typeof ValeursActivitesFabricationEquipementsElectroniques)[number];
export const ValeursActivitesFabricationMachinesEquipements = [
  "fabriquantMachineEquipementNCA",
  "fabriquantMachineUsageGeneral",
  "fabriquantAutresMachinesUsageGeneral",
  "fabriquantMachinesAgricolesForestieres",
  "fabriquantMachinesFormageMetauxMachinesOutils",
  "fabriquantAutresMachinesUsageSpecifiqueNCA",
  "autreActiviteFabricationMachinesEquipements",
] as const;
export type ActivitesFabricationMachinesEquipements =
  (typeof ValeursActivitesFabricationMachinesEquipements)[number];
export const ValeursActivitesConstructionVehiculesAutomobilesRemorquesSemi = [
  "constructionVehiculesAutomobiles",
  "fabriquantCarrosseriesVehiculesAutomobiles",
  "fabriquantEquipementsAutomobiles",
  "autreActiviteConstructionVehiculesAutomobilesRemorquesSemi",
] as const;
export type ActivitesConstructionVehiculesAutomobilesRemorquesSemi =
  (typeof ValeursActivitesConstructionVehiculesAutomobilesRemorquesSemi)[number];
export const ValeursActivitesFabricationAutreMaterielsTransports = [
  "constructionNavale",
  "constructionNaviresStructuresFlottantesCiviles",
  "constructionBateauxPlaisance",
  "constructionBateauxNaviresMilitaires",
  "constructionLocomotivesAutreMaterielFerroviaireRoulant",
  "constructionAeronautiqueSpatiale",
  "constructionVehiculeMilitaireCombat",
  "fabricationMaterielTransportNCA",
  "autreActiviteConstructionVehiculesAutomobilesRemorquesSemi",
] as const;
export type ActivitesFabricationAutreMaterielsTransports =
  (typeof ValeursActivitesFabricationAutreMaterielsTransports)[number];
export const ValeursActivitesFabrication = [
  ...ValeursActivitesFabricationDispositifsMedicaux,
  ...ValeursActivitesFabricationProduitsInformatiquesElectroniquesOptiques,
  ...ValeursActivitesFabricationEquipementsElectroniques,
  ...ValeursActivitesFabricationMachinesEquipements,
  ...ValeursActivitesConstructionVehiculesAutomobilesRemorquesSemi,
  ...ValeursActivitesFabricationAutreMaterielsTransports,
] as const;
export type ActivitesFabrication =
  | ActivitesFabricationDispositifsMedicaux
  | ActivitesFabricationProduitsInformatiquesElectroniquesOptiques
  | ActivitesFabricationEquipementsElectroniques
  | ActivitesFabricationMachinesEquipements
  | ActivitesConstructionVehiculesAutomobilesRemorquesSemi
  | ActivitesFabricationAutreMaterielsTransports;
export const ValeursActivitesFournisseursNumeriques = [
  "fournisseursPlaceMarcheEnLigne",
  "fournisseursMoteursRechercheEnLigne",
  "fournisseursPlateformesServicesReseauxSociaux",
  "autreActiviteFournisseursNumeriques",
] as const;
export type ActivitesFournisseursNumeriques =
  (typeof ValeursActivitesFournisseursNumeriques)[number];
export const ValeursActivitesRecherche = ["organismeRecherche"] as const;
export type ActivitesRecherche = (typeof ValeursActivitesRecherche)[number];
export type Activites =
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