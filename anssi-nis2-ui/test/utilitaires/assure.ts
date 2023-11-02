import { fc } from "@fast-check/vitest";
import { expect } from "vitest";
import { DonneesFormulaireExtensibles } from "./manipulationArbitraires";

export const assure = <
  DonneesPartielles extends DonneesFormulaireExtensibles,
  TypeResultat,
>(
  acte: (donnees: DonneesPartielles) => TypeResultat,
) => ({
  sur: (arbitraire: fc.Arbitrary<DonneesPartielles>) => ({
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
