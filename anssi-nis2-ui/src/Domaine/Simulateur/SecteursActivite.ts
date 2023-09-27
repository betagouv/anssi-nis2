import {
  TValeursActivites,
  TValeursSecteursActivites,
  TValeursSectorielles,
  TValeursSousSecteurEnergie,
  TValeursSousSecteurFabrication,
  TValeursSousSecteurTransport,
  ValeursActivitesAdministrationPublique,
  ValeursActivitesConstructionVehiculesAutomobilesRemorquesSemi,
  ValeursActivitesEauPotable,
  ValeursActivitesEauUsees,
  ValeursActivitesElectricite,
  ValeursActivitesEnergie,
  ValeursActivitesEspace,
  ValeursActivitesFabrication,
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
  ValeursActivitesTransports,
  ValeursActivitesTransportsAeriens,
  ValeursActivitesTransportsFerroviaires,
  ValeursActivitesTransportsParEaux,
  ValeursActivitesTransportsRoutiers,
} from "./ValeursCles.ts";
import {
  DescriptionSecteur,
  DetailsSousSecteurs,
  DetailsSousSecteurUnique,
} from "./Secteurs";

export const sousSecteursEnergie: DetailsSousSecteurUnique<TValeursSousSecteurEnergie> =
  {
    electricite: {
      libelle: "Électricité",
      activites: {
        entrepriseElectriciteRemplissantFonctionFourniture:
          "Entreprise d’électricité remplissant une fonction de fourniture",
        gestionnaireReseau: "Gestionnaire de réseau de distribution",
        gestionnaireReseauTransport: "Gestionnaire de réseau de transport",
        producteur: "Producteur",
        operateurDesigneMarcheOuNemo: "Opérateur désigné du marché ou NEMO",
        acteurDuMarche: "Acteur du marché",
        exploitantsPointRecharge: "Exploitant de point de recharge",
        autre: "Aucun",
      },
    },
    gaz: {
      libelle: "Gaz",
      activites: {},
    },
    hydrogene: {
      libelle: "Hydrogène",
      activites: {},
    },
    petrole: {
      libelle: "Pétrole",
      activites: {},
    },
    reseauxChaleurFroid: {
      libelle: "Réseaux de chaleur et de froid",
      activites: {},
    },
  };

export const sousSecteurFabrication: DetailsSousSecteurUnique<TValeursSousSecteurFabrication> =
  {
    fabricationFabricationProduitsInformatiquesElectroniquesOptiques: {
      libelle:
        "Fabrication de produits informatiques, électroniques et optiques",
      activites: {},
    },
    constructionVehiculesAutomobiles: {
      libelle:
        "Construction de véhicules automobiles, remorques et semi- remorques",
      activites: {},
    },
    fabricationAutresMaterielTransports: {
      libelle: "Fabrication d’autres matériels de transport",
      activites: {},
    },
    fabricationDispositifsMedicaux: {
      libelle:
        "Fabrication de dispositifs médicaux et de dispositifs médicaux de diagnostic in vitro",
      activites: {},
    },
    fabricationEquipementsElectroniques: {
      libelle:
        "Fabrication de produits informatiques, électroniques et optiques",
      activites: {},
    },
    fabricationMachinesEquipements: {
      libelle: "Fabrication de machines et équipements n.c.a.",
      activites: {},
    },
  };

export const sousSecteurTransports: DetailsSousSecteurUnique<TValeursSousSecteurTransport> =
  {
    transportsAeriens: {
      libelle: "Aériens",
      activites: {},
    },
    transportsFerroviaires: {
      libelle: "Ferroviaires",
      activites: {},
    },
    transportsParEau: {
      libelle: "Par eau",
      activites: {},
    },
    transportsRoutiers: {
      libelle: "Routiers",
      activites: {},
    },
  };

export const sousSecteurs: DetailsSousSecteurs = {
  ...sousSecteursEnergie,
  ...sousSecteurFabrication,
  ...sousSecteurTransports,
};

export const detailsDesSecteurs: Record<
  TValeursSecteursActivites,
  DescriptionSecteur
> = {
  administrationPublique: { activites: {} },
  autre: { activites: {} },
  banqueSecteurBancaire: { activites: {} },
  eauPotable: { activites: {} },
  eauxUsees: { activites: {} },
  energie: {
    activites: {},
    sousSecteurs: sousSecteursEnergie,
  },
  espace: { activites: {} },
  fabrication: { activites: {} },
  fabricationProductionDistributionProduitsChimiques: { activites: {} },
  fournisseursNumeriques: { activites: {} },
  gestionDechets: { activites: {} },
  gestionServicesTic: { activites: {} },
  infrastructureMarchesFinanciers: { activites: {} },
  infrastructureNumerique: { activites: {} },
  productionTransformationDistributionDenreesAlimentaires: {
    activites: {},
  },
  recherche: { activites: {} },
  sante: { activites: {} },
  servicesPostauxExpedition: { activites: {} },
  transports: { activites: {} },
};

export const activitesParSecteurEtSousSecteur: Record<
  TValeursSectorielles,
  readonly TValeursActivites[]
> = {
  autre: [],
  administrationPublique: ValeursActivitesAdministrationPublique,
  banqueSecteurBancaire: ValeursActivitesSecteurBancaire,
  constructionVehiculesAutomobiles:
    ValeursActivitesConstructionVehiculesAutomobilesRemorquesSemi,
  eauPotable: ValeursActivitesEauPotable,
  eauxUsees: ValeursActivitesEauUsees,
  electricite: ValeursActivitesElectricite,
  energie: ValeursActivitesEnergie,
  espace: ValeursActivitesEspace,
  fabrication: ValeursActivitesFabrication,
  fabricationAutresMaterielTransports:
    ValeursActivitesFabricationAutreMaterielsTransports,
  fabricationDispositifsMedicaux:
    ValeursActivitesFabricationDispositifsMedicaux,
  fabricationEquipementsElectroniques:
    ValeursActivitesFabricationEquipementsElectroniques,
  fabricationMachinesEquipements:
    ValeursActivitesFabricationMachinesEquipements,
  fabricationProductionDistributionProduitsChimiques:
    ValeursActivitesFabricationProductionDistributionProduitsChimiques,
  fabricationFabricationProduitsInformatiquesElectroniquesOptiques:
    ValeursActivitesFabricationProduitsInformatiquesElectroniquesOptiques,
  fournisseursNumeriques: ValeursActivitesFournisseursNumeriques,
  gaz: ValeursActivitesGaz,
  gestionDechets: ValeursActivitesGestionDechets,
  gestionServicesTic: ValeursActivitesGestionServicesTic,
  hydrogene: ValeursActivitesHydrogene,
  infrastructureMarchesFinanciers:
    ValeursActivitesInfrastructureMarcheFinancier,
  infrastructureNumerique: ValeursActivitesInfrastructureNumerique,
  petrole: ValeursActivitesPetrole,
  productionTransformationDistributionDenreesAlimentaires:
    ValeursActivitesProductionTransformationDistributionDenreesAlimentaires,
  recherche: ValeursActivitesRecherche,
  reseauxChaleurFroid: ValeursActivitesReseauxChaleurFroid,
  sante: ValeursActivitesSante,
  servicesPostauxExpedition: ValeursActivitesServicesPostauxExpedition,
  transports: ValeursActivitesTransports,
  transportsAeriens: ValeursActivitesTransportsAeriens,
  transportsFerroviaires: ValeursActivitesTransportsFerroviaires,
  transportsParEau: ValeursActivitesTransportsParEaux,
  transportsRoutiers: ValeursActivitesTransportsRoutiers,
};
