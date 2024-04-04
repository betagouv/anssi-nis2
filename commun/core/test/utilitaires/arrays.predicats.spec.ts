import { fc } from "@fast-check/vitest";
import { describe, expect, it } from "vitest";
import { certains, tous } from "../../../utils/services/arrays.predicats";

describe(tous, () => {
  const estPositif = (n: number) => n >= 0;
  const tousPositifs = tous<number>(estPositif);
  it("vérifie tousPositifs quand tous les éléments sont positif", () =>
    fc.assert(
      fc.property<[Array<number>]>(
        fc.uniqueArray(fc.integer({ min: 0 }), { minLength: 1 }),
        (ensemble) => {
          expect(tousPositifs(ensemble)).toBeTruthy();
        },
      ),
    ));
  it("ne vérifie pas tousPositifs quand tous les éléments sont négatifs", () =>
    fc.assert(
      fc.property<[Array<number>]>(
        fc.uniqueArray(fc.integer({ max: -1 })),
        (ensemble) => {
          expect(tousPositifs(ensemble)).toBeFalsy();
        },
      ),
    ));
});

describe(certains, () => {
  const estPositif = (n: number) => n >= 0;
  const certainsPositifs = certains<number>(estPositif);
  it("vérifie certainsPositifs quand tous les éléments sont négatifs sauf un", () =>
    fc.assert(
      fc.property<[Array<number>]>(
        fc
          .tuple(fc.uniqueArray(fc.integer({ max: 0 })), fc.integer({ min: 0 }))
          .chain(([tableauNegatif, entierPositif]) =>
            fc.shuffledSubarray([...tableauNegatif, entierPositif], {
              minLength: tableauNegatif.length + 1,
            }),
          ),
        (ensemble) => {
          expect(certainsPositifs(ensemble)).toBeTruthy();
        },
      ),
    ));
  it("ne vérifie pas tousPositifs quand tous les éléments sont négatifs", () =>
    fc.assert(
      fc.property<[Array<number>]>(
        fc.uniqueArray(fc.integer({ max: -1 })),
        (ensemble) => {
          expect(certainsPositifs(ensemble)).toBeFalsy();
        },
      ),
    ));
});
