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
export const ValeursActivitesReseauxChaleurFroid = [
  "operateurReseauChaleurFroid",
  "autreActiviteReseauxChaleurFroid",
] as const;
export const ValeursActivitesPetrole = [
  "exploitantsOleoduc",
  "exploitantsInstallationPetrole",
  "entiteCentralesStockage",
  "autreActivitePetrole",
] as const;
export const ValeursActivitesGaz = [
  "entrepriseFourniture",
  "gestionnaireReseauDistribution",
  "gestionnaireReseauTransport",
  "gestionnaireInstallationStockage",
  "gestionnaireInstallationGNL",
  "autreActiviteGaz",
] as const;
export const ValeursActivitesHydrogene = [
  "exploitantsSystemeHydrogene",
  "autreActiviteHydrogene",
] as const;
export const ValeursActivitesEnergie = [
  ...ValeursActivitesElectricite,
  ...ValeursActivitesReseauxChaleurFroid,
  ...ValeursActivitesPetrole,
  ...ValeursActivitesGaz,
  ...ValeursActivitesHydrogene,
] as const;
export const ValeursActivitesTransportsAeriens = [
  "transporteursAeriensCommercial",
  "entiteGestionnaireAeroports",
  "serviceControleCirculationAerienne",
  "autreActiviteTransportsAeriens",
] as const;
export const ValeursActivitesTransportsFerroviaires = [
  "gestionnaireInfrastructure",
  "entrepriseFerroviaire",
  "autreActiviteTransportsFerroviaires",
] as const;
export const ValeursActivitesTransportsParEaux = [
  "societeTransportEaux",
  "entiteGestionnairePorts",
  "exploitantsServiceTrafficMaritime",
  "autreActiviteTransportsParEaux",
] as const;
export const ValeursActivitesTransportsRoutiers = [
  "autoritesRoutieresControleGestionCirculation",
  "exploitantsSystemeTransportIntelligents",
  "autreActiviteTransportsRoutiers",
] as const;
export const ValeursActivitesTransports = [
  ...ValeursActivitesTransportsAeriens,
  ...ValeursActivitesTransportsFerroviaires,
  ...ValeursActivitesTransportsParEaux,
  ...ValeursActivitesTransportsRoutiers,
] as const;
export const ValeursActivitesSecteurBancaire = [
  "etablissementCredit",
  "autreActiviteSecteurBancaire",
] as const;
export const ValeursActivitesInfrastructureMarcheFinancier = [
  "exploitantsPlateformesNegociation",
  "contrepartieCentrales",
  "autreActiviteInfrastructureMarcheFinancie",
] as const;
export const ValeursActivitesSante = [
  "prestataireSoinsSante",
  "laboratoireReferenceUE",
  "rechercheDeveloppementMedicament",
  "fabriquantProduitPreparationsPharmaceutiques",
  "fabriquantDispositifsMedicauxCritiques",
  "autreActiviteSante",
] as const;
export const ValeursActivitesEauPotable = [
  "fournisseursDistributeursEauxConsommation",
  "autreActiviteEauPotable",
] as const;
export const ValeursActivitesEauUsees = [
  "collectantEvacuantTraitantEaux",
  "autreActiviteEauPotable",
] as const;
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
export const ValeursActivitesGestionServicesTic = [
  "fournisseurServicesGeres",
  "fournisseurServicesSecuriteGeres",
  "autreActiviteGestionServicesTic",
] as const;
export const ValeursActivitesAdministrationPublique = [
  "administrationPouvoirsPublicsCentraux",
  "administrationPubliqueNiveauRegional",
  "autreActiviteAdministrationPublique",
] as const;
export const ValeursActivitesEspace = [
  "exploitantsInfrastructureTerrestresFournitureServicesSpaciaux",
  "autreActiviteEspace",
] as const;
export const ValeursActivitesServicesPostauxExpedition = [
  "prestatairesServicesPostauxExpedition",
  "autreActiviteServicesPostauxExpedition",
] as const;
export const ValeursActivitesGestionDechets = [
  "executantOperationGestionDechets",
  "autreActiviteGestionDechets",
] as const;
export const ValeursActivitesFabricationProductionDistributionProduitsChimiques =
  [
    "fabricationDistributionSubstances",
    "autreActiviteFabricationProductionDistributionProduitsChimiques",
  ] as const;
