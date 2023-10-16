import { fc } from "@fast-check/vitest";
import { ValeurChampSimulateur } from "../../../src/Domaine/Simulateur/ChampsSimulateur";

export type ArbitraireChampFormulaire<T extends ValeurChampSimulateur> = Record<
  T,
  fc.Arbitrary<T[]>
>;
