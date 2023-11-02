import { fc } from "@fast-check/vitest";
import { expect } from "vitest";
import { DonneesFormulaireExtensibles } from "./manipulationArbitraires";

export const verifieQue = <
  DonneesPartielles extends DonneesFormulaireExtensibles,
  TypeResultat,
>(
  acte: (donnees: DonneesPartielles) => TypeResultat,
) => ({
  quelqueSoit: (arbitraire: fc.Arbitrary<DonneesPartielles>) => ({
    renvoieToujours: (resultatAttendu: TypeResultat) =>
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
