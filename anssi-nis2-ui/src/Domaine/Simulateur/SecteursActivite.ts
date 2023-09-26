import {
  ValeursActivites,
  ValeursSecteurActivite,
  ValeursSousSecteurEnergie,
} from "./ValeursCles.ts";

export const secteursActivite: Record<ValeursSecteurActivite, string> = {
  administrationPublique: "Administration publique / administration centrale",
  banqueSecteurBancaire: "Banques (secteur bancaire)",
  eauPotable: "Eau potable",
  eauxUsees: "Eaux usées",
  energie: "Énergie",
  espace: "Espace",
  fabrication: "Fabrication",
  fabricationProductionEtDistributionDeProduitsChimiques:
    "Fabrication, production et distribution de produits chimiques",
  fournisseursNumeriques: "Fournisseurs numériques",
  gestionDesDechets: "Gestion des déchets",
  gestionDesServicesTic: "Gestion des services TIC",
  infrastructureDesMarchesFinanciers: "Infrastructure des marchés financiers",
  infrastructureNumerique: "Infrastructure numérique",
  productionTransformationEtDistributionDeDenreesAlimentaires:
    "Production transformation et distribution de denrées alimentaires",
  recherche: "Recherche",
  sante: "Santé",
  servicesPostauxEtDExpedition: "Services postaux et d'expédition",
  transports: "Transports",
  autre: "Aucun",
};
type ListeActivites = Record<ValeursActivites, string>;
export type DescriptionSousSecteur = {
  libelle: string;
  activites: ListeActivites;
};
export const sousSecteursEnergie: Record<
  ValeursSousSecteurEnergie,
  DescriptionSousSecteur
> = {
  electricite: {
    libelle: "Électricité",
    activites: {
      entrepriseElectriciteRemplissantUneFonctionDeFourniture:
        "Entreprise d’électricité remplissant une fonction de fourniture",
      gestionnaireDeReseau: "Gestionnaire de réseau de distribution",
      gestionnaireReseauTransport: "Gestionnaire de réseau de transport",
      producteur: "Producteur",
      operateurDesigneDuMarcheOuNemo: "Opérateur désigné du marché ou NEMO",
      acteurDuMarche: "Acteur du marché",
      exploitantDePointDeRecharge: "Exploitant de point de recharge",
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
  reseauxDeChaleurEtDeFroid: {
    libelle: "Réseaux de chaleur et de froid",
    activites: {},
  },
};
type DescriptionSecteur = {
  activites: ListeActivites;
  sousSecteurs?: Record<ValeursSousSecteurEnergie, DescriptionSousSecteur>;
};
export const detailsDesSecteurs: Record<
  ValeursSecteurActivite,
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
  fabricationProductionEtDistributionDeProduitsChimiques: { activites: {} },
  fournisseursNumeriques: { activites: {} },
  gestionDesDechets: { activites: {} },
  gestionDesServicesTic: { activites: {} },
  infrastructureDesMarchesFinanciers: { activites: {} },
  infrastructureNumerique: { activites: {} },
  productionTransformationEtDistributionDeDenreesAlimentaires: {
    activites: {},
  },
  recherche: { activites: {} },
  sante: { activites: {} },
  servicesPostauxEtDExpedition: { activites: {} },
  transports: { activites: {} },
};
