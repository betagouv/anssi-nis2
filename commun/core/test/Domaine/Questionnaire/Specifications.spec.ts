import { beforeEach, describe, expect, it } from "vitest";
import { Specifications } from "../../../src/Domain/Questionnaire/Specifications";
import { ResultatEligibilite } from "../../../src/Domain/Simulateur/Regulation.definitions";
import { RegleEntiteOSE } from "../../../src/Domain/Questionnaire/regles/RegleEntiteOSE";
import {
  EtatQuestionnaire,
  EtatQuestionnaireVide,
} from "../../../src/Domain/Questionnaire/EtatQuestionnaire";

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
      ...EtatQuestionnaireVide,
      designationOperateurServicesEssentiels: ["oui"],
    };

    const resultat = entiteOseOuiEstReguleEE.evalue(entiteOui);

    expect(resultat).toBe(resultatDeLaSpec);
  });

  it("retourne `undefined` dès qu'une réponse du questionnaire n'est pas conforme à une règle", () => {
    const entiteNon: EtatQuestionnaire = {
      ...EtatQuestionnaireVide,
      designationOperateurServicesEssentiels: ["non"],
    };

    const resultat = entiteOseOuiEstReguleEE.evalue(entiteNon);

    expect(resultat).toBe(undefined);
  });
});
