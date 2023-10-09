import { TValeursSecteursAvecSousSecteurs } from "./SousSecteurs.ts";

export const ValeursReponsesDesigneOSE = ["oui", "non", "nsp"] as const;
export type TValeursReponsesDesigneOSE =
  (typeof ValeursReponsesDesigneOSE)[number];
export type ValeursClePaysUnionEuropeenne = "france" | "autre" | "horsue";
export type ValeursTypeStructure = "publique" | "privee";
export type ValeursTrancheNombreEmployes = "petit" | "moyen" | "grand";
export type ValeursTrancheCA = "petit" | "moyen" | "grand";
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
export type TValeursSecteursActivites =
  (typeof ValeursSecteursActivites)[number];
export const ValeursSousSecteurEnergie = [
  "electricite",
  "gaz",
  "hydrogene",
  "petrole",
  "reseauxChaleurFroid",
  "autreSousSecteurEnergie",
] as const;
export type TValeursSousSecteurEnergie =
  (typeof ValeursSousSecteurEnergie)[number];

export const ValeursSousSecteurTransport = [
  "transportsAeriens",
  "transportsFerroviaires",
  "transportsParEau",
  "transportsRoutiers",
  "autreSousSecteurTransport",
] as const;
export type TValeursSousSecteurTransport =
  (typeof ValeursSousSecteurTransport)[number];

export const ValeursSousSecteurFabrication = [
  "fabricationDispositifsMedicaux",
  "fabricationEquipementsElectroniques",
  "fabricationFabricationProduitsInformatiquesElectroniquesOptiques",
  "fabricationMachinesEquipements",
  "constructionVehiculesAutomobiles",
  "fabricationAutresMaterielTransports",
  "autreSousSecteurFabrication",
] as const;
export type TValeursSousSecteurFabrication =
  (typeof ValeursSousSecteurFabrication)[number];

export type TValeursSousSecteursActivites =
  | TValeursSousSecteurEnergie
  | TValeursSousSecteurTransport
  | TValeursSousSecteurFabrication;

export type TValeursSecteursSansSousSecteur = Exclude<
  TValeursSecteursActivites,
  TValeursSecteursAvecSousSecteurs
>;

export type TValeursSectorielles =
  | TValeursSecteursSansSousSecteur
  | TValeursSousSecteursActivites;

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
export type TValeursActivitesElectricite =
  (typeof ValeursActivitesElectricite)[number];

export const ValeursActivitesReseauxChaleurFroid = [
  "operateurReseauChaleurFroid",
  "autreActiviteReseauxChaleurFroid",
] as const;
export type TValeursActivitesReseauxChaleurFroid =
  (typeof ValeursActivitesReseauxChaleurFroid)[number];

export const ValeursActivitesPetrole = [
  "exploitantsOleoduc",
  "exploitantsInstallationPetrole",
  "entiteCentralesStockage",
  "autreActivitePetrole",
] as const;
export type TValeursActivitesPetrole = (typeof ValeursActivitesPetrole)[number];

export const ValeursActivitesGaz = [
  "entrepriseFourniture",
  "gestionnaireReseauDistribution",
  "gestionnaireReseauTransport",
  "gestionnaireInstallationStockage",
  "gestionnaireInstallationGNL",
  "autreActiviteGaz",
] as const;
export type TValeursActivitesGaz = (typeof ValeursActivitesGaz)[number];

export const ValeursActivitesHydrogene = [
  "exploitantsSystemeHydrogene",
  "autreActiviteHydrogene",
] as const;
export type TValeursActivitesHydrogene =
  (typeof ValeursActivitesHydrogene)[number];

export const ValeursActivitesEnergie = [
  ...ValeursActivitesElectricite,
  ...ValeursActivitesReseauxChaleurFroid,
  ...ValeursActivitesPetrole,
  ...ValeursActivitesGaz,
  ...ValeursActivitesHydrogene,
] as const;
export type TValeursActivitesEnergie =
  | TValeursActivitesElectricite
  | TValeursActivitesReseauxChaleurFroid
  | TValeursActivitesPetrole
  | TValeursActivitesGaz
  | TValeursActivitesHydrogene;

export const ValeursActivitesTransportsAeriens = [
  "transporteursAeriensCommercial",
  "entiteGestionnaireAeroports",
  "serviceControleCirculationAerienne",
  "autreActiviteTransportsAeriens",
] as const;
export type TValeursActivitesTransportsAeriens =
  (typeof ValeursActivitesTransportsAeriens)[number];

export const ValeursActivitesTransportsFerroviaires = [
  "gestionnaireInfrastructure",
  "entrepriseFerroviaire",
  "autreActiviteTransportsFerroviaires",
] as const;
export type TValeursActivitesTransportsFerroviaires =
  (typeof ValeursActivitesTransportsFerroviaires)[number];

