export const ValeursActivitesElectricite = [
  "acteurDuMarche",
  "entrepriseElectriciteRemplissantFonctionFourniture",
  "exploitantsPointRecharge",
  "gestionnaireReseau",
  "gestionnaireReseauTransportElectricite",
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
  "gestionnaireReseauTransportGaz",
  "gestionnaireInstallationStockage",
  "gestionnaireInstallationGNL",
  "autreActiviteGaz",
] as const;
export const ValeursActivitesHydrogene = [
  "exploitantsSystemeHydrogene",
  "autreActiviteHydrogene",
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
export const ValeursActivitesTransportsParEau = [
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
export const ValeursActivitesSecteurBancaire = [
  "etablissementCredit",
  "autreActiviteSecteurBancaire",
] as const;
export const ValeursActivitesInfrastructureMarcheFinancier = [
  "exploitantsPlateformesNegociation",
  "contrepartieCentrales",
  "autreActiviteInfrastructureMarcheFinancier",
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
  "autreActiviteEauxUsees",
] as const;

export const ValeursActivitesInfrastructureNumeriqueFournisseursCommElecPublics =
  [
    "fournisseurReseauxCommunicationElectroniquesPublics",
    "fournisseurServiceCommunicationElectroniquesPublics",
  ] as const;
export const ValeursActivitesInfrastructureNumeriqueFournisseursServices = [
  "fournisseurServicesInformatiqueNuage",
  "fournisseurServiceCentresDonnees",
  "fournisseurReseauxDiffusionContenu",
] as const;
export const ValeursActivitesInfrastructureNumeriquePointEchangeServicesConfiance =
  [
    "prestataireServiceConfianceQualifie",
    "prestataireServiceConfianceNonQualifie",
    "fournisseurPointEchangeInternet",
  ] as const;
export const ValeursActivitesInfrastructureNumeriqueDNSRegistreDomainePermierNiveau =
  ["registresNomsDomainesPremierNiveau", "fournisseurServicesDNS"] as const;

export const ValeursActivitesInfrastructureNumerique = [
  ...ValeursActivitesInfrastructureNumeriqueFournisseursCommElecPublics,
  ...ValeursActivitesInfrastructureNumeriqueFournisseursServices,
  ...ValeursActivitesInfrastructureNumeriquePointEchangeServicesConfiance,
  ...ValeursActivitesInfrastructureNumeriqueDNSRegistreDomainePermierNiveau,
  "fournisseurServicesEnregristrementNomDomaine",
  "autreActiviteInfrastructureNumerique",
] as const;

export const ValeursActivitesGestionServicesTic = [
  "fournisseurServicesGeres",
  "fournisseurServicesSecuriteGeres",
  "autreActiviteGestionServicesTic",
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
export const ValeursActivitesConstructionVehiculesAutomobiles = [
  "constructionVehiculesAutomobiles",
  "fabriquantCarrosseriesVehiculesAutomobiles",
  "fabriquantEquipementsAutomobiles",
  "autreActiviteConstructionVehiculesAutomobilesRemorquesSemi",
] as const;
export const ValeursActivitesFabricationAutresMaterielTransports = [
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
export const ValeursActivitesFournisseursNumeriques = [
  "fournisseursPlaceMarcheEnLigne",
  "fournisseursMoteursRechercheEnLigne",
  "fournisseursPlateformesServicesReseauxSociaux",
  "autreActiviteFournisseursNumeriques",
] as const;
export const ValeursActivitesRecherche = [
  "organismeRecherche",
  "autreActiviteRecherche",
] as const;
