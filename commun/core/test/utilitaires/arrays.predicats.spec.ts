import { describe, expect, it } from "vitest";
import { certains, tous } from "../../../utils/services/arrays.predicats";

describe(tous, () => {
  const estPositif = (n: number) => n >= 0;
  const tousPositifs = tous<number>(estPositif);
  it("vérifie tousPositifs quand tous les éléments sont positif", () => {
    expect(tousPositifs([1, 2, 3])).toBeTruthy();
  });

  it("ne vérifie pas tousPositifs quand tous les éléments sont négatifs", () => {
    expect(tousPositifs([-1, 1])).toBeFalsy();
  });
});

describe(certains, () => {
  const estPositif = (n: number) => n >= 0;
  const certainsPositifs = certains<number>(estPositif);
  it("vérifie certainsPositifs quand tous les éléments sont négatifs sauf un", () => {
    expect(certainsPositifs([1, 2, -1])).toBeTruthy();
  });
  it("ne vérifie pas tousPositifs quand tous les éléments sont négatifs", () => {
    expect(certainsPositifs([-1, -2])).toBeFalsy();
  });
});
