import { Activite } from "../../../../commun/core/src/Domain/Simulateur/Activite.definitions";
import { SecteurActivite } from "../../../../commun/core/src/Domain/Simulateur/SecteurActivite.definitions";
import { SousSecteurActivite } from "../../../../commun/core/src/Domain/Simulateur/SousSecteurActivite.definitions";

export type CasDeTest = {
  libelleActivite: string;
  activite: Activite;
  libelleSecteur: string;
  secteur: SecteurActivite;
  libelleSousSecteur?: string;
  sousSecteur?: SousSecteurActivite;
};

export const infrastructureNumerique: CasDeTest[] = [
  {
    libelleActivite:
      "Fournisseurs de réseaux de communications électroniques publics",
    activite: "fournisseurReseauxCommunicationElectroniquesPublics",
    libelleSecteur: "Infrastructure numérique",
    secteur: "infrastructureNumerique",
  },
  {
    libelleActivite:
      "Fournisseurs de services de communications électroniques accessibles au public",
    activite: "fournisseurServiceCommunicationElectroniquesPublics",
    libelleSecteur: "Infrastructure numérique",
    secteur: "infrastructureNumerique",
  },
  {
    libelleActivite:
      "Fournisseurs de services DNS, à l'exclusion des opérateurs de serveurs racines de noms de domaines",
    activite: "fournisseurServicesDNS",
    libelleSecteur: "Infrastructure numérique",
    secteur: "infrastructureNumerique",
  },
  {
    libelleActivite: "Registres de noms de domaines de premier niveau",
    activite: "registresNomsDomainesPremierNiveau",
    libelleSecteur: "Infrastructure numérique",
    secteur: "infrastructureNumerique",
  },
  {
    libelleActivite:
      "Fournisseur des services d'enregistrement de noms de domaine",
    activite: "fournisseurServicesEnregristrementNomDomaine",
    libelleSecteur: "Infrastructure numérique",
    secteur: "infrastructureNumerique",
  },
  {
    libelleActivite: "Prestataires de service de confiance qualifié",
    activite: "prestataireServiceConfianceQualifie",
    libelleSecteur: "Infrastructure numérique",
    secteur: "infrastructureNumerique",
  },
  {
    libelleActivite: "Prestataires de service de confiance non qualifié",
    activite: "prestataireServiceConfianceNonQualifie",
    libelleSecteur: "Infrastructure numérique",
    secteur: "infrastructureNumerique",
  },
  {
    libelleActivite: "Fournisseurs de services d'informatique en nuage",
    activite: "fournisseurServicesInformatiqueNuage",
    libelleSecteur: "Infrastructure numérique",
    secteur: "infrastructureNumerique",
  },
  {
    libelleActivite: "Fournisseurs de services de centres de données",
    activite: "fournisseurServiceCentresDonnees",
    libelleSecteur: "Infrastructure numérique",
    secteur: "infrastructureNumerique",
  },
  {
    libelleActivite: "Fournisseurs de réseaux de diffusion de contenu",
    activite: "fournisseurReseauxDiffusionContenu",
    libelleSecteur: "Infrastructure numérique",
    secteur: "infrastructureNumerique",
  },
  {
    libelleActivite: "Autre activité",
    activite: "autreActiviteInfrastructureNumerique",
    libelleSecteur: "Infrastructure numérique",
    secteur: "infrastructureNumerique",
  },
];

export const gestionDesServicesTIC: CasDeTest[] = [
  {
    libelleActivite: "Fournisseurs de services gérés",
    activite: "fournisseurServicesGeres",
    libelleSecteur: "Gestion des services TIC",
    secteur: "gestionServicesTic",
  },
  {
    libelleActivite: "Fournisseurs de services de sécurité gérés",
    activite: "fournisseurServicesSecuriteGeres",
    libelleSecteur: "Gestion des services TIC",
    secteur: "gestionServicesTic",
  },
  {
    libelleActivite: "Autre activité",
    activite: "autreActiviteGestionServicesTic",
    libelleSecteur: "Gestion des services TIC",
    secteur: "gestionServicesTic",
  },
];

export const fournisseursNumeriques: CasDeTest[] = [
  {
    libelleActivite: "Fournisseurs de places de marché en ligne",
    activite: "fournisseursPlaceMarcheEnLigne",
    libelleSecteur: "Fournisseurs numériques",
    secteur: "fournisseursNumeriques",
  },
  {
    libelleActivite: "Fournisseurs de moteurs de recherche en ligne",
    activite: "fournisseursMoteursRechercheEnLigne",
    libelleSecteur: "Fournisseurs numériques",
    secteur: "fournisseursNumeriques",
  },
  {
    libelleActivite:
      "Fournisseurs de plateformes de services de réseaux sociaux",
    activite: "fournisseursPlateformesServicesReseauxSociaux",
    libelleSecteur: "Fournisseurs numériques",
    secteur: "fournisseursNumeriques",
  },
];

