import { fc } from "@fast-check/vitest";
import { ens } from "../../../utils/services/sets.operations";

export const Arbitraire = {
  ensembleDepuisArray: <T>(a: T[]) => fc.constant(ens(...a)),
};
