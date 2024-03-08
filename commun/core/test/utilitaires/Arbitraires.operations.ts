import { fc } from "@fast-check/vitest";
import { ens } from "../../../utils/services/sets.operations";

export const Arbitraire = {
  enchaine:
    <TypeArbitraireEntree, TypeArbitraireSortie>(
      chainer: (t: TypeArbitraireEntree) => fc.Arbitrary<TypeArbitraireSortie>,
    ) =>
    (
      arb: fc.Arbitrary<TypeArbitraireEntree>,
    ): fc.Arbitrary<TypeArbitraireSortie> =>
      arb.chain(chainer),
  ensembleDepuisArray: <T>(a: T[]) => fc.constant(ens(...a)),
};
