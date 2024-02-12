import {
  AppartenancePaysUnionEuropeenne,
  DesignationOperateurServicesEssentiels,
  TrancheChiffreAffaire,
  TrancheNombreEmployes,
  TypeEntitePublique,
} from "../../ChampsSimulateur.definitions";
import {
  DonneesFormulaireSimulateur,
  NomsChampsSimulateur,
} from "../../DonneesFormulaire.definitions";
import {
  SousSecteurEnergie,
  SousSecteurFabrication,
  SousSecteurTransport,
} from "../../SousSecteurActivite.definitions";
import {
  cons,
  EtatReponseEnCoursProps,
  fin,
} from "./EtatRegulation.definition";
import { match, P } from "ts-pattern";

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

export type DonneesCompletesEvaluees =
  | "DesignationOperateurServicesEssentiels"
  | "AppartenancePaysUnionEuropeenne"
  | "Structure"
  | "SecteurActiviteComplet";

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
          : never;

export type DonneesReponseUnitaire =
  | ReponseDesigneOSE
  | ReponseLocalisation
  | DefinitionStructure
  | InformationsSecteur;

const auMoinsUnElement = <T extends string>(a: T[]) => a.length === 1;

export const nomChampDepuisDonneesCompletes = (
  donneeEvaluee: DonneesCompletesEvaluees,
) => donneeEvaluee[0].toLowerCase() + donneeEvaluee.slice(1);

const champDansFormulaire = (
  donnees: DonneesFormulaireSimulateur,
  nomChamp: string,
) => donnees[nomChamp as NomsChampsSimulateur][0];

const champVersPropsEtat = (donneeEvaluee: DonneesCompletesEvaluees) => {
  const nomChamp = nomChampDepuisDonneesCompletes(donneeEvaluee);
  return (donnees: DonneesFormulaireSimulateur) =>
    ({
      donnees: {
        [nomChamp]: champDansFormulaire(donnees, nomChamp),
      },
      etat: donneeEvaluee,
    }) as EtatReponseEnCoursProps<typeof donneeEvaluee>;
};

export const depuisDonneesFormulaireSimulateur = (
  donnees: DonneesFormulaireSimulateur,
) =>
  match(donnees)
    .with(
      {
        designationOperateurServicesEssentiels: P.when(auMoinsUnElement),
        appartenancePaysUnionEuropeenne: [],
      },
      () =>
        cons(
          champVersPropsEtat("DesignationOperateurServicesEssentiels")(donnees),
          fin(),
        ),
    )
    .with(
      {
        designationOperateurServicesEssentiels: P.when(auMoinsUnElement),
        appartenancePaysUnionEuropeenne: P.when(auMoinsUnElement),
      },
      () =>
        cons(
          champVersPropsEtat("DesignationOperateurServicesEssentiels")(donnees),
          cons(
            champVersPropsEtat("AppartenancePaysUnionEuropeenne")(donnees),
            fin(),
          ),
        ),
    )
    .otherwise(() => fin());
