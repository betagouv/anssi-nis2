import { fc } from "@fast-check/vitest";
import { TypeStructure } from "../../../src/Domain/Simulateur/ChampsSimulateur.definitions";
import { EtatRegulation } from "../../../src/Domain/Simulateur/services/Eligibilite/EtatRegulation.definitions";
import {
  CategorieTaille,
  ReponseAppartenancePaysUnionEuropeenne,
  ReponseDesignationOperateurServicesEssentiels,
  ReponseInformationsSecteur,
  ReponseStructure,
} from "../../../src/Domain/Simulateur/services/Eligibilite/StructuresReponse.definitions";
import {
  fabriqueResultatEvaluationEnSuspensSecteurGrand,
  fabriqueResultatEvaluationEnSuspensSecteurPetit,
} from "./ResultatEvaluationRegulation.arbitraire.fabrique";
import {
  arbAppartenanceUnionEuropeenne_ToujoursHorsUE,
  arbAppartenanceUnionEuropeenne_ToujoursAutreUE,
  arbDesignationOperateurServicesEssentielsToujoursNon,
  arbStructureGrand,
  arbStructurePetitPrive,
  arbAppartenanceUnionEuropeenne_ToujoursFrance,
} from "./ResultatEvaluationRegulation.bases.arbitraire";

export type TupleArbitrairesDesignationOSE_AppartenanceUE = [
  fc.Arbitrary<ReponseDesignationOperateurServicesEssentiels>,
  fc.Arbitrary<ReponseAppartenancePaysUnionEuropeenne>,
];
export const arbTuple_JamaisOse_ToujoursHorsUE: TupleArbitrairesDesignationOSE_AppartenanceUE =
  [
    arbDesignationOperateurServicesEssentielsToujoursNon,
    arbAppartenanceUnionEuropeenne_ToujoursHorsUE,
  ];
export const arbTuple_JamaisOse_ToujoursFrance: TupleArbitrairesDesignationOSE_AppartenanceUE =
  [
    arbDesignationOperateurServicesEssentielsToujoursNon,
    arbAppartenanceUnionEuropeenne_ToujoursFrance,
  ];
export const arbTuple_JamaisOse_ToujoursAutreUE: TupleArbitrairesDesignationOSE_AppartenanceUE =
  [
    arbDesignationOperateurServicesEssentielsToujoursNon,
    arbAppartenanceUnionEuropeenne_ToujoursAutreUE,
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
    ) => EtatRegulation,
  ) =>
  (arbStructure: fc.Arbitrary<ReponseStructure<Structure, Taille>>) =>
  (arbInformationsSecteur: fc.Arbitrary<ReponseInformationsSecteur<Taille>>) =>
    fc
      .tuple<FabriqueArbReponseSimulateurParams<Taille>>(
        ...arbTuple_JamaisOse_ToujoursFrance,
        arbStructure,
        arbInformationsSecteur,
      )
      .map(fabrique);

export const fabriqueArbJamaisOse_ToujoursFrance_Petit =
  mapTupleArbitrairesToujoursFrance(
    fabriqueResultatEvaluationEnSuspensSecteurPetit,
  );
export const fabriqueArbJamaisOse_ToujoursFrance_StructurePetit =
  fabriqueArbJamaisOse_ToujoursFrance_Petit(arbStructurePetitPrive);
export const fabriqueArbJamaisOse_ToujoursFrance_Grand =
  mapTupleArbitrairesToujoursFrance(
    fabriqueResultatEvaluationEnSuspensSecteurGrand,
  );
export const fabriqueArbJamaisOse_ToujoursFrance_StructureGrand =
  fabriqueArbJamaisOse_ToujoursFrance_Grand(arbStructureGrand);