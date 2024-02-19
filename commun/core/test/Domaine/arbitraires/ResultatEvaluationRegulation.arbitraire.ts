import { fc } from "@fast-check/vitest";
import { ens } from "../../../../utils/services/sets.operations";
import { resultatIncertain } from "../../../src/Domain/Simulateur/Regulation.constantes";
import { ResultatEvaluationRegulation } from "../../../src/Domain/Simulateur/services/Eligibilite/EtatRegulation.definition";
import {
  ReponseEtatInformationsSecteur,
  ReponseEtatStructure,
} from "../../../src/Domain/Simulateur/services/Eligibilite/Reponse.definitions";

export const arbResultatEvaluationRegulationDesigneeOse = fc.constant({
  _tag: "DesignationOperateurServicesEssentiels",
  _resultatEvaluationRegulation: "Inconnu",
  etapeEvaluee: "NonEvalue",
  DesignationOperateurServicesEssentiels: {
    designationOperateurServicesEssentiels: "oui",
  },
}) as fc.Arbitrary<ResultatEvaluationRegulation>;
export const arbResultatEvaluationRegulationNonOse = fc.constant({
  _tag: "DesignationOperateurServicesEssentiels",
  _resultatEvaluationRegulation: "Inconnu",
  etapeEvaluee: "NonEvalue",
  DesignationOperateurServicesEssentiels: {
    designationOperateurServicesEssentiels: "non",
  },
}) as fc.Arbitrary<ResultatEvaluationRegulation>;

export const arbResultatEvaluationRegulationEnSuspensApresOse = fc.constant({
  _tag: "AppartenancePaysUnionEuropeenne",
  _resultatEvaluationRegulation: "EnSuspens",
  etapeEvaluee: "AppartenancePaysUnionEuropeenne",
  ...resultatIncertain,
  DesignationOperateurServicesEssentiels: {
    designationOperateurServicesEssentiels: "non",
  },
  AppartenancePaysUnionEuropeenne: {
    appartenancePaysUnionEuropeenne: "france",
  },
}) as fc.Arbitrary<ResultatEvaluationRegulation>;

export const arbResultatEvaluationRegulationEnSuspensApresOseHorsFrance =
  fc.constantFrom(
    {
      _tag: "AppartenancePaysUnionEuropeenne",
      _resultatEvaluationRegulation: "EnSuspens",
      etapeEvaluee: "AppartenancePaysUnionEuropeenne",
      ...resultatIncertain,
      DesignationOperateurServicesEssentiels: {
        designationOperateurServicesEssentiels: "non",
      },
      AppartenancePaysUnionEuropeenne: {
        appartenancePaysUnionEuropeenne: "autre",
      },
    },
    {
      _tag: "AppartenancePaysUnionEuropeenne",
      _resultatEvaluationRegulation: "EnSuspens",
      etapeEvaluee: "AppartenancePaysUnionEuropeenne",
      ...resultatIncertain,
      DesignationOperateurServicesEssentiels: {
        designationOperateurServicesEssentiels: "non",
      },
      AppartenancePaysUnionEuropeenne: {
        appartenancePaysUnionEuropeenne: "horsue",
      },
    },
  ) as fc.Arbitrary<ResultatEvaluationRegulation>;

const reponseIncertainEtapeStructure: ResultatEvaluationRegulation &
  ReponseEtatStructure = {
  _tag: "Structure",
  _resultatEvaluationRegulation: "EnSuspens",
  etapeEvaluee: "AppartenancePaysUnionEuropeenne",
  ...resultatIncertain,
  DesignationOperateurServicesEssentiels: {
    designationOperateurServicesEssentiels: "non",
  },
  AppartenancePaysUnionEuropeenne: {
    appartenancePaysUnionEuropeenne: "france",
  },
  Structure: {
    _categorieTaille: "Petit",
    typeStructure: "privee",
    trancheChiffreAffaire: "petit",
    trancheNombreEmployes: "petit",
  },
};

export const arbResultatEvaluationRegulationEnSuspensApresOseStructure =
  fc.constant(reponseIncertainEtapeStructure);

const reponseIncertainEtapeSecteur: ResultatEvaluationRegulation &
  ReponseEtatInformationsSecteur = {
  _tag: "InformationsSecteur",
  _resultatEvaluationRegulation: "EnSuspens",
  etapeEvaluee: "Structure",
  ...resultatIncertain,
  DesignationOperateurServicesEssentiels: {
    designationOperateurServicesEssentiels: "non",
  },
  AppartenancePaysUnionEuropeenne: {
    appartenancePaysUnionEuropeenne: "france",
  },
  Structure: {
    _categorieTaille: "Petit",
    typeStructure: "privee",
    trancheChiffreAffaire: "petit",
    trancheNombreEmployes: "petit",
  },
  InformationsSecteur: {
    _categorieTaille: "Petit",
    secteurs: ens({
      secteurActivite: "autreSecteurActivite",
    }),
  },
};
export const arbResultatEvaluationRegulationEnSuspensApresStructurePriveePetite =
  fc.constant(reponseIncertainEtapeSecteur);
