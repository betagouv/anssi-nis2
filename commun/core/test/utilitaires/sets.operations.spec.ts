import { fc } from "@fast-check/vitest";
import { describe, expect, it } from "vitest";
import {
  ens,
  ensembleNeutre,
  fromArray,
  tous,
  union,
} from "../../../utils/services/sets.operations";

describe("Operations sur ensembles (Set)", () => {
  describe("Union", () => {
    it("2 elements neutres", () => {
      const resultatObtenu = union(ensembleNeutre, ensembleNeutre);
      expect(resultatObtenu).toStrictEqual(ensembleNeutre);
    });
    it("un ensemble avec un element neutre", () => {
      const ensemble = new Set([1, 2, 3]);
      expect(union(ensemble, ensembleNeutre)).toStrictEqual(ensemble);
    });
    it("un element neutre avec un ensemble", () => {
      const ensemble = new Set([1, 2, 3]);
      expect(union(ensembleNeutre, ensemble)).toStrictEqual(ensemble);
    });
    it("deux ensembles", () => {
      const ensemble1 = new Set([1, 2, 3]);
      const ensemble2 = new Set([4, 5, 6]);
      const ensembleAttendu = new Set([1, 2, 3, 4, 5, 6]);
      expect(union(ensemble1, ensemble2)).toStrictEqual(ensembleAttendu);
    });
  });
  describe("creátion d'ensemble", () => {
    it("crée un ensemble neutre par défaut", () => {
      expect(ens()).toStrictEqual(ensembleNeutre);
    });
    it("crée un ensemble avec des éléments simples", () => {
      expect(ens(1, 2, 3)).toStrictEqual(new Set([1, 2, 3]));
    });
  });
  describe(tous, () => {
    const estPositif = (n: number) => n >= 0;
    const tousPositifs = tous<number>(estPositif);
    it("vérifie tousPositifs quand tous les éléments sont positif", () =>
      fc.assert(
        fc.property<[Set<number>]>(
          fc
            .uniqueArray(fc.integer({ min: 0 }), { minLength: 1 })
            .map(fromArray),
          (ensemble) => {
            expect(tousPositifs(ensemble)).toBeTruthy();
          },
        ),
      ));
    it("ne vérifie pas tousPositifs quand tous les éléments sont négatifs", () =>
      fc.assert(
        fc.property<[Set<number>]>(
          fc.uniqueArray(fc.integer({ max: 0 })).map(fromArray),
          (arr) => {
            expect(tousPositifs(new Set(arr))).toBeFalsy();
          },
        ),
      ));
  });
});
