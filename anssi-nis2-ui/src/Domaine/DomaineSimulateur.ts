export type ValeursClePaysUnionEuropeenne = "france" | "autre" | "horsue";
export const paysUnionEuropeenneLocalisation: Record<
  ValeursClePaysUnionEuropeenne,
  string
> = {
  france: "France",
  autre: "Autre état membre",
  horsue: "Hors Union Européenne",
};

export type ValeursTypeStructure = "publique" | "privee" | "association";
export const typesStructure: Record<ValeursTypeStructure, string> = {
  publique: "Publique",
  privee: "Privée",
  association: "Association",
};

export type ValeursTrancheNombreEmployes = "petit" | "moyen" | "grand";
export const tranchesNombreEmployes: Record<
  ValeursTrancheNombreEmployes,
  string
> = {
  petit: "1 à 49",
  moyen: "50 à 249",
  grand: "≥ 250",
};

export type ValeursTrancheCA = "petit" | "moyen" | "grand";
export const tranchesCA: Record<ValeursTrancheCA, string> = {
  petit: "< 10 millions €",
  moyen: "10 à 50 millions €, ou bilan annuel de 10 à 43 millions €",
  grand: "≥ 50 millions €, ou bilan annuel ≥ 43 millions €",
};

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
  autre: "Autre ou je ne sais pas",
};

type ValeursSousSecteurEnergie =
  | "electricite"
  | "gaz"
  | "hydrogene"
  | "petrole"
  | "reseauxDeChaleurEtDeFroid";
/*const sousSecteursEnergie: Record<ValeursSousSecteurEnergie, string> = {
    electricite: "Électricité",
    gaz: "Gaz",
    hydrogene: "Hydrogène",
    petrole: "Pétrole",
    reseauxDeChaleurEtDeFroid: "Réseaux de chaleur et de froid",
}*/
type ValeursActivites = string;

type ListeActivites = Record<ValeursActivites, string>;

type DescriptionSousSecteur = {
  libelle: string;
  activites: ListeActivites;
};

const sousSecteursEnergie: Record<
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
      autre: "Autre ou ne sait pas",
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