export const autresActivites: CasDeTest[] = [
  {
    libelleActivite: "Autre activité",
    activite: "autreActiviteFournisseursNumeriques",
    libelleSecteur: "Fournisseurs numériques",
    secteur: "fournisseursNumeriques",
  },
  {
    libelleActivite: "Autre activité",
    activite: "autreActiviteSecteurBancaire",
    libelleSecteur: "Banques (secteur bancaire)",
    secteur: "banqueSecteurBancaire",
  },
  {
    libelleActivite: "Autre activité",
    activite: "autreActiviteEauPotable",
    libelleSecteur: "Eau potable",
    secteur: "eauPotable",
  },
  {
    libelleActivite: "Autre activité",
    activite: "autreActiviteEauxUsees",
    libelleSecteur: "Eaux usées",
    secteur: "eauxUsees",
  },
  {
    libelleActivite: "Autre activité",
    activite: "autreActiviteFabricationProductionDistributionProduitsChimiques",
    libelleSecteur:
      "Fabrication, production et distribution de produits chimiques",
    secteur: "fabricationProductionDistributionProduitsChimiques",
  },
  {
    libelleActivite: "Autre activité",
    activite: "autreActiviteInfrastructureMarcheFinancier",
    libelleSecteur: "Infrastructure des marchés financiers",
    secteur: "infrastructureMarchesFinanciers",
  },
  {
    libelleActivite: "Autre activité",
    activite:
      "autreActiviteProductionTransformationDistributionDenreesAlimentaires",
    libelleSecteur:
      "Production transformation et distribution de denrées alimentaires",
    secteur: "productionTransformationDistributionDenreesAlimentaires",
  },
  {
    libelleActivite: "Autre activité",
    activite: "autreActiviteRecherche",
    libelleSecteur: "Recherche",
    secteur: "recherche",
  },
  {
    libelleActivite: "Autre activité",
    activite: "autreActiviteServicesPostauxExpedition",
    libelleSecteur: "Services postaux et d'expédition",
    secteur: "servicesPostauxExpedition",
  },
  {
    libelleActivite: "Autre activité",
    activite: "autreActiviteEspace",
    libelleSecteur: "Espace",
    secteur: "espace",
  },
  {
    libelleActivite: "Autre activité",
    activite: "autreActiviteGestionDechets",
    libelleSecteur: "Gestion des déchets",
    secteur: "gestionDechets",
  },
  {
    libelleActivite: "Autre activité",
    activite: "autreActiviteElectricite",
    libelleSecteur: "Énergie",
    secteur: "energie",
    libelleSousSecteur: "Électricité",
    sousSecteur: "electricite",
  },
  {
    libelleActivite: "Autre activité",
    activite: "autreActiviteGaz",
    libelleSecteur: "Énergie",
    secteur: "energie",
    libelleSousSecteur: "Gaz",
    sousSecteur: "gaz",
  },
  {
    libelleActivite: "Autre activité",
    activite: "autreActiviteHydrogene",
    libelleSecteur: "Énergie",
    secteur: "energie",
    libelleSousSecteur: "Hydrogène",
    sousSecteur: "hydrogene",
  },
  {
    libelleActivite: "Autre activité",
    activite: "autreActivitePetrole",
    libelleSecteur: "Énergie",
    secteur: "energie",
    libelleSousSecteur: "Pétrole",
    sousSecteur: "petrole",
  },
  {
    libelleActivite: "Autre activité",
    activite: "autreActiviteReseauxChaleurFroid",
    libelleSecteur: "Énergie",
    secteur: "energie",
    libelleSousSecteur: "Réseaux de chaleur et de froid",
    sousSecteur: "reseauxChaleurFroid",
  },
  {
    libelleActivite: "Autre activité",
    activite: "autreActiviteConstructionVehiculesAutomobilesRemorquesSemi",
    libelleSecteur: "Fabrication",
    secteur: "fabrication",
    libelleSousSecteur:
      "Construction de véhicules automobiles, remorques et semi- remorques",
    sousSecteur: "constructionVehiculesAutomobiles",
  },
  {
    libelleActivite: "Autre activité",
    activite: "autreActiviteFabricationDispositifsMedicaux",
    libelleSecteur: "Fabrication",
    secteur: "fabrication",
    libelleSousSecteur:
      "Fabrication de dispositifs médicaux et de dispositifs médicaux de diagnostic in vitro",
    sousSecteur: "fabricationDispositifsMedicaux",
  },
  {
    libelleActivite: "Autre activité",
    activite:
      "autreActiviteFabricationProduitsInformatiquesElectroniquesOptiques",
    libelleSecteur: "Fabrication",
    secteur: "fabrication",
    libelleSousSecteur:
      "Fabrication de produits informatiques, électroniques et optiques",
    sousSecteur: "fabricationProduitsInformatiquesElectroniquesOptiques",
  },
  {
    libelleActivite: "Autre activité",
    activite: "autreActiviteFabricationMachinesEquipements",
    libelleSecteur: "Fabrication",
    secteur: "fabrication",
    libelleSousSecteur: "Fabrication de machines et équipements n.c.a.",
    sousSecteur: "fabricationMachinesEquipements",
  },
  {
    libelleActivite: "Autre activité",
    activite: "autreActiviteTransportsAeriens",
    libelleSecteur: "Transports",
    secteur: "transports",
    libelleSousSecteur: "Aériens",
    sousSecteur: "transportsAeriens",
  },
  {
    libelleActivite: "Autre activité",
    activite: "autreActiviteTransportsFerroviaires",
    libelleSecteur: "Transports",
    secteur: "transports",
    libelleSousSecteur: "Ferroviaires",
    sousSecteur: "transportsFerroviaires",
  },
];
