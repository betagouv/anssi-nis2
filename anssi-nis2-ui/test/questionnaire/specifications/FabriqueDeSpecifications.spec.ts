import { beforeEach, describe, expect, it } from "vitest";
import {
  etatParDefaut,
  EtatQuestionnaire,
} from "../../../src/questionnaire/reducerQuestionnaire";
import { FabriqueDeSpecifications } from "../../../src/questionnaire/specifications/FabriqueDeSpecifications";
import { SpecificationTexte } from "../../../src/questionnaire/specifications/FormatDesSpecificationsCSV";

describe("La fabrique de spécifications", () => {
  let fabrique: FabriqueDeSpecifications;

  beforeEach(() => {
    fabrique = new FabriqueDeSpecifications();
  });

  describe("pour la règle « d'entité OSE »", () => {
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

    it("sait instancier une règle « Oui »", () => {
      const specs = fabrique.transforme(
        uneSpecification({ "Designation OSE": "Oui" }),
      );

      expect(specs.nombreDeRegles()).toBe(1);
      expect(specs.evalue(entiteOui)).toBe(true);
      expect(specs.evalue(entiteNon)).toBe(false);
      expect(specs.evalue(entiteNeSaitPas)).toBe(false);
    });

    it("sait instancier une règle « Non / Ne sait pas »", () => {
      const specs = fabrique.transforme(
        uneSpecification({ "Designation OSE": "Non / Ne sait pas" }),
      );

      expect(specs.nombreDeRegles()).toBe(1);
      expect(specs.evalue(entiteOui)).toBe(false);
      expect(specs.evalue(entiteNon)).toBe(true);
      expect(specs.evalue(entiteNeSaitPas)).toBe(true);
    });

    it("lève une exception si la valeur reçue n'est pas gérée", () => {
      expect(() =>
        fabrique.transforme(
          uneSpecification({ "Designation OSE": "Mauvaise valeur" }),
        ),
      ).toThrowError("Mauvaise valeur");
    });

    it("n'instancie pas de règle si aucune valeur n'est passée", () => {
      const specifications = fabrique.transforme(
        uneSpecification({ "Designation OSE": "" }),
      );

      expect(specifications.nombreDeRegles()).toBe(0);
    });
  });

  describe("pour la règle de « Localisation »", () => {
    const entiteFrance: EtatQuestionnaire = {
      ...etatParDefaut,
      appartenancePaysUnionEuropeenne: ["france"],
    };
    const entiteAutre: EtatQuestionnaire = {
      ...etatParDefaut,
      appartenancePaysUnionEuropeenne: ["autre"],
    };

    it("sait instancier une règle « France »", () => {
      const specs = fabrique.transforme(
        uneSpecification({ Localisation: "France" }),
      );

      expect(specs.nombreDeRegles()).toBe(1);
      expect(specs.evalue(entiteFrance)).toBe(true);
      expect(specs.evalue(entiteAutre)).toBe(false);
    });

    it("lève une exception si la valeur reçue n'est pas gérée", () => {
      expect(() =>
        fabrique.transforme(uneSpecification({ Localisation: "12345" })),
      ).toThrowError("12345");
    });

    it("n'instancie pas de règle si aucune valeur n'est passée", () => {
      const specifications = fabrique.transforme(
        uneSpecification({ Localisation: "" }),
      );

      expect(specifications.nombreDeRegles()).toBe(0);
    });
  });
});

function uneSpecification(
  surcharge: Partial<SpecificationTexte>,
): SpecificationTexte {
  return {
    "Designation OSE": "",
    Localisation: "",
    "Resultat: statut": "",
    "Resultat: type entite": "",
    ...surcharge,
  };
}
