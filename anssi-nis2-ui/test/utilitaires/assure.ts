import { fc } from "@fast-check/vitest";
import { expect } from "vitest";

export const assure = <TypeArbitraire, TypeResultat>(
  acte: (donnees: TypeArbitraire) => TypeResultat,
) => ({
  sur: (arbitraire: fc.Arbitrary<TypeArbitraire>) => ({
    toujoursEgal: (resultatAttendu: TypeResultat) =>
      Assure.toujoursEgal(arbitraire, acte, resultatAttendu),
  }),
});

export const Assure = {
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
