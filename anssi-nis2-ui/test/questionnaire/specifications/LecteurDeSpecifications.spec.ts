import { describe, expect, it } from "vitest";
import { LecteurDeSpecifications } from "../../../src/questionnaire/specifications/LecteurDeSpecifications";

describe("Le lecteur de spécifications", () => {
  it("utilise un fichier CSV pour produire un tableau de toutes les spécifications", () => {
    const fichier =
      "./test/questionnaire/specifications/specification-deux-lignes.csv";
    const lecteur = new LecteurDeSpecifications();

    const specifications = lecteur.lis(fichier);

    expect(specifications.length).toBe(2);
  });
});
