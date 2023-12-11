import { describe, expect, it } from "vitest";
import {
  dansIntervalle,
  Intervalle,
} from "../../src/Domaine/utilitaires/calculs";

describe(dansIntervalle, () => {
  it.each([2, 3, 4, 5, 6, 7, 8])(
    "%i devrait être dans l'intervale 2 à 8",
    (x) => {
      expect(dansIntervalle(x, 2, 8)).toBe(true);
    },
  );
});

describe(Intervalle, () => {
  it.each([
    { debut: 0, fin: 5, intervalleAttendu: [0, 1, 2, 3, 4, 5] },
    { debut: 3, fin: 7, intervalleAttendu: [3, 4, 5, 6, 7] },
    { debut: 8, fin: 4, intervalleAttendu: [4, 5, 6, 7, 8] },
    { debut: -8, fin: -2, intervalleAttendu: [-8, -7, -6, -5, -4, -3, -2] },
  ])(
    "créé toutes les valeurs de $debut à $fin",
    ({ debut, fin, intervalleAttendu }) => {
      const intervalleCalcule = new Intervalle(debut, fin);

      expect(intervalleCalcule).toBeInstanceOf(Intervalle);
      expect(intervalleCalcule).toEqual(intervalleAttendu);
    },
  );

  it.each([2, 3, 4, 5, 6, 7, 8])(
    "%i devrait être dans l'intervale 2 à 8",
    (x) => {
      const intervalleCalcule = new Intervalle(2, 8);
      expect(intervalleCalcule.contient(x)).toBe(true);
    },
  );
});
