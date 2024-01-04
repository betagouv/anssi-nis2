import { fc } from "@fast-check/vitest";
import { expect } from "vitest";

function erreurPour<TypeResultat, DonneesPartielles>(
  acte: (donnees: DonneesPartielles) => TypeResultat,
  donnees: DonneesPartielles,
) {
  const nom =
    acte.prototype === undefined
      ? acte.toString()
      : acte.prototype.constructor.name;
  const arg = JSON.stringify(donnees, null, "\t");
  return `Conditions non remplies pour '${nom}' avec les arguments\n${arg}\n`;
}

export const verifieQue = <DonneesPartielles, TypeResultat>(
  acte: (donnees: DonneesPartielles) => TypeResultat,
) => ({
  quelqueSoit: (arbitraire: fc.Arbitrary<DonneesPartielles>) => ({
    renvoieToujours: (resultatAttendu: TypeResultat) =>
      Assure.toujoursEgal(arbitraire, acte, resultatAttendu),
  }),
  pour: (donnees: DonneesPartielles) => ({
    renvoieToujours: (resultatAttendu: TypeResultat) => {
      expect(acte(donnees), erreurPour(acte, donnees)).toBe(resultatAttendu);
    },
    estToujoursVrai: () => {
      expect(acte(donnees), erreurPour(acte, donnees)).toBeTruthy();
    },
    estToujoursFaux: () => {
      expect(acte(donnees), erreurPour(acte, donnees)).toBeFalsy();
    },
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
