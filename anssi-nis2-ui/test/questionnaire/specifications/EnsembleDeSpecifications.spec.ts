import { describe, it, expect } from "vitest";
import { EnsembleDeSpecifications } from "../../../src/questionnaire/specifications/EnsembleDeSpecifications";
import { RegleEntiteOSE } from "../../../src/questionnaire/specifications/regles/RegleEntiteOSE";
import { Specifications } from "../../../src/questionnaire/specifications/Specifications";
import { reguleEE } from "./aidesAuxTests";
import {
  etatParDefaut,
  EtatQuestionnaire,
} from "../../../src/questionnaire/reducerQuestionnaire";

describe("Un ensemble de spécifications", () => {
  const oseEstReguleeEE = new Specifications(
    [new RegleEntiteOSE(["oui"])],
    reguleEE(),
    "R1000",
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
});