export const ValeursActivitesTransportsParEaux = [
  "societeTransportEaux",
  "entiteGestionnairePorts",
  "exploitantsServiceTrafficMaritime",
  "autreActiviteTransportsParEaux",
] as const;
export type TValeursActivitesTransportsParEaux =
  (typeof ValeursActivitesTransportsParEaux)[number];

export const ValeursActivitesTransportsRoutiers = [
  "autoritesRoutieresControleGestionCirculation",
  "exploitantsSystemeTransportIntelligents",
  "autreActiviteTransportsRoutiers",
] as const;
export type TValeursActivitesTransportsRoutiers =
  (typeof ValeursActivitesTransportsRoutiers)[number];

export const ValeursActivitesTransports = [
  ...ValeursActivitesTransportsAeriens,
  ...ValeursActivitesTransportsFerroviaires,
  ...ValeursActivitesTransportsParEaux,
  ...ValeursActivitesTransportsRoutiers,
] as const;
export type TValeursActivitesTransports =
  | TValeursActivitesTransportsAeriens
  | TValeursActivitesTransportsFerroviaires
  | TValeursActivitesTransportsParEaux
  | TValeursActivitesTransportsRoutiers;

export const ValeursActivitesSecteurBancaire = [
  "etablissementCredit",
  "autreActiviteSecteurBancaire",
] as const;
export type TValeursActivitesSecteurBancaire =
  (typeof ValeursActivitesSecteurBancaire)[number];

export const ValeursActivitesInfrastructureMarcheFinancier = [
  "exploitantsPlateformesNegociation",
  "contrepartieCentrales",
  "autreActiviteInfrastructureMarcheFinancie",
] as const;
export type TValeursActivitesInfrastructureMarcheFinancier =
  (typeof ValeursActivitesInfrastructureMarcheFinancier)[number];

export const ValeursActivitesSante = [
  "prestataireSoinsSante",
  "laboratoireReferenceUE",
  "rechercheDeveloppementMedicament",
  "fabriquantProduitPreparationsPharmaceutiques",
  "fabriquantDispositifsMedicauxCritiques",
  "autreActiviteSante",
] as const;
export type TValeursActivitesSante = (typeof ValeursActivitesSante)[number];

export const ValeursActivitesEauPotable = [
  "fournisseursDistributeursEauxConsommation",
  "autreActiviteEauPotable",
] as const;
export type TValeursActivitesEauPotable =
  (typeof ValeursActivitesEauPotable)[number];

export const ValeursActivitesEauUsees = [
  "collectantEvacuantTraitantEaux",
  "autreActiviteEauPotable",
] as const;
export type TValeursActivitesEauUsees =
  (typeof ValeursActivitesEauUsees)[number];

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
export type TValeursActivitesInfrastructureNumerique =
  (typeof ValeursActivitesInfrastructureNumerique)[number];

export const ValeursActivitesGestionServicesTic = [
  "fournisseurServicesGeres",
  "fournisseurServicesSecuriteGeres",
  "autreActiviteGestionServicesTic",
] as const;
export type TValeursActivitesGestionServicesTic =
  (typeof ValeursActivitesGestionServicesTic)[number];

export const ValeursActivitesAdministrationPublique = [
  "administrationPouvoirsPublicsCentraux",
  "administrationPubliqueNiveauRegional",
  "autreActiviteAdministrationPublique",
] as const;
export type TValeursActivitesAdministrationPublique =
  (typeof ValeursActivitesAdministrationPublique)[number];

export const ValeursActivitesEspace = [
  "exploitantsInfrastructureTerrestresFournitureServicesSpaciaux",
  "autreActiviteEspace",
] as const;
export type TValeursActivitesEspace = (typeof ValeursActivitesEspace)[number];

export const ValeursActivitesServicesPostauxExpedition = [
  "prestatairesServicesPostauxExpedition",
  "autreActiviteServicesPostauxExpedition",
] as const;
export type TValeursActivitesServicesPostauxExpedition =
  (typeof ValeursActivitesServicesPostauxExpedition)[number];

export const ValeursActivitesGestionDechets = [
  "executantOperationGestionDechets",
  "autreActiviteGestionDechets",
] as const;
export type TValeursActivitesGestionDechets =
  (typeof ValeursActivitesGestionDechets)[number];

export const ValeursActivitesFabricationProductionDistributionProduitsChimiques =
  [
    "fabricationDistributionSubstances",
    "autreActiviteFabricationProductionDistributionProduitsChimiques",
  ] as const;
