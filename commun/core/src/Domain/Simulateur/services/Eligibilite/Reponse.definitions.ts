import {
  AppartenancePaysUnionEuropeenne,
  DesignationOperateurServicesEssentiels,
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
  designationOperateurServicesEssentiels: DesignationOperateurServicesEssentiels;
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
  trancheNombreEmployes: TrancheNombreEmployes;
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

export type InformationsLocalisationRepresentant =
  | {
      fournitServicesUnionEuropeenne: "non";
    }
  | {
      fournitServicesUnionEuropeenne: "oui";
      localisationRepresentant: AppartenancePaysUnionEuropeenne;
    };

export type DonneesCompletesEvaluees =
  | "DesignationOperateurServicesEssentiels"
  | "AppartenancePaysUnionEuropeenne"
  | "Structure"
  | "SecteurActiviteComplet"
  | "LocalisationRepresentant";

export type DonneesEvaluees = DonneesCompletesEvaluees | "Fin";

export type TypeDonnees<EtapeEvaluation extends DonneesCompletesEvaluees> =
  EtapeEvaluation extends "DesignationOperateurServicesEssentiels"
    ? ReponseDesigneOSE
    : EtapeEvaluation extends "AppartenancePaysUnionEuropeenne"
      ? ReponseLocalisation
      : EtapeEvaluation extends "Structure"
        ? DefinitionStructure
        : EtapeEvaluation extends "SecteurActiviteComplet"
          ? InformationsSecteur
          : EtapeEvaluation extends "LocalisationRepresentant"
            ? InformationsLocalisationRepresentant
            : never;

export type Tag<E extends string> = { _tag: `${E}` };

export type ReponseEtat<
  Encapsule extends UnionReponseEtat,
  E extends DonneesCompletesEvaluees,
> = Tag<E> &
  Omit<Encapsule, "_tag"> & {
    [K in E]: TypeDonnees<K>;
  };

export type ReponseEtatVide = Tag<"ReponseEtatVide">;

export type ReponseEtatDesignationOperateurServicesEssentiels = ReponseEtat<
  ReponseEtatVide,
  "DesignationOperateurServicesEssentiels"
>;

export type ReponseEtatAppartenancePaysUnionEuropeenne = ReponseEtat<
  ReponseEtatDesignationOperateurServicesEssentiels,
  "AppartenancePaysUnionEuropeenne"
>;

export type ReponseEtatStructure = ReponseEtat<
  ReponseEtatAppartenancePaysUnionEuropeenne,
  "Structure"
>;

export type ReponseEtatSecteurActiviteComplet = ReponseEtat<
  ReponseEtatStructure,
  "SecteurActiviteComplet"
>;

export type ReponseEtatLocalisationRepresentant = ReponseEtat<
  ReponseEtatSecteurActiviteComplet,
  "LocalisationRepresentant"
>;

export type UnionReponseEtat =
  | ReponseEtatVide
  | ReponseEtatDesignationOperateurServicesEssentiels
  | ReponseEtatAppartenancePaysUnionEuropeenne
  | ReponseEtatStructure
  | ReponseEtatSecteurActiviteComplet
  | ReponseEtatLocalisationRepresentant;
