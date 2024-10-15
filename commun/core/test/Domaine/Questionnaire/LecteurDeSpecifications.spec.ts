import { describe, expect, it } from "vitest";
import { LecteurDeSpecifications } from "../../../src/Domain/Questionnaire/LecteurDeSpecifications";
import { leCSV } from "./aidesAuxTests";

describe("Le lecteur de spécifications", () => {
  it("utilise un fichier CSV pour produire un tableau de toutes les spécifications", () => {
    const lecteur = new LecteurDeSpecifications();
    const fichier = leCSV("specification-une-ligne.csv");

    const specifications = lecteur.lis(fichier);

    expect(specifications.nombre()).toBe(1);
  });

  it("lève une exception si les colonnes du CSV ne sont pas celles attendues", () => {
    expect(() =>
      new LecteurDeSpecifications().lis(
        leCSV("specification-colonne-manquante.csv"),
      ),
    ).toThrowError("manque des colonnes");
  });
});
