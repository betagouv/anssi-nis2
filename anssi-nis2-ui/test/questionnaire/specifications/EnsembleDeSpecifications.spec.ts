import { describe, expect, it } from "vitest";
import { EnsembleDeSpecifications } from "../../../src/questionnaire/specifications/EnsembleDeSpecifications";
import { RegleEntiteOSE } from "../../../src/questionnaire/specifications/regles/RegleEntiteOSE";
import { Specifications } from "../../../src/questionnaire/specifications/Specifications";
import {
  neSaitPas,
  nonRegulee,
  reguleEE,
  reguleEI,
  reguleEnregistrementSeul,
  reguleSansPrecision,
} from "./aidesAuxTests";
import {
  etatParDefaut,
  EtatQuestionnaire,
} from "../../../src/questionnaire/reducerQuestionnaire";
import { RegleSecteurs } from "../../../src/questionnaire/specifications/regles/RegleSecteurs";

describe("Un ensemble de spécifications", () => {
  const oseEstReguleeEE = new Specifications(
    [new RegleEntiteOSE(["oui"])],
    reguleEE(),
    "R1000",
  );

  const energieReguleeEE = new Specifications(
    [new RegleSecteurs("energie")],
    reguleEE(),
    "R1001",
  );

  describe("lorsqu'une seule spécification correspond aux réponses", () => {
    it("ne retient que cette spécification", () => {
      const uneSeuleSpec = new EnsembleDeSpecifications([oseEstReguleeEE]);
      const reponseOSEOui: EtatQuestionnaire = {
        ...etatParDefaut,
        designationOperateurServicesEssentiels: ["oui"],
      };

      const resultat = uneSeuleSpec.evalue(reponseOSEOui);

      expect(resultat.specificationsRetenues.length).toBe(1);
      expect(resultat.specificationsRetenues[0]).toBe("R1000");
    });
  });

  describe("lorsque plusieurs spécifications correspondent aux réponses", () => {
    it("retient toutes les spécifications correspondantes", () => {
      const deuxSpecs = new EnsembleDeSpecifications([
        oseEstReguleeEE,
        energieReguleeEE,
      ]);

      const reponseQuiMatchLesDeux: EtatQuestionnaire = {
        ...etatParDefaut,
        designationOperateurServicesEssentiels: ["oui"],
        secteurActivite: ["energie"],
      };

      const resultat = deuxSpecs.evalue(reponseQuiMatchLesDeux);

      expect(resultat.specificationsRetenues).toEqual(["R1000", "R1001"]);
    });

    it("trie les spécifications retenues de la plus stricte à la moins stricte", () => {
      const energieReguleeEE = new Specifications(
        [new RegleSecteurs("energie")],
        reguleEE(),
        "Regulee EE (1)",
      );

      const energieReguleeEI = new Specifications(
        [new RegleSecteurs("energie")],
        reguleEI(),
        "Regulee EI (2)",
      );

      const energieReguleeSansPrecision = new Specifications(
        [new RegleSecteurs("energie")],
        reguleSansPrecision(),
        "Regulee sans précision (3)",
      );

      const energieReguleeEnregistrementSeul = new Specifications(
        [new RegleSecteurs("energie")],
        reguleEnregistrementSeul(),
        "Regulee enregistrement seul (4)",
      );

      const energieNonRegulee = new Specifications(
        [new RegleSecteurs("energie")],
        nonRegulee(),
        "Non regulee (5)",
      );

      const energieNeSaitPas = new Specifications(
        [new RegleSecteurs("energie")],
        neSaitPas(),
        "Ne sait pas (6)",
      );

      const ensembleDansLeDesordre = new EnsembleDeSpecifications([
        energieNonRegulee,
        energieReguleeEI,
        energieReguleeEnregistrementSeul,
        energieNeSaitPas,
        energieReguleeSansPrecision,
        energieReguleeEE,
      ]);

      const entiteEnergie: EtatQuestionnaire = {
        ...etatParDefaut,
        secteurActivite: ["energie"],
      };

      const resultat = ensembleDansLeDesordre.evalue(entiteEnergie);

      expect(resultat.specificationsRetenues).toEqual([
        "Regulee EE (1)",
        "Regulee EI (2)",
        "Regulee sans précision (3)",
        "Regulee enregistrement seul (4)",
        "Non regulee (5)",
        "Ne sait pas (6)",
      ]);
    });
  });
});
