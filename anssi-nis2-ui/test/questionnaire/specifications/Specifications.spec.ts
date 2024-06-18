import { beforeEach, describe, expect, it } from "vitest";
import { Specifications } from "../../../src/questionnaire/specifications/Specifications";
import {
  etatParDefaut,
  EtatQuestionnaire,
} from "../../../src/questionnaire/reducerQuestionnaire";
import { ResultatEligibilite } from "../../../../commun/core/src/Domain/Simulateur/Regulation.definitions";
import { RegleEntiteOSE } from "../../../src/questionnaire/specifications/regles/RegleEntiteOSE";

describe("Les spécifications", () => {
  const resultatDeLaSpec: ResultatEligibilite = {
    regulation: "Regule",
    typeEntite: "EntiteEssentielle",
    pointsAttention: { precisions: [], resumes: [] },
  };

  let entiteOseOuiEstReguleEE: Specifications;

  beforeEach(() => {
    entiteOseOuiEstReguleEE = new Specifications(
      [new RegleEntiteOSE(["oui"])],
      resultatDeLaSpec,
      "R1000",
    );
  });

  it("retourne le résultat spécifié si toutes les réponses du questionnaire sont conformes aux règles", () => {
    const entiteOui: EtatQuestionnaire = {
      ...etatParDefaut,
      designationOperateurServicesEssentiels: ["oui"],
    };

    const resultat = entiteOseOuiEstReguleEE.evalue(entiteOui);

    expect(resultat).toBe(resultatDeLaSpec);
  });

  it("retourne `undefined` dès qu'une réponse du questionnaire n'est pas conforme à une règle", () => {
    const entiteNon: EtatQuestionnaire = {
      ...etatParDefaut,
      designationOperateurServicesEssentiels: ["non"],
    };

    const resultat = entiteOseOuiEstReguleEE.evalue(entiteNon);

    expect(resultat).toBe(undefined);
  });
});
