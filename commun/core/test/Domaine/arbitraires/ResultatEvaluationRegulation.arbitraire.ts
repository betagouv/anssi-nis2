import { fc } from "@fast-check/vitest";
import { ResultatEvaluationRegulation } from "../../../src/Domain/Simulateur/services/Eligibilite/EtatRegulation.definitions";
import {
  fabriqueResultatEvaluationEnSuspensAppUE,
  fabriqueResultatEvaluationEnSuspensSecteurPetit,
  fabriqueResultatEvaluationEnSuspensStructure,
  fabriqueResultatEvaluationInconnuOse,
} from "./ResultatEvaluationRegulation.arbitraire.fabrique";
import {
  arbAppartenanceUnionEuropeenneJamaisFrance,
  arbAppartenanceUnionEuropeenneToujoursFrance,
  arbDesignationOperateurServicesEssentielsJamaisOui,
  arbDesignationOperateurServicesEssentielsToujoursOui,
  arbInformationsSecteurLocalisesFrancePetit,
  arbInformationsSecteurLocalisesHorsFrancePetit,
  arbInformationsSecteurPetit,
  arbInformationsSecteurPetitAutre,
  arbStructurePetit,
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
