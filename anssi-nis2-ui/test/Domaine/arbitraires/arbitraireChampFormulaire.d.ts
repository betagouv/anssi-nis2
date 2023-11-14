import { fc } from "@fast-check/vitest";
import { ValeurChampSimulateur } from "../../../src/Domaine/Simulateur/ChampsSimulateur.definitions";


export type ArbitraireChampFormulaire<T extends ValeurChampSimulateur, TypesAdditionnelles extends string = T> = Record<
  T | TypesAdditionnelles,
  fc.Arbitrary<T[]>
>;
