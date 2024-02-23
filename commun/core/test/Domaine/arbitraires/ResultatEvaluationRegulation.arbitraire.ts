import { fc } from "@fast-check/vitest";
import { ResultatEvaluationRegulation } from "../../../src/Domain/Simulateur/services/Eligibilite/EtatRegulation.definitions";
import {
  CategorieTaille,
  ReponseAppartenancePaysUnionEuropeenne,
  ReponseDesignationOperateurServicesEssentiels,
  ReponseInformationsSecteur,
  ReponseStructure,
} from "../../../src/Domain/Simulateur/services/Eligibilite/Reponse.definitions";
import {
  fabriqueResultatEvaluationEnSuspensSecteurGrand,
  fabriqueResultatEvaluationEnSuspensSecteurPetit,
} from "./ResultatEvaluationRegulation.arbitraire.fabrique";
import {
  arbAppartenanceUnionEuropeenneJamaisFrance,
  arbAppartenanceUnionEuropeenneToujoursFrance,
  arbDesignationOperateurServicesEssentielsJamaisOui,
  arbStructureGrand,
  arbStructurePetit,
} from "./ResultatEvaluationRegulation.bases.arbitraire";

export type TupleArbitrairesDesignationOSE_AppartenanceUE = [
  fc.Arbitrary<ReponseDesignationOperateurServicesEssentiels>,
  fc.Arbitrary<ReponseAppartenancePaysUnionEuropeenne>,
];
export const tupleArbitrairesJamaisOseJamaisFrance: TupleArbitrairesDesignationOSE_AppartenanceUE =
  [
    arbDesignationOperateurServicesEssentielsJamaisOui,
    arbAppartenanceUnionEuropeenneJamaisFrance,
  ];
export const tupleArbitrairesJamaisOseToujoursFrance: TupleArbitrairesDesignationOSE_AppartenanceUE =
  [
    arbDesignationOperateurServicesEssentielsJamaisOui,
    arbAppartenanceUnionEuropeenneToujoursFrance,
  ];

type FabriqueArbReponseSimulateurParams<T extends CategorieTaille> = [
  ReponseDesignationOperateurServicesEssentiels,
  ReponseAppartenancePaysUnionEuropeenne,
  ReponseStructure<T>,
  ReponseInformationsSecteur<T>,
];
export const mapTupleArbitrairesToujoursFrance =
  <T extends CategorieTaille>(
    fabrique: (
      arr: FabriqueArbReponseSimulateurParams<T>,
    ) => ResultatEvaluationRegulation,
  ) =>
  (arbStructure: fc.Arbitrary<ReponseStructure<T>>) =>
  (arbInformationsSecteur: fc.Arbitrary<ReponseInformationsSecteur<T>>) =>
    fc
      .tuple<FabriqueArbReponseSimulateurParams<T>>(
        ...tupleArbitrairesJamaisOseToujoursFrance,
        arbStructure,
        arbInformationsSecteur,
      )
      .map(fabrique);

export const fabriqueArbJamaisOse_ToujoursFrance_Petit =
  mapTupleArbitrairesToujoursFrance(
    fabriqueResultatEvaluationEnSuspensSecteurPetit,
  );
export const fabriqueArbJamaisOse_ToujoursFrance_StructurePetit =
  fabriqueArbJamaisOse_ToujoursFrance_Petit(arbStructurePetit);
export const fabriqueArbJamaisOse_ToujoursFrance_Grand =
  mapTupleArbitrairesToujoursFrance(
    fabriqueResultatEvaluationEnSuspensSecteurGrand,
  );
export const fabriqueArbJamaisOse_ToujoursFrance_StructureGrand =
  fabriqueArbJamaisOse_ToujoursFrance_Grand(arbStructureGrand);