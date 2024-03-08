import { fc } from "@fast-check/vitest";
import { TypeStructure } from "../../../src/Domain/Simulateur/ChampsSimulateur.definitions";
import { ReponseAppartenancePaysUnionEuropeenne } from "../../../src/Domain/Simulateur/services/Eligibilite/ReponseAppartenancePaysUnionEuropeenne.definition";
import { ReponseDesignationOperateurServicesEssentiels } from "../../../src/Domain/Simulateur/services/Eligibilite/ReponseDesignationOperateurServicesEssentiels.definitino";
import { ReponseInformationsSecteur } from "../../../src/Domain/Simulateur/services/Eligibilite/ReponseInformationsSecteur.predicats";
import {
  CategorieTaille,
  ReponseStructure,
} from "../../../src/Domain/Simulateur/services/Eligibilite/ReponseStructure.definitions";

export type FabriqueArbReponseSimulateurParams<T extends CategorieTaille> = [
  ReponseDesignationOperateurServicesEssentiels,
  ReponseAppartenancePaysUnionEuropeenne,
  ReponseStructure<TypeStructure, T>,
  ReponseInformationsSecteur<T>,
];
export type TupleArb_DesignationOSE_AppartenanceUE = [
  fc.Arbitrary<ReponseDesignationOperateurServicesEssentiels>,
  fc.Arbitrary<ReponseAppartenancePaysUnionEuropeenne>,
];