export const ValeursActivitesProductionTransformationDistributionDenreesAlimentaires =
  [
    "secteurAlimentaireDistributionGrosProductionTransformationIndustrielle",
    "autreActiviteProductionTransformationDistributionDenreesAlimentaires",
  ] as const;
export const ValeursActivitesFabricationDispositifsMedicaux = [
  "fabriquantDispositifsMedicaux",
  "autreActiviteFabricationDispositifsMedicaux",
] as const;
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
export const ValeursActivitesFabricationEquipementsElectroniques = [
  "fabriquantMoteursGeneratriceTransformation",
  "fabriquantPilesAccumulateursElectriques",
  "fabriquantFilsCablesMaterielInstallationElectrique",
  "fabriquantAppareilEclairage",
  "fabriquantAppareilsMenagers",
  "autreActiviteFabricationEquipementsElectroniques",
] as const;
export const ValeursActivitesFabricationMachinesEquipements = [
  "fabriquantMachineEquipementNCA",
  "fabriquantMachineUsageGeneral",
  "fabriquantAutresMachinesUsageGeneral",
  "fabriquantMachinesAgricolesForestieres",
  "fabriquantMachinesFormageMetauxMachinesOutils",
  "fabriquantAutresMachinesUsageSpecifiqueNCA",
  "autreActiviteFabricationMachinesEquipements",
] as const;
export const ValeursActivitesConstructionVehiculesAutomobilesRemorquesSemi = [
  "constructionVehiculesAutomobiles",
  "fabriquantCarrosseriesVehiculesAutomobiles",
  "fabriquantEquipementsAutomobiles",
  "autreActiviteConstructionVehiculesAutomobilesRemorquesSemi",
] as const;
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
export const ValeursActivitesFabrication = [
  ...ValeursActivitesFabricationDispositifsMedicaux,
  ...ValeursActivitesFabricationProduitsInformatiquesElectroniquesOptiques,
  ...ValeursActivitesFabricationEquipementsElectroniques,
  ...ValeursActivitesFabricationMachinesEquipements,
  ...ValeursActivitesConstructionVehiculesAutomobilesRemorquesSemi,
  ...ValeursActivitesFabricationAutreMaterielsTransports,
] as const;
export const ValeursActivitesFournisseursNumeriques = [
  "fournisseursPlaceMarcheEnLigne",
  "fournisseursMoteursRechercheEnLigne",
  "fournisseursPlateformesServicesReseauxSociaux",
  "autreActiviteFournisseursNumeriques",
] as const;
export const ValeursActivitesRecherche = ["organismeRecherche"] as const;
export const ValeursActivites =
  // Annexe 1
  [
    ...ValeursActivitesEnergie,
    ...ValeursActivitesTransports,
    ...ValeursActivitesSecteurBancaire,
    ...ValeursActivitesInfrastructureMarcheFinancier,
    ...ValeursActivitesSante,
    ...ValeursActivitesEauPotable,
    ...ValeursActivitesEauUsees,
    ...ValeursActivitesInfrastructureNumerique,
    ...ValeursActivitesGestionServicesTic,
    ...ValeursActivitesAdministrationPublique,
    ...ValeursActivitesEspace,
    // Annexe 2
    ...ValeursActivitesServicesPostauxExpedition,
    ...ValeursActivitesGestionDechets,
    ...ValeursActivitesFabricationProductionDistributionProduitsChimiques,
    ...ValeursActivitesProductionTransformationDistributionDenreesAlimentaires,
    ...ValeursActivitesFabrication,
    ...ValeursActivitesFournisseursNumeriques,
    ...ValeursActivitesRecherche,
  ];
