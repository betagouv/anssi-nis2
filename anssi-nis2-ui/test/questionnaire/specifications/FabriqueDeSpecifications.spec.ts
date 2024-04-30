import { beforeEach, describe, expect, it } from "vitest";
import { SpecificationEntiteOSE } from "../../../src/questionnaire/specifications/SpecificationEntiteOSE";
import {
  etatParDefaut,
  EtatQuestionnaire,
} from "../../../src/questionnaire/reducerQuestionnaire";
import {
  FabriqueDeSpecifications,
  SpecificationTexte,
} from "../../../src/questionnaire/specifications/FabriqueDeSpecifications";

describe("La fabrique de spécifications", () => {
  let fabrique: FabriqueDeSpecifications;

  beforeEach(() => {
    fabrique = new FabriqueDeSpecifications();
  });

  describe("pour la spécification « d'entité OSE »", () => {
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
      const [specification] = fabrique.transforme(
        uneSpecification({ "Designation OSE": "Oui" }),
      );

      expect(specification).toBeInstanceOf(SpecificationEntiteOSE);

      expect(specification.evalue(entiteOui)).toBe(true);
      expect(specification.evalue(entiteNon)).toBe(false);
      expect(specification.evalue(entiteNeSaitPas)).toBe(false);
    });

    it("sait instancier une spécification « Non / Ne sait pas »", () => {
      const [specification] = fabrique.transforme(
        uneSpecification({ "Designation OSE": "Non / Ne sait pas" }),
      );

      expect(specification).toBeInstanceOf(SpecificationEntiteOSE);
      expect(specification.evalue(entiteOui)).toBe(false);
      expect(specification.evalue(entiteNon)).toBe(true);
      expect(specification.evalue(entiteNeSaitPas)).toBe(true);
    });

    it("lève une exception si la spécification reçue n'est pas gérée", () => {
      expect(() =>
        fabrique.transforme(
          uneSpecification({ "Designation OSE": "Mauvaise valeur" }),
        ),
      ).toThrowError("Mauvaise valeur");
    });

    it("n'instancie pas de spécification si aucune valeur n'est passée", () => {
      const specifications = fabrique.transforme(
        uneSpecification({ "Designation OSE": "" }),
      );

      expect(specifications.length).toBe(0);
    });
  });

  describe("pour la spécification de « Localisation »", () => {
    const entiteFrance: EtatQuestionnaire = {
      ...etatParDefaut,
      appartenancePaysUnionEuropeenne: ["france"],
    };
    const entiteAutre: EtatQuestionnaire = {
      ...etatParDefaut,
      appartenancePaysUnionEuropeenne: ["autre"],
    };

    it("sait instancier une spécification « France »", () => {
      const [specification] = fabrique.transforme(
        uneSpecification({ Localisation: "France" }),
      );

      const accepteFrance = specification.evalue(entiteFrance);
      const accepteAutre = specification.evalue(entiteAutre);

      expect(accepteFrance).toBe(true);
      expect(accepteAutre).toBe(false);
    });

    it("lève une exception si la spécification reçue n'est pas gérée", () => {
      expect(() =>
        fabrique.transforme(uneSpecification({ Localisation: "12345" })),
      ).toThrowError("12345");
    });

    it("n'instancie pas de spécification si aucune valeur n'est passée", () => {
      const specifications = fabrique.transforme(
        uneSpecification({ Localisation: "" }),
      );

      expect(specifications.length).toBe(0);
    });
  });
});

function uneSpecification(
  surcharge: Partial<SpecificationTexte>,
): SpecificationTexte {
  return { "Designation OSE": "", Localisation: "", ...surcharge };
}
