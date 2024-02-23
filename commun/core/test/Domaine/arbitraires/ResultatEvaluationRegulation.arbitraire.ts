import { fc } from "@fast-check/vitest";
import { ResultatEvaluationRegulation } from "../../../src/Domain/Simulateur/services/Eligibilite/EtatRegulation.definitions";
import {
  fabriqueResultatEvaluationEnSuspensAppUE,
  fabriqueResultatEvaluationEnSuspensSecteurGrand,
  fabriqueResultatEvaluationEnSuspensSecteurPetit,
  fabriqueResultatEvaluationEnSuspensStructure,
  fabriqueResultatEvaluationInconnuOse,
} from "./ResultatEvaluationRegulation.arbitraire.fabrique";
import {
  arbAppartenanceUnionEuropeenneJamaisFrance,
  arbAppartenanceUnionEuropeenneToujoursFrance,
  arbDesignationOperateurServicesEssentielsJamaisOui,
  arbDesignationOperateurServicesEssentielsToujoursOui,
  arbInformationsSecteurGrand,
  arbInformationsSecteurLocalisesFrancePetit,
  arbInformationsSecteurLocalisesHorsFrancePetit,
  arbInformationsSecteurPetit,
  arbInformationsSecteurAutrePetit,
  arbStructureGrand,
  arbStructurePetit,
  arbInformationsSecteurAutreGrand,
  arbInformationsSecteurGrandActivitesAutres,
  arbInformationsSecteurLocalisesFranceGrand,
} from "./ResultatEvaluationRegulation.bases.arbitraire";

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

export const arbResultatEvaluationRegulationEnSuspensApresStructureAutrePetits =
  fc
    .tuple(
      arbDesignationOperateurServicesEssentielsJamaisOui,
      arbAppartenanceUnionEuropeenneToujoursFrance,
      arbStructurePetit,
      arbInformationsSecteurAutrePetit,
    )
    .map(fabriqueResultatEvaluationEnSuspensSecteurPetit);
export const arbResultatEvaluationRegulationEnSuspensApresStructureAutreGrand =
  fc
    .tuple(
      arbDesignationOperateurServicesEssentielsJamaisOui,
      arbAppartenanceUnionEuropeenneToujoursFrance,
      arbStructureGrand,
      arbInformationsSecteurAutreGrand,
    )
    .map(fabriqueResultatEvaluationEnSuspensSecteurGrand);

export const arbResultatEvaluationRegulationEnSuspensApresStructureLocalisable =
  fc
    .tuple(
      arbDesignationOperateurServicesEssentielsJamaisOui,
      arbAppartenanceUnionEuropeenneToujoursFrance,
      arbStructurePetit,
      arbInformationsSecteurLocalisesFrancePetit,
    )
    .map(fabriqueResultatEvaluationEnSuspensSecteurPetit);
export const arbResultatEvaluationRegulationEnSuspensApresStructureLocalisableGrand =
  fc
    .tuple(
      arbDesignationOperateurServicesEssentielsJamaisOui,
      arbAppartenanceUnionEuropeenneToujoursFrance,
      arbStructurePetit,
      arbInformationsSecteurLocalisesFranceGrand,
    )
    .map(fabriqueResultatEvaluationEnSuspensSecteurPetit);
export const arbResultatEvaluationRegulationEnSuspensApresStructureGrandNonLocalisable =
  fc
    .tuple(
      arbDesignationOperateurServicesEssentielsJamaisOui,
      arbAppartenanceUnionEuropeenneToujoursFrance,
      arbStructureGrand,
      arbInformationsSecteurGrand,
    )
    .map(fabriqueResultatEvaluationEnSuspensSecteurGrand);
export const arbResultatEvaluationRegulationEnSuspensApresStructureGrandNonLocalisableActivitesAutres =
  fc
    .tuple(
      arbDesignationOperateurServicesEssentielsJamaisOui,
      arbAppartenanceUnionEuropeenneToujoursFrance,
      arbStructureGrand,
      arbInformationsSecteurGrandActivitesAutres,
    )
    .map(fabriqueResultatEvaluationEnSuspensSecteurGrand);
export const arbResultatEvaluationRegulationEnSuspensApresStructureRepresentantLocaliseHorsFrance =
  fc
    .tuple(
      arbDesignationOperateurServicesEssentielsJamaisOui,
      arbAppartenanceUnionEuropeenneToujoursFrance,
      arbStructurePetit,
      arbInformationsSecteurLocalisesHorsFrancePetit,
    )
    .map(fabriqueResultatEvaluationEnSuspensSecteurPetit);

export const arbResultatEvaluationRegulationEnSuspensApresStructurePetitNonEligible =
  fc
    .tuple(
      arbDesignationOperateurServicesEssentielsJamaisOui,
      arbAppartenanceUnionEuropeenneToujoursFrance,
      arbStructurePetit,
      arbInformationsSecteurPetit,
    )
    .map(fabriqueResultatEvaluationEnSuspensSecteurPetit);
