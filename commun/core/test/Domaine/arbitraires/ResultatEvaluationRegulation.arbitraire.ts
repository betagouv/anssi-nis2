import { fc } from "@fast-check/vitest";
import { TypeStructure } from "../../../src/Domain/Simulateur/ChampsSimulateur.definitions";
import { EtatRegulation } from "../../../src/Domain/Simulateur/services/Eligibilite/EtatRegulation.definitions";
import { ReponseAppartenancePaysUnionEuropeenne } from "../../../src/Domain/Simulateur/services/Eligibilite/ReponseAppartenancePaysUnionEuropeenne.definition";
import { ReponseDesignationOperateurServicesEssentiels } from "../../../src/Domain/Simulateur/services/Eligibilite/ReponseDesignationOperateurServicesEssentiels.definitino";
import { ReponseInformationsSecteur } from "../../../src/Domain/Simulateur/services/Eligibilite/ReponseInformationsSecteur.predicats";
import {
  CategorieTaille,
  ReponseStructure,
} from "../../../src/Domain/Simulateur/services/Eligibilite/ReponseStructure.definitions";
import {
  fabriqueResultatEvaluationEnSuspensSecteur,
  fabriqueResultatEvaluationEnSuspensSecteurPetit,
} from "../../utilitaires/ResultatEvaluationRegulation.arbitraire.fabrique";
import {
  arbReponseAppartenanceUnionEuropeenne_ToujoursAutreUE,
  arbReponseAppartenanceUnionEuropeenne_ToujoursFrance,
  arbReponseAppartenanceUnionEuropeenne_ToujoursHorsUE,
} from "./ReponseAppartenanceUnionEuropeenne.arbitraires";
import { arbReponseDesignationOperateurServicesEssentiels_ToujoursNon } from "./ReponseDesignationOperateurServicesEssentiels.arbitraires";
import {
  arbReponseStructure_ToujoursGrand,
  arbReponseStructure_ToujoursMoyen,
  arbStructurePetitPrive,
} from "./ReponseStructure.arbitraires";

export type TupleArbitrairesDesignationOSE_AppartenanceUE = [
  fc.Arbitrary<ReponseDesignationOperateurServicesEssentiels>,
  fc.Arbitrary<ReponseAppartenancePaysUnionEuropeenne>,
];
export const arbTuple_JamaisOse_ToujoursHorsUE: TupleArbitrairesDesignationOSE_AppartenanceUE =
  [
    arbReponseDesignationOperateurServicesEssentiels_ToujoursNon,
    arbReponseAppartenanceUnionEuropeenne_ToujoursHorsUE,
  ];
export const arbTuple_JamaisOse_ToujoursFrance: TupleArbitrairesDesignationOSE_AppartenanceUE =
  [
    arbReponseDesignationOperateurServicesEssentiels_ToujoursNon,
    arbReponseAppartenanceUnionEuropeenne_ToujoursFrance,
  ];
export const arbTuple_JamaisOse_ToujoursAutreUE: TupleArbitrairesDesignationOSE_AppartenanceUE =
  [
    arbReponseDesignationOperateurServicesEssentiels_ToujoursNon,
    arbReponseAppartenanceUnionEuropeenne_ToujoursAutreUE,
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
export const fabriqueArbJamaisOse_ToujoursFrance =
  mapTupleArbitrairesToujoursFrance(fabriqueResultatEvaluationEnSuspensSecteur);
export const fabriqueArbJamaisOse_ToujoursFrance_StructureMoyen =
  fabriqueArbJamaisOse_ToujoursFrance(arbReponseStructure_ToujoursMoyen);
export const fabriqueArbJamaisOse_ToujoursFrance_StructureGrand =
  fabriqueArbJamaisOse_ToujoursFrance(arbReponseStructure_ToujoursGrand);
