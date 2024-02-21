import { fc } from "@fast-check/vitest";
import { resultatIncertain } from "../../../src/Domain/Simulateur/Regulation.constantes";
import { FabriqueEtatDonneesSimulateur } from "../../../src/Domain/Simulateur/services/Eligibilite/EtatDonneesSimulateur.fabrique";
import { ResultatEvaluationRegulation } from "../../../src/Domain/Simulateur/services/Eligibilite/EtatRegulation.definition";
import {
  fabriqueResultatEvaluationEnSuspens,
  fabriqueResultatEvaluationInconnu,
} from "../../../src/Domain/Simulateur/services/Eligibilite/EtatRegulation.fabriques";
import {
  ReponseStructure,
  ReponseStructurePetit,
  ReponseInformationsSecteurPetit,
  ReponseDesignationOperateurServicesEssentiels,
  ReponseAppartenancePaysUnionEuropeenne,
} from "../../../src/Domain/Simulateur/services/Eligibilite/Reponse.definitions";
import {
  arbAppartenanceUnionEuropeenneJamaisFrance,
  arbAppartenanceUnionEuropeenneToujoursFrance,
  arbDesignationOperateurServicesEssentielsJamaisOui,
  arbDesignationOperateurServicesEssentielsToujoursOui,
  arbInformationsSecteurLocalisesFrancePetit,
  arbInformationsSecteurPetit,
  arbInformationsSecteurPetitAutre,
  arbStructurePetit,
} from "./ResultatEvaluationRegulation.bases.arbitraire";

// const arbStructure = fc.oneof(arbStructurePetit);

const fabriqueResultatEvaluationInconnuOse = (
  designationOperateurServicesEssentiels: ReponseDesignationOperateurServicesEssentiels,
) =>
  fabriqueResultatEvaluationInconnu({
    _tag: "DesignationOperateurServicesEssentiels",
    DesignationOperateurServicesEssentiels:
      designationOperateurServicesEssentiels,
  });

const fabriqueResultatEvaluationEnSuspensAppUE = ([
  designationOperateurServicesEssentiel,
  appartenancePaysUnionEuropeenne,
]: [
  ReponseDesignationOperateurServicesEssentiels,
  ReponseAppartenancePaysUnionEuropeenne,
]) =>
  fabriqueResultatEvaluationEnSuspens(
    "AppartenancePaysUnionEuropeenne",
    resultatIncertain,
    FabriqueEtatDonneesSimulateur.appartenancePaysUnionEuropeenneChaine(
      designationOperateurServicesEssentiel,
      appartenancePaysUnionEuropeenne,
    ),
  );
const fabriqueResultatEvaluationEnSuspensStructure = ([
  designationOperateurServicesEssentiel,
  appartenancePaysUnionEuropeenne,
  structure,
]: [
  ReponseDesignationOperateurServicesEssentiels,
  ReponseAppartenancePaysUnionEuropeenne,
  ReponseStructure,
]) =>
  fabriqueResultatEvaluationEnSuspens(
    "AppartenancePaysUnionEuropeenne",
    resultatIncertain,
    FabriqueEtatDonneesSimulateur.structureChaine(
      designationOperateurServicesEssentiel,
      appartenancePaysUnionEuropeenne,
      structure,
    ),
  );

const fabriqueResultatEvaluationEnSuspensSecteurPetit = ([
  designationOperateurServicesEssentiel,
  appartenancePaysUnionEuropeenne,
  structure,
  informationsSecteur,
]: [
  ReponseDesignationOperateurServicesEssentiels,
  ReponseAppartenancePaysUnionEuropeenne,
  ReponseStructurePetit,
  ReponseInformationsSecteurPetit,
]) =>
  fabriqueResultatEvaluationEnSuspens(
    "Structure",
    resultatIncertain,
    FabriqueEtatDonneesSimulateur.informationsSecteurPetitChaine(
      designationOperateurServicesEssentiel,
      appartenancePaysUnionEuropeenne,
      structure,
      informationsSecteur,
    ),
  );

export const arbResultatEvaluationRegulationDesigneeOse =
  arbDesignationOperateurServicesEssentielsToujoursOui.map(
    fabriqueResultatEvaluationInconnuOse,
  ) as fc.Arbitrary<ResultatEvaluationRegulation>;

export const arbResultatEvaluationRegulationNonOse =
  arbDesignationOperateurServicesEssentielsJamaisOui.map(
    fabriqueResultatEvaluationInconnuOse,
  ) as fc.Arbitrary<ResultatEvaluationRegulation>;
export const arbResultatEvaluationRegulationEnSuspensApresLocalisationFrance =
  fc
    .tuple(
      arbDesignationOperateurServicesEssentielsJamaisOui,
      arbAppartenanceUnionEuropeenneToujoursFrance,
    )
    .map(
      fabriqueResultatEvaluationEnSuspensAppUE,
    ) as fc.Arbitrary<ResultatEvaluationRegulation>;
export const arbResultatEvaluationRegulationEnSuspensApresLocalisationHorsFrance =
  fc
    .tuple(
      arbDesignationOperateurServicesEssentielsJamaisOui,
      arbAppartenanceUnionEuropeenneJamaisFrance,
    )
    .map(
      fabriqueResultatEvaluationEnSuspensAppUE,
    ) as fc.Arbitrary<ResultatEvaluationRegulation>;

export const arbResultatEvaluationRegulationEnSuspensApresLocalisation = fc
  .tuple(
    arbDesignationOperateurServicesEssentielsJamaisOui,
    arbAppartenanceUnionEuropeenneToujoursFrance,
    arbStructurePetit,
  )
  .map(fabriqueResultatEvaluationEnSuspensStructure);

export const arbResultatEvaluationRegulationEnSuspensApresStructureAutre = fc
  .tuple(
    arbDesignationOperateurServicesEssentielsJamaisOui,
    arbAppartenanceUnionEuropeenneToujoursFrance,
    arbStructurePetit,
    arbInformationsSecteurPetitAutre,
  )
  .map(fabriqueResultatEvaluationEnSuspensSecteurPetit);

export const arbResultatEvaluationRegulationEnSuspensApresStructure = fc
  .tuple(
    arbDesignationOperateurServicesEssentielsJamaisOui,
    arbAppartenanceUnionEuropeenneToujoursFrance,
    arbStructurePetit,
    arbInformationsSecteurPetit,
  )
  .map(fabriqueResultatEvaluationEnSuspensSecteurPetit);
export const arbResultatEvaluationRegulationEnSuspensApresStructureLocalisable =
  fc
    .tuple(
      arbDesignationOperateurServicesEssentielsJamaisOui,
      arbAppartenanceUnionEuropeenneToujoursFrance,
      arbStructurePetit,
      arbInformationsSecteurLocalisesFrancePetit,
    )
    .map(fabriqueResultatEvaluationEnSuspensSecteurPetit);
