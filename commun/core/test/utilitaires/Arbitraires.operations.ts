import { fc } from "@fast-check/vitest";

export const Arbitraire = {
  enchaine:
    <T, U>(chainer: (t: T) => fc.Arbitrary<U>) =>
    (arb: fc.Arbitrary<T>): fc.Arbitrary<U> =>
      arb.chain(chainer),
};
