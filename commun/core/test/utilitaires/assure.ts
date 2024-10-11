import { fc } from "@fast-check/vitest";
import { expect } from "vitest";

export const verifieQue = <DonneesPartielles, TypeResultat>(
  acte: (donnees: DonneesPartielles) => TypeResultat
) => ({
  estToujoursVrai: () => ({
    quelqueSoit: (arbitraire: fc.Arbitrary<DonneesPartielles>) =>
      Assure.toujoursVrai(
        arbitraire,
        acte as (donnees: DonneesPartielles) => boolean
      ),
  }),
});

export const Assure = {
  toujoursVrai: <TypeArbitraire>(
    arbitraire: fc.Arbitrary<TypeArbitraire>,
    acte: (donnees: TypeArbitraire) => boolean
  ) =>
    fc.assert(
      fc.property<[TypeArbitraire]>(arbitraire, (donnees) => {
        expect(acte(donnees)).toBeTruthy();
      }),
      { verbose: 2 }
    ),
};
