import { fc } from "@fast-check/vitest";
import { ens } from "../../../utils/services/sets.operations";

export const Arbitraire = {
  enchaine:
    <T, U>(chainer: (t: T) => fc.Arbitrary<U>) =>
    (arb: fc.Arbitrary<T>): fc.Arbitrary<U> =>
      arb.chain(chainer),
  ensembleDepuisArray: <T>(a: T[]) => fc.constant(ens(...a)),
};
