import { beforeEach, describe, expect, it } from "vitest";
import {
  etatParDefaut,
  EtatQuestionnaire,
} from "../../../src/questionnaire/reducerQuestionnaire";
import { FabriqueDeSpecifications } from "../../../src/questionnaire/specifications/FabriqueDeSpecifications";
import { SpecificationTexte } from "../../../src/questionnaire/specifications/FormatDesSpecificationsCSV";
import { Specifications } from "../../../src/questionnaire/specifications/Specifications";
import { ResultatEligibilite } from "../../../../commun/core/src/Domain/Simulateur/Regulation.definitions";

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
        uneSpecification({ "Designation OSE": "Oui", Resultat: "Regule EE" }),
      );

      expect(specs.nombreDeRegles()).toBe(1);
      expect(specs.evalue(entiteOui)).toMatchObject(reguleEE());
      expect(specs.evalue(entiteNon)).toBe(undefined);
      expect(specs.evalue(entiteNeSaitPas)).toBe(undefined);
    });

    it("sait instancier une règle « Non / Ne sait pas »", () => {
      const specs = fabrique.transforme(
        uneSpecification({
          "Designation OSE": "Non / Ne sait pas",
          Resultat: "Regule EE",
        }),
      );

      expect(specs.nombreDeRegles()).toBe(1);
      expect(specs.evalue(entiteOui)).toBe(undefined);
      expect(specs.evalue(entiteNon)).toMatchObject(reguleEE());
      expect(specs.evalue(entiteNeSaitPas)).toMatchObject(reguleEE());
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
        uneSpecification({ "Designation OSE": "", Resultat: "Regule EE" }),
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
        uneSpecification({ Localisation: "France", Resultat: "Regule EE" }),
      );

      expect(specs.nombreDeRegles()).toBe(1);
      expect(specs.evalue(entiteFrance)).toMatchObject(reguleEE());
      expect(specs.evalue(entiteAutre)).toBe(undefined);
    });

    it("lève une exception si la valeur reçue n'est pas gérée", () => {
      expect(() =>
        fabrique.transforme(uneSpecification({ Localisation: "12345" })),
      ).toThrowError("12345");
    });

    it("n'instancie pas de règle si aucune valeur n'est passée", () => {
      const specifications = fabrique.transforme(
        uneSpecification({ Localisation: "", Resultat: "Regule EE" }),
      );

      expect(specifications.nombreDeRegles()).toBe(0);
    });
  });

  describe("pour le résultat", () => {
    it("sait instancier un résultat « Régulée EE»", () => {
      const specs: Specifications = fabrique.transforme(
        uneSpecification({ Resultat: "Regule EE" }),
      );

      expect(specs.resultat().regulation).toBe("Regule");
      expect(specs.resultat().typeEntite).toBe("EntiteEssentielle");
    });

    it("sait instancier un résultat « Régulée EI »", () => {
      const specs: Specifications = fabrique.transforme(
        uneSpecification({ Resultat: "Regule EI" }),
      );

      expect(specs.resultat().regulation).toBe("Regule");
      expect(specs.resultat().typeEntite).toBe("EntiteImportante");
    });

    it("sait instancier un résultat « Régulée EI »", () => {
      const specs: Specifications = fabrique.transforme(
        uneSpecification({ Resultat: "Regule enregistrement seul" }),
      );

      expect(specs.resultat().regulation).toBe("Regule");
      expect(specs.resultat().typeEntite).toBe("EnregistrementUniquement");
    });

    it("sait instancier un résultat « Régulée Autre Etat Membre »", () => {
      const specs: Specifications = fabrique.transforme(
        uneSpecification({ Resultat: "Regule autre EM" }),
      );

      expect(specs.resultat().regulation).toBe("Regule");
      expect(specs.resultat().typeEntite).toBe("AutreEtatMembreUE");
    });

    it("sait instancier un résultat « Non regulée »", () => {
      const specs: Specifications = fabrique.transforme(
        uneSpecification({ Resultat: "Non regule" }),
      );

      expect(specs.resultat().regulation).toBe("NonRegule");
    });

    it("sait instancier un résultat « Incertain »", () => {
      const specs: Specifications = fabrique.transforme(
        uneSpecification({ Resultat: "Incertain" }),
      );

      expect(specs.resultat().regulation).toBe("Incertain");
      expect(specs.resultat().typeEntite).toBe("AutreEtatMembreUE");
    });

    it("lève une exception si la valeur reçue n'est pas gérée", () => {
      expect(() =>
        fabrique.transforme(uneSpecification({ Resultat: "X" })),
      ).toThrowError("X");
    });
  });
});

function uneSpecification(
  surcharge: Partial<SpecificationTexte>,
): SpecificationTexte {
  return {
    "Designation OSE": "",
    Localisation: "",
    Resultat: "CHAQUE TEST DOIT LE DÉFINIR",
    ...surcharge,
  };
}

function reguleEE(): Partial<ResultatEligibilite> {
  return { regulation: "Regule", typeEntite: "EntiteEssentielle" };
}
