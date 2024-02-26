import { fc } from "@fast-check/vitest";
import { TypeStructure } from "../../../src/Domain/Simulateur/ChampsSimulateur.definitions";
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
  arbDesignationOperateurServicesEssentielsToujoursNon,
  arbStructureGrand,
  arbStructurePetit,
} from "./ResultatEvaluationRegulation.bases.arbitraire";

export type TupleArbitrairesDesignationOSE_AppartenanceUE = [
  fc.Arbitrary<ReponseDesignationOperateurServicesEssentiels>,
  fc.Arbitrary<ReponseAppartenancePaysUnionEuropeenne>,
];
export const tupleArbitrairesJamaisOseJamaisFrance: TupleArbitrairesDesignationOSE_AppartenanceUE =
  [
    arbDesignationOperateurServicesEssentielsToujoursNon,
    arbAppartenanceUnionEuropeenneJamaisFrance,
  ];
export const tupleArbitrairesJamaisOseToujoursFrance: TupleArbitrairesDesignationOSE_AppartenanceUE =
  [
    arbDesignationOperateurServicesEssentielsToujoursNon,
    arbAppartenanceUnionEuropeenneToujoursFrance,
  ];

type FabriqueArbReponseSimulateurParams<T extends CategorieTaille> = [
  ReponseDesignationOperateurServicesEssentiels,
  ReponseAppartenancePaysUnionEuropeenne,
  ReponseStructure<TypeStructure, T>,
  ReponseInformationsSecteur<T>,
];
export const mapTupleArbitrairesToujoursFrance =
  <Structure extends TypeStructure, Taille extends CategorieTaille>(
    fabrique: (
      arr: FabriqueArbReponseSimulateurParams<Taille>,
    ) => ResultatEvaluationRegulation,
  ) =>
  (arbStructure: fc.Arbitrary<ReponseStructure<Structure, Taille>>) =>
  (arbInformationsSecteur: fc.Arbitrary<ReponseInformationsSecteur<Taille>>) =>
    fc
      .tuple<FabriqueArbReponseSimulateurParams<Taille>>(
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
