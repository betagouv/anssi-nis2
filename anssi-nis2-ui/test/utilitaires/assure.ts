import { fc } from "@fast-check/vitest";
import { expect } from "vitest";

export const assure = {
  toujoursEgal: <TypeArbitraire, TypeResultat>(
    arbitraire: fc.Arbitrary<TypeArbitraire>,
    acte: (donnees: TypeArbitraire) => TypeResultat,
    resultatAttendu: TypeResultat,
  ) =>
    fc.assert(
      fc.property(arbitraire, (donnees) => {
        expect(acte(donnees)).toStrictEqual(resultatAttendu);
      }),
    ),
};
