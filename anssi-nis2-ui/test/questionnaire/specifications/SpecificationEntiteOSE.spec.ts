import { describe, expect, it } from "vitest";
import {
  etatParDefaut,
  EtatQuestionnaire,
} from "../../../src/questionnaire/reducerQuestionnaire";
import { SpecificationEntiteOSE } from "../../../src/questionnaire/specifications/SpecificationEntiteOSE";

describe("La spécification d'entité OSE", () => {
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

  it("accepte une entité qui correspond à son paramétrage avec une valeur", () => {
    const specOui = new SpecificationEntiteOSE(["oui"]);

    const accepteOui = specOui.evalue(entiteOui);
    const accepteNon = specOui.evalue(entiteNon);
    const accepteNeSaitPas = specOui.evalue(entiteNeSaitPas);

    expect(accepteOui).toBe(true);
    expect(accepteNon).toBe(false);
    expect(accepteNeSaitPas).toBe(false);
  });

  it("accepte une entité qui correspond à son paramétrage avec plusieurs valeurs", () => {
    const specOuiEtNon = new SpecificationEntiteOSE(["oui", "non"]);

    const accepteOui = specOuiEtNon.evalue(entiteOui);
    const accepteNon = specOuiEtNon.evalue(entiteNon);
    const accepteNeSaitPas = specOuiEtNon.evalue(entiteNeSaitPas);

    expect(accepteOui).toBe(true);
    expect(accepteNon).toBe(true);
    expect(accepteNeSaitPas).toBe(false);
  });
});
