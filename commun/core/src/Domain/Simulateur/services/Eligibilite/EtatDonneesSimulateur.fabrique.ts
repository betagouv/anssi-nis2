import { DonneesFormulaireSimulateur } from "../../DonneesFormulaire.definitions";
import {
  ReponseEtatAppartenancePaysUnionEuropeenne,
  ReponseEtatDesignationOperateurServicesEssentiels,
  ReponseEtatStructure,
  UnionReponseEtat,
} from "./Reponse.definitions";
import { match, P } from "ts-pattern";

const exactementUnElement = <T extends string>(a: T[]) => a.length === 1;

export const ReponseEtat = {
  construitEtatsDesignationOse: (
    donnees: DonneesFormulaireSimulateur,
  ): ReponseEtatDesignationOperateurServicesEssentiels => ({
    _tag: "DesignationOperateurServicesEssentiels",
    DesignationOperateurServicesEssentiels: {
      designationOperateurServicesEssentiels:
        donnees.designationOperateurServicesEssentiels[0],
    },
  }),

  construitEtatAppartenancePaysUnionEuropeenne: (
    donnees: DonneesFormulaireSimulateur,
  ): ReponseEtatAppartenancePaysUnionEuropeenne => ({
    ...ReponseEtat.construitEtatsDesignationOse(donnees),
    _tag: "AppartenancePaysUnionEuropeenne",
    AppartenancePaysUnionEuropeenne: {
      appartenancePaysUnionEuropeenne:
        donnees.appartenancePaysUnionEuropeenne[0],
    },
  }),

  construitEtatStructurePrivee: (
    donnees: DonneesFormulaireSimulateur,
  ): ReponseEtatStructure => ({
    ...ReponseEtat.construitEtatAppartenancePaysUnionEuropeenne(donnees),
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
    ...ReponseEtat.construitEtatAppartenancePaysUnionEuropeenne(donnees),
    _tag: "Structure",
    Structure: {
      typeStructure: "publique",
      typeEntitePublique: donnees.typeEntitePublique[0],
      trancheNombreEmployes: donnees.trancheNombreEmployes[0],
    },
  }),

  depuisDonneesFormulaireSimulateur: (
    donnees: DonneesFormulaireSimulateur,
  ): UnionReponseEtat =>
    match(donnees)
      .with(
        {
          designationOperateurServicesEssentiels: P.when(exactementUnElement),
          appartenancePaysUnionEuropeenne: P.when(exactementUnElement),
          typeStructure: ["publique"],
          typeEntitePublique: P.when(exactementUnElement),
          trancheNombreEmployes: P.when(exactementUnElement),
        },
        ReponseEtat.construitEtatStructurePublique,
      )
      .with(
        {
          designationOperateurServicesEssentiels: P.when(exactementUnElement),
          appartenancePaysUnionEuropeenne: P.when(exactementUnElement),
          typeStructure: ["privee"],
          trancheChiffreAffaire: P.when(exactementUnElement),
          trancheNombreEmployes: P.when(exactementUnElement),
        },
        ReponseEtat.construitEtatStructurePrivee,
      )
      .with(
        {
          designationOperateurServicesEssentiels: P.when(exactementUnElement),
          appartenancePaysUnionEuropeenne: P.when(exactementUnElement),
        },
        ReponseEtat.construitEtatAppartenancePaysUnionEuropeenne,
      )
      .with(
        {
          designationOperateurServicesEssentiels: P.when(exactementUnElement),
        },
        ReponseEtat.construitEtatsDesignationOse,
      )
      .otherwise(() => ({ _tag: "ReponseEtatVide" })),
};
