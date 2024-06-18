import { describe, it, expect } from "vitest";
import { leCSVDeProd } from "./aidesAuxTests";
import { LecteurDeSpecifications } from "../../../src/questionnaire/specifications/LecteurDeSpecifications";

describe("La lecture de la spécification complète en CSV", () => {
  it("se fait sans problème", () => {
    const lecteur = new LecteurDeSpecifications();
    const csv = leCSVDeProd(
      "questionnaire/specifications/specifications-completes.csv",
    );

    const specifications = lecteur.lis(csv);

    expect(specifications.length).toBe(284);
  });
});