export type TValeursActivitesFabricationProductionDistributionProduitsChimiques =
  (typeof ValeursActivitesFabricationProductionDistributionProduitsChimiques)[number];

export const ValeursActivitesProductionTransformationDistributionDenreesAlimentaires =
  [
    "secteurAlimentaireDistributionGrosProductionTransformationIndustrielle",
    "autreActiviteProductionTransformationDistributionDenreesAlimentaires",
  ] as const;
export type TValeursActivitesProductionTransformationDistributionDenreesAlimentaires =
  (typeof ValeursActivitesProductionTransformationDistributionDenreesAlimentaires)[number];

export const ValeursActivitesFabricationDispositifsMedicaux = [
  "fabriquantDispositifsMedicaux",
  "autreActiviteFabricationDispositifsMedicaux",
] as const;
export type TValeursActivitesFabricationDispositifsMedicaux =
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
export type TValeursActivitesFabricationProduitsInformatiquesElectroniquesOptiques =
  (typeof ValeursActivitesFabricationProduitsInformatiquesElectroniquesOptiques)[number];

export const ValeursActivitesFabricationEquipementsElectroniques = [
  "fabriquantMoteursGeneratriceTransformation",
  "fabriquantPilesAccumulateursElectriques",
  "fabriquantFilsCablesMaterielInstallationElectrique",
  "fabriquantAppareilEclairage",
  "fabriquantAppareilsMenagers",
  "autreActiviteFabricationEquipementsElectroniques",
] as const;
export type TValeursActivitesFabricationEquipementsElectroniques =
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
export type TValeursActivitesFabricationMachinesEquipements =
  (typeof ValeursActivitesFabricationMachinesEquipements)[number];

export const ValeursActivitesConstructionVehiculesAutomobilesRemorquesSemi = [
  "constructionVehiculesAutomobiles",
  "fabriquantCarrosseriesVehiculesAutomobiles",
  "fabriquantEquipementsAutomobiles",
  "autreActiviteConstructionVehiculesAutomobilesRemorquesSemi",
] as const;
export type TValeursActivitesConstructionVehiculesAutomobilesRemorquesSemi =
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
export type TValeursActivitesFabricationAutreMaterielsTransports =
  (typeof ValeursActivitesFabricationAutreMaterielsTransports)[number];
export const ValeursActivitesFabrication = [
  ...ValeursActivitesFabricationDispositifsMedicaux,
  ...ValeursActivitesFabricationProduitsInformatiquesElectroniquesOptiques,
  ...ValeursActivitesFabricationEquipementsElectroniques,
  ...ValeursActivitesFabricationMachinesEquipements,
  ...ValeursActivitesConstructionVehiculesAutomobilesRemorquesSemi,
  ...ValeursActivitesFabricationAutreMaterielsTransports,
] as const;
export type TValeursActivitesFabrication =
  | TValeursActivitesFabricationDispositifsMedicaux
  | TValeursActivitesFabricationProduitsInformatiquesElectroniquesOptiques
  | TValeursActivitesFabricationEquipementsElectroniques
  | TValeursActivitesFabricationMachinesEquipements
  | TValeursActivitesConstructionVehiculesAutomobilesRemorquesSemi
  | TValeursActivitesFabricationAutreMaterielsTransports;

export const ValeursActivitesFournisseursNumeriques = [
  "fournisseursPlaceMarcheEnLigne",
  "fournisseursMoteursRechercheEnLigne",
  "fournisseursPlateformesServicesReseauxSociaux",
  "autreActiviteFournisseursNumeriques",
] as const;
export type TValeursActivitesFournisseursNumeriques =
  (typeof ValeursActivitesFournisseursNumeriques)[number];

export const ValeursActivitesRecherche = ["organismeRecherche"] as const;
export type TValeursActivitesRecherche =
  (typeof ValeursActivitesRecherche)[number];

export type TValeursActivites =
  // Annexe 1
  | TValeursActivitesEnergie
  | TValeursActivitesTransports
  | TValeursActivitesSecteurBancaire
  | TValeursActivitesInfrastructureMarcheFinancier
  | TValeursActivitesSante
  | TValeursActivitesEauPotable
  | TValeursActivitesEauUsees
  | TValeursActivitesInfrastructureNumerique
  | TValeursActivitesGestionServicesTic
  | TValeursActivitesAdministrationPublique
  | TValeursActivitesEspace
  // Annexe 2
  | TValeursActivitesServicesPostauxExpedition
  | TValeursActivitesGestionDechets
  | TValeursActivitesFabricationProductionDistributionProduitsChimiques
  | TValeursActivitesProductionTransformationDistributionDenreesAlimentaires
  | TValeursActivitesFabrication
  | TValeursActivitesFournisseursNumeriques
  | TValeursActivitesRecherche;
