import { describe, expect, it } from "vitest";
import { SpecificationEntiteOSE } from "../../../src/questionnaire/specifications/SpecificationEntiteOSE";
import { Specifications } from "../../../src/questionnaire/specifications/Specifications";
import {
  etatParDefaut,
  EtatQuestionnaire,
} from "../../../src/questionnaire/reducerQuestionnaire";

describe("Les spécifications", () => {
  const entiteOui: EtatQuestionnaire = {
    ...etatParDefaut,
    designationOperateurServicesEssentiels: ["oui"],
  };

  it("acceptent un questionnaire si toutes ses réponses sont conformes aux spécifications", () => {
    const deuxFoisOSE = new Specifications(
      new SpecificationEntiteOSE(["oui"]),
      new SpecificationEntiteOSE(["oui"]),
    );

    const passePourOui = deuxFoisOSE.evalue(entiteOui);

    expect(passePourOui).toBe(true);
  });

  it("rejettent un questionnaire si une réponse n'est pas conforme aux spécifications", () => {
    const deuxFoisNon = new Specifications(
      new SpecificationEntiteOSE(["non"]),
      new SpecificationEntiteOSE(["non"]),
    );

    const passePourOui = deuxFoisNon.evalue(entiteOui);

    expect(passePourOui).toBe(false);
  });
});
