import { describe, expect, it } from "vitest";
import { leCSVDeProd } from "./aidesAuxTests";
import { LecteurDeSpecifications } from "../../../src/Domain/Questionnaire/LecteurDeSpecifications";

describe("La lecture de la spécification complète en CSV", () => {
  it("se fait sans problème", () => {
    const lecteur = new LecteurDeSpecifications();
    const csv = leCSVDeProd();

    const specifications = lecteur.lis(csv);

    expect(specifications.nombre()).toBe(673);
  });
});
