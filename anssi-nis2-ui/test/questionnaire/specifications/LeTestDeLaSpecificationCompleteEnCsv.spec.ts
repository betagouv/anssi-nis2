import { describe, it, expect } from "vitest";
import { parse } from "papaparse";
import { leCSVDeProd } from "./aidesAuxTests";
import { LecteurDeSpecifications } from "../../../src/questionnaire/specifications/LecteurDeSpecifications";
import { SpecificationTexte } from "../../../src/questionnaire/specifications/FormatDesSpecificationsCSV";

describe("La lecture de la spécification complète en CSV", () => {
  it("se fait sans problème", () => {
    const lecteur = new LecteurDeSpecifications();
    const csv = leCSVDeProd(
      "questionnaire/specifications/specifications-completes.csv",
    );

    const specifications = lecteur.lis(csv);

    expect(specifications.nombre()).toBe(673);
  });

  it("ne détecte pas de points d'attention en doublon", () => {
    const csv = leCSVDeProd(
      "questionnaire/specifications/specifications-completes.csv",
    );

    const lignes = parse<SpecificationTexte>(csv, {
      header: true,
      skipEmptyLines: true,
      delimiter: ";",
    });

    const tousLesPointsAttention = lignes.data.map((l) => ({
      code: l.Code,
      points: l["Points d'attention"],
    }));

    const groupeLesPoints = (points: string[]): Record<string, number> =>
      points.reduce(
        (resultat, id) => ({ ...resultat, [id]: (resultat[id] || 0) + 1 }),
        {},
      );

    const doublons = tousLesPointsAttention
      .map(({ code, points }) => {
        const enTableau = points
          .split(",")
          .map((v) => v.trim().replace("#", ""));
        const groupes = groupeLesPoints(enTableau);
        return { code, points, groupes };
      })
      .filter(({ groupes }) =>
        Object.values(groupes).find((nbOccurences) => nbOccurences > 1),
      );

    if (doublons.length > 0) {
      const codes = doublons.map((d) => d.code);
      throw Error(
        `Des doublons de points d'attention ont été détectés dans les lignes suivantes : ${codes}`,
      );
    }
  });
});
