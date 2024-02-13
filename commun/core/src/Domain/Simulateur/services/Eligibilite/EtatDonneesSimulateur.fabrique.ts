import { match, P } from "ts-pattern";
import { GuardP } from "ts-pattern/dist/types/Pattern";
import { DesignationOperateurServicesEssentiels } from "../../ChampsSimulateur.definitions";
import { DonneesFormulaireSimulateur, NomsChampsSimulateur } from "../../DonneesFormulaire.definitions";
import {
  ReponseEtatappartenancePaysUnionEuropeenne,
  ReponseEtatDesignationOperateurServicesEssentiels,
  ReponseEtatSecteurActiviteComplet,
  ReponseEtatStructure,
  ReponseEtatVide,
  UnionReponseEtat,
} from "./Reponse.definitions";

const exactementUnElement = <T extends string>(a: T[]) => a.length === 1;
const reponseEtatVide: ReponseEtatVide = { _tag: "ReponseEtatVide" };

const getPattern = (...champs: NomsChampsSimulateur[]) =>
  champs.reduce((patt, champ) => ({...patt, [champ]: P.when(exactementUnElement) as GuardP<
      DonneesFormulaireSimulateur[typeof champ],
      never
    >}), {})


export const ReponseEtat = {
  construitReponseEtatVide: () => reponseEtatVide,
  construitEtatsDesignationOse: (
    donnees: DonneesFormulaireSimulateur,
  ): ReponseEtatDesignationOperateurServicesEssentiels => ({
    _tag: "DesignationOperateurServicesEssentiels",
    DesignationOperateurServicesEssentiels: {
      designationOperateurServicesEssentiels:
        donnees.designationOperateurServicesEssentiels[0],
    },
  }),

  construitEtatappartenancePaysUnionEuropeenne: (
    donnees: DonneesFormulaireSimulateur,
  ): ReponseEtatappartenancePaysUnionEuropeenne => ({
    ...ReponseEtat.construitEtatsDesignationOse(donnees),
    _tag: "appartenancePaysUnionEuropeenne",
    appartenancePaysUnionEuropeenne: {
      appartenancePaysUnionEuropeenne:
        donnees.appartenancePaysUnionEuropeenne[0],
    },
  }),

  construitEtatStructurePrivee: (
    donnees: DonneesFormulaireSimulateur,
  ): ReponseEtatStructure => ({
    ...ReponseEtat.construitEtatappartenancePaysUnionEuropeenne(donnees),
    _tag: "Structure",
    Structure: {
      typeStructure: "privee",
      trancheChiffreAffaire: donnees.trancheChiffreAffaire[0],
      trancheNombreEmployes: donnees.trancheNombreEmployes[0],
    },
  }),

  construitEtatStructurePublique: (
    donnees: DonneesFormulaireSimulateur,
  ): ReponseEtatStructure => ({
    ...ReponseEtat.construitEtatappartenancePaysUnionEuropeenne(donnees),
    _tag: "Structure",
    Structure: {
      typeStructure: "publique",
      typeEntitePublique: donnees.typeEntitePublique[0],
      trancheNombreEmployes: donnees.trancheNombreEmployes[0],
    },
  }),

  construitEtatStructure: (
    donnees: DonneesFormulaireSimulateur,
  ): ReponseEtatStructure =>
    donnees.typeStructure[0] === "publique"
      ? ReponseEtat.construitEtatStructurePublique(donnees)
      : ReponseEtat.construitEtatStructurePrivee(donnees),

  construitEtatInformationsSecteurs: (
    donnees: DonneesFormulaireSimulateur,
  ): ReponseEtatSecteurActiviteComplet => ({
    ...ReponseEtat.construitEtatStructure(donnees),
    _tag: "SecteurActiviteComplet",
    SecteurActiviteComplet: {
      secteurs: [
        {
          secteurActivite: "autreSecteurActivite",
        },
      ],
    },
  }),

  const a = ({
    designationOperateurServicesEssentiels: P.when(exactementUnElement) as GuardP<
      DonneesFormulaireSimulateur["designationOperateurServicesEssentiels"],
      never
    >,
    appartenancePaysUnionEuropeenne: P.when(exactementUnElement),
    typeStructure: P.when(exactementUnElement),
    typeEntitePublique: P.when(exactementUnElement),
    trancheNombreEmployes: P.when(exactementUnElement),
    secteurActivite: P.when(exactementUnElement),
  });
  depuisDonneesFormulaireSimulateur: (
    donnees: DonneesFormulaireSimulateur,
  ): UnionReponseEtat =>
    match(donnees)
      .with(getPattern("designationOperateurServicesEssentiels", "appartenancePaysUnionEuropeenne", "typeStructure"), ReponseEtat.construitEtatInformationsSecteurs)
      .with(
        P.union(
          {
            designationOperateurServicesEssentiels: P.when(exactementUnElement),
            appartenancePaysUnionEuropeenne: P.when(exactementUnElement),
            typeStructure: P.when(exactementUnElement),
            typeEntitePublique: P.when(exactementUnElement),
            trancheNombreEmployes: P.when(exactementUnElement),
          },
          {
            designationOperateurServicesEssentiels: P.when(exactementUnElement),
            appartenancePaysUnionEuropeenne: P.when(exactementUnElement),
            typeStructure: P.when(exactementUnElement),
            trancheChiffreAffaire: P.when(exactementUnElement),
            trancheNombreEmployes: P.when(exactementUnElement),
          },
        ),
        ReponseEtat.construitEtatStructure,
      )
      .with(
        {
          designationOperateurServicesEssentiels: P.when(exactementUnElement),
          appartenancePaysUnionEuropeenne: P.when(exactementUnElement),
        },
        ReponseEtat.construitEtatappartenancePaysUnionEuropeenne,
      )
      .with(
        {
          designationOperateurServicesEssentiels: P.when(exactementUnElement),
        },
        ReponseEtat.construitEtatsDesignationOse,
      )
      .otherwise(ReponseEtat.construitReponseEtatVide),
};
