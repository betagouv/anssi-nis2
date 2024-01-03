import { fc } from "@fast-check/vitest";
import { expect } from "vitest";

export const verifieQue = <DonneesPartielles, TypeResultat>(
  acte: (donnees: DonneesPartielles) => TypeResultat,
) => ({
  quelqueSoit: (arbitraire: fc.Arbitrary<DonneesPartielles>) => ({
    renvoieToujours: (resultatAttendu: TypeResultat) =>
      Assure.toujoursEgal(arbitraire, acte, resultatAttendu),
  }),
  pour: (donnees: DonneesPartielles) => ({
    renvoieToujours: (resultatAttendu: TypeResultat) =>
      expect(
        acte(donnees),
        `Conditions non remplies pour '${acte.name}'` +
          `avec les arguments ${JSON.stringify(donnees)}`,
      ).toBe(resultatAttendu),
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
      { verbose: 2 },
    ),
};