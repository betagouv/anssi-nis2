import { describe, expect, it } from "vitest";
import { SpecificationEntiteOSE } from "../../../src/questionnaire/specifications/SpecificationEntiteOSE";
import {
  etatParDefaut,
  EtatQuestionnaire,
} from "../../../src/questionnaire/reducerQuestionnaire";
import { FabriqueDeSpecifications } from "../../../src/questionnaire/specifications/FabriqueDeSpecifications";

describe("La fabrique de spécifications", () => {
  describe("avec la spécification d'entité OSE", () => {
    const entiteOui: EtatQuestionnaire = {
      ...etatParDefaut,
      designationOperateurServicesEssentiels: ["oui"],
    };
    const entiteNon: EtatQuestionnaire = {
      ...etatParDefaut,
      designationOperateurServicesEssentiels: ["non"],
    };
    const entiteNeSaitPas: EtatQuestionnaire = {
      ...etatParDefaut,
      designationOperateurServicesEssentiels: ["nsp"],
    };

    it("sait instancier une spécification « Oui »", () => {
      const lecteur = new FabriqueDeSpecifications();

      const [specification] = lecteur.transforme({ "Designation OSE": "Oui" });

      expect(specification).toBeInstanceOf(SpecificationEntiteOSE);

      expect(specification.evalue(entiteOui)).toBe(true);
      expect(specification.evalue(entiteNon)).toBe(false);
      expect(specification.evalue(entiteNeSaitPas)).toBe(false);
    });

    it("sait instancier une spécification « Non / Ne sais pas »", () => {
      const lecteur = new FabriqueDeSpecifications();

      const [specification] = lecteur.transforme({
        "Designation OSE": "Non / Ne sait pas",
      });

      expect(specification).toBeInstanceOf(SpecificationEntiteOSE);
      expect(specification.evalue(entiteOui)).toBe(false);
      expect(specification.evalue(entiteNon)).toBe(true);
      expect(specification.evalue(entiteNeSaitPas)).toBe(true);
    });

    it("lève une exception si la spécification reçue n'est pas gérée", () => {
      const lecteur = new FabriqueDeSpecifications();

      expect(() =>
        lecteur.transforme({ "Designation OSE": "Mauvaise valeur" }),
      ).toThrowError("Mauvaise valeur");
    });
  });
});
