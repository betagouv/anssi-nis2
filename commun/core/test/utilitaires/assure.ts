import { fc } from "@fast-check/vitest";
import { expect } from "vitest";
import { replace } from "../../../utils/services/string.operations";
import { flow } from "fp-ts/lib/function";

const erreurPour = <TypeResultat, DonneesPartielles>(
  acte: (donnees: DonneesPartielles) => TypeResultat,
  donnees: DonneesPartielles,
) => {
  const nom =
    acte.prototype === undefined
      ? acte.toString()
      : acte.prototype.constructor.name;
  const arg = JSON.stringify(donnees, null, "\t");
  return `Conditions non remplies pour '${nom}' avec les arguments\n${arg}\n`;
};

export const verifieQue = <DonneesPartielles, TypeResultat>(
  acte: (donnees: DonneesPartielles) => TypeResultat,
) => ({
  renvoieToujours: (resultatAttendu: TypeResultat) => ({
    quelqueSoit: (arbitraire: fc.Arbitrary<DonneesPartielles>) =>
      Assure.toujoursEgal(arbitraire, acte, resultatAttendu),
  }),
  satisfait: (predicat: (donnees: TypeResultat) => boolean) => ({
    quelqueSoit: (arbitraire: fc.Arbitrary<DonneesPartielles>) =>
      Assure.satisfait(
        arbitraire,
        acte,
        predicat,
        "Predicat non satisfait sur le résultat %resultat",
      ),
  }),
  estToujoursVrai: () => ({
    quelqueSoit: (arbitraire: fc.Arbitrary<DonneesPartielles>) =>
      Assure.toujoursVrai(
        arbitraire,
        acte as (donnees: DonneesPartielles) => boolean,
      ),
  }),
  estToujoursFaux: () => ({
    quelqueSoit: (arbitraire: fc.Arbitrary<DonneesPartielles>) =>
      Assure.toujoursFaux(
        arbitraire,
        acte as (donnees: DonneesPartielles) => boolean,
      ),
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

const remplitInformations = <TypeArbitraire, TypeResultat>(
  donnees: TypeArbitraire,
  resultat: TypeResultat,
) =>
  flow(
    replace("%donnees", JSON.stringify(donnees)),
    replace("%resultat", JSON.stringify(resultat)),
  );

export const Assure = {
  toujoursEgal: <TypeArbitraire, TypeResultat>(
    arbitraire: fc.Arbitrary<TypeArbitraire>,
    acte: (donnees: TypeArbitraire) => TypeResultat,
    resultatAttendu: TypeResultat,
  ) =>
    fc.assert(
      fc.property<[TypeArbitraire]>(arbitraire, (donnees) => {
        expect(acte(donnees)).toStrictEqual(resultatAttendu);
      }),
      { verbose: 2 },
    ),
  toujoursVrai: <TypeArbitraire>(
    arbitraire: fc.Arbitrary<TypeArbitraire>,
    acte: (donnees: TypeArbitraire) => boolean,
  ) =>
    fc.assert(
      fc.property<[TypeArbitraire]>(arbitraire, (donnees) => {
        expect(acte(donnees)).toBeTruthy();
      }),
      { verbose: 2 },
    ),
  toujoursFaux: <TypeArbitraire>(
    arbitraire: fc.Arbitrary<TypeArbitraire>,
    acte: (donnees: TypeArbitraire) => boolean,
  ) =>
    fc.assert(
      fc.property<[TypeArbitraire]>(arbitraire, (donnees) => {
        expect(acte(donnees)).toBeFalsy();
      }),
      { verbose: 2 },
    ),
  satisfait: <TypeArbitraire, TypeResultat>(
    arbitraire: fc.Arbitrary<TypeArbitraire>,
    acte: (donnees: TypeArbitraire) => TypeResultat,
    predicat: (donnees: TypeResultat) => boolean,
    message?: string,
  ) =>
    fc.assert(
      fc.property<[TypeArbitraire]>(arbitraire, (donnees) => {
        const resultat = acte(donnees);
        expect(resultat).toSatisfy(
          predicat,
          remplitInformations(donnees, resultat)(message ?? ""),
        );
      }),
      { verbose: 2 },
    ),
};
