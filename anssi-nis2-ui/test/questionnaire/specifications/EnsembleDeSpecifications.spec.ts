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
  );

  it("ne retient qu'une seule spécification lorsqu'il n'y en a qu'une seule qui correspond", () => {
    const ensemble = new EnsembleDeSpecifications([oseEstReguleeEE]);
    const reponseOSEOui: EtatQuestionnaire = {
      ...etatParDefaut,
      designationOperateurServicesEssentiels: ["oui"],
    };

    const resultat = ensemble.premierPassant(reponseOSEOui);

    expect(resultat.specificationsRetenues.length).toBe(1);
  });
});
