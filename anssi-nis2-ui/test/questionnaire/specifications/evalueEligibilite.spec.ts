import { describe, expect, it } from "vitest";
import {
  etatParDefaut,
  EtatQuestionnaire,
} from "../../../src/questionnaire/reducerQuestionnaire";
import { leCSV } from "./aidesAuxTests";
import { evalueEligibilite } from "../../../src/questionnaire/specifications/evalueEligibilite";

describe("L'évaluation complète de l'égibilité", () => {
  it("soumet un questionnaire à la spécification CSV, et retourne le résultat obtenu", () => {
    const reponseEntiteOse: EtatQuestionnaire = {
      ...etatParDefaut,
      designationOperateurServicesEssentiels: ["oui"],
    };

    const resultat = evalueEligibilite(
      reponseEntiteOse,
      leCSV("specification-ose-est-regulee-ee.csv"),
    );

    expect(resultat.regulation).toBe("Regule");
    expect(resultat.typeEntite).toBe("EntiteEssentielle");
  });

  it("lève une exception si le questionnaire ne correspond à aucune spécification", () => {
    const reponseNonOse: EtatQuestionnaire = {
      ...etatParDefaut,
      designationOperateurServicesEssentiels: ["non"],
    };

    expect(() =>
      evalueEligibilite(
        reponseNonOse,
        leCSV("specification-ose-est-regulee-ee.csv"),
      ),
    ).toThrowError("Aucune spécification");
  });
});
