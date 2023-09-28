import {
  TValeursActivites,
  TValeursSecteursActivites,
  TValeursSectorielles,
  TValeursSousSecteurEnergie,
  TValeursSousSecteurFabrication,
  TValeursSousSecteursActivites,
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
  ValeursSousSecteurEnergie,
  ValeursSousSecteurFabrication,
  ValeursSousSecteurTransport,
} from "./ValeursCles.ts";
import { DescriptionSecteur, DetailsSousSecteurUnique } from "./Secteurs";

export const libellesSousSecteursEnergie: DetailsSousSecteurUnique<TValeursSousSecteurEnergie> =
  {
    electricite: "Électricité",
    gaz: "Gaz",
    hydrogene: "Hydrogène",
    petrole: "Pétrole",
    reseauxChaleurFroid: "Réseaux de chaleur et de froid",
  };

export const libellesSousSecteurFabrication: DetailsSousSecteurUnique<TValeursSousSecteurFabrication> =
  {
    fabricationFabricationProduitsInformatiquesElectroniquesOptiques:
      "Fabrication de produits informatiques, électroniques et optiques",

    constructionVehiculesAutomobiles:
      "Construction de véhicules automobiles, remorques et semi- remorques",

    fabricationAutresMaterielTransports:
      "Fabrication d’autres matériels de transport",

    fabricationDispositifsMedicaux:
      "Fabrication de dispositifs médicaux et de dispositifs médicaux de diagnostic in vitro",

    fabricationEquipementsElectroniques:
      "Fabrication de produits informatiques, électroniques et optiques",

    fabricationMachinesEquipements:
      "Fabrication de machines et équipements n.c.a.",
  };

export const libellesSousSecteurTransports: DetailsSousSecteurUnique<TValeursSousSecteurTransport> =
  {
    transportsAeriens: "Aériens",
    transportsFerroviaires: "Ferroviaires",
    transportsParEau: "Par eau",
    transportsRoutiers: "Routiers",
  };

export const libellesSousSecteursActivite: Record<
  TValeursSousSecteursActivites,
  string
> = {
  ...libellesSousSecteursEnergie,
  ...libellesSousSecteurFabrication,
  ...libellesSousSecteurTransports,
};

export const sousSecteursParSecteur: Record<
  Extract<TValeursSecteursActivites, "energie" | "transports" | "fabrication">,
  DescriptionSecteur
> = {
  energie: ValeursSousSecteurEnergie,
  transports: ValeursSousSecteurTransport,
  fabrication: ValeursSousSecteurFabrication,
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
