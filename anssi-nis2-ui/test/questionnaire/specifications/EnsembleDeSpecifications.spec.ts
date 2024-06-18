import { describe, expect, it } from "vitest";
import { EnsembleDeSpecifications } from "../../../src/questionnaire/specifications/EnsembleDeSpecifications";
import { RegleEntiteOSE } from "../../../src/questionnaire/specifications/regles/RegleEntiteOSE";
import { Specifications } from "../../../src/questionnaire/specifications/Specifications";
import { reguleEE } from "./aidesAuxTests";
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

      const resultat = uneSeuleSpec.premierPassant(reponseOSEOui);

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

      const resultat = deuxSpecs.premierPassant(reponseQuiMatchLesDeux);

      expect(resultat.specificationsRetenues).toEqual(["R1000", "R1001"]);
    });
  });
});
