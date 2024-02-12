import {
  AppartenancePaysUnionEuropeenne,
  TrancheChiffreAffaire,
  TrancheNombreEmployes,
  TypeEntitePublique,
} from "../../ChampsSimulateur.definitions";
import {
  SousSecteurEnergie,
  SousSecteurFabrication,
  SousSecteurTransport,
} from "../../SousSecteurActivite.definitions";

export type ReponseDesigneOSE = {
  designeOperateurServiceEssentiel: "oui" | "non";
};

export type ReponseLocalisation = {
  appartenancePaysUnionEuropeenne: AppartenancePaysUnionEuropeenne;
};

type TypeStructurePrivee = {
  typeStructure: "privee";
};
type TypeStructurePublique = {
  typeStructure: "publique";
  typeEntitePublique: TypeEntitePublique;
};

type TailleSecteurPrive = {
  trancheChiffreAffaire: TrancheChiffreAffaire;
  trancheNombreEmployes: TrancheNombreEmployes;
};
type TailleSecteurPublic = {
  trancheChiffreAffaire: TrancheChiffreAffaire;
};

export type DefinitionStructurePrivee = TypeStructurePrivee &
  TailleSecteurPrive;
export type DefinitionStructurePublique = TypeStructurePublique &
  TailleSecteurPublic;

export type DefinitionStructure =
  | DefinitionStructurePrivee
  | DefinitionStructurePublique;
export const ValeursSecteursActivitesSimples = [
  "administrationPublique",
  "banqueSecteurBancaire",
  "eauPotable",
  "eauxUsees",
  "espace",
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
  "autreSecteurActivite",
] as const;
export const ValeursSecteursActivitesAvecSousSecteur = [
  "energie",
  "fabrication",
  "transports",
] as const;
type InformationsSecteur =
  | {
      secteurActivite: "energie";
      sousSecteurActivite: SousSecteurEnergie;
    }
  | {
      secteurActivite: "fabrication";
      sousSecteurActivite: SousSecteurFabrication;
    }
  | {
      secteurActivite: "transports";
      sousSecteurActivite: SousSecteurTransport;
    }
  | {
      secteurActivite: (typeof ValeursSecteursActivitesSimples)[number];
    };

export type DonneesEvaluees =
  | "DesignationOperateurServiceEssentiel"
  | "AppartenancePaysUnionEuropeenne"
  | "Structure"
  | "SecteurActiviteComplet"
  | "Fin";

export type TypeDonnees<EtapeEvaluation extends DonneesEvaluees> =
  EtapeEvaluation extends "DesignationOperateurServiceEssentiel"
    ? ReponseDesigneOSE
    : EtapeEvaluation extends "AppartenancePaysUnionEuropeenne"
      ? ReponseLocalisation
      : EtapeEvaluation extends "Structure"
        ? DefinitionStructure
        : EtapeEvaluation extends "SecteurActiviteComplet"
          ? InformationsSecteur
          : never;

export type DonneesReponseUnitaire =
  | ReponseDesigneOSE
  | ReponseLocalisation
  | DefinitionStructure
  | InformationsSecteur;
