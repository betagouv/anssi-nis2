import { describe, expect, it } from "vitest";
import { EnsembleDeSpecifications } from "../../../src/Domain/Questionnaire/EnsembleDeSpecifications";
import { RegleEntiteOSE } from "../../../src/Domain/Questionnaire/regles/RegleEntiteOSE";
import { Specifications } from "../../../src/Domain/Questionnaire/Specifications";
import {
  neSaitPas,
  nonRegulee,
  reguleEE,
  reguleEI,
  reguleEnregistrementSeul,
  reguleSansPrecision,
} from "./aidesAuxTests";
import { RegleSecteurs } from "../../../src/Domain/Questionnaire/regles/RegleSecteurs";
import {
  EtatQuestionnaire,
  EtatQuestionnaireVide,
} from "../../../src/Domain/Questionnaire/EtatQuestionnaire";

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
        ...EtatQuestionnaireVide,
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
        ...EtatQuestionnaireVide,
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
        ...EtatQuestionnaireVide,
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

    it("cumule les résumés de points d'attentions de toutes les spécifications retenues", () => {
      const energie1 = new Specifications(
        [new RegleSecteurs("energie")],
        reguleEE(["NumeriqueUE"]),
        "Regulee EE (1)",
      );

      const energie2 = new Specifications(
        [new RegleSecteurs("energie")],
        reguleEI(["RepresentantUE"]),
        "Regulee EI (2)",
      );

      const toutes = new EnsembleDeSpecifications([energie2, energie1]);

      const entiteEnergie: EtatQuestionnaire = {
        ...EtatQuestionnaireVide,
        secteurActivite: ["energie"],
      };

      const resultat = toutes.evalue(entiteEnergie);

      expect(resultat.resultat.pointsAttention.resumes).toEqual([
        "NumeriqueUE",
        "RepresentantUE",
      ]);
    });

    it("cumule les précisions de points d'attentions de toutes les spécifications retenues", () => {
      const energie1 = new Specifications(
        [new RegleSecteurs("energie")],
        reguleEE([], ["OSE"]),
        "Regulee EE (1)",
      );

      const energie2 = new Specifications(
        [new RegleSecteurs("energie")],
        reguleEI([], ["DORA"]),
        "Regulee EI (2)",
      );

      const toutes = new EnsembleDeSpecifications([energie2, energie1]);

      const entiteEnergie: EtatQuestionnaire = {
        ...EtatQuestionnaireVide,
        secteurActivite: ["energie"],
      };

      const resultat = toutes.evalue(entiteEnergie);

      expect(resultat.resultat.pointsAttention.precisions).toEqual([
        "OSE",
        "DORA",
      ]);
    });

    it("ne fait pas de doublons dans les résumés de points d'attentions", () => {
      const energie1 = new Specifications(
        [new RegleSecteurs("energie")],
        reguleEE(["NumeriqueUE"]),
        "Regulee EE (1)",
      );

      const energie2 = new Specifications(
        [new RegleSecteurs("energie")],
        reguleEI(["NumeriqueUE"]),
        "Regulee EI (2)",
      );

      const toutes = new EnsembleDeSpecifications([energie2, energie1]);

      const entiteEnergie: EtatQuestionnaire = {
        ...EtatQuestionnaireVide,
        secteurActivite: ["energie"],
      };

      const resultat = toutes.evalue(entiteEnergie);

      expect(resultat.resultat.pointsAttention.resumes).toEqual([
        "NumeriqueUE",
      ]);
    });

    it("ne fait pas de doublons dans les précisions de points d'attentions", () => {
      const energie1 = new Specifications(
        [new RegleSecteurs("energie")],
        reguleEE([], ["OSE"]),
        "Regulee EE (1)",
      );

      const energie2 = new Specifications(
        [new RegleSecteurs("energie")],
        reguleEI([], ["OSE"]),
        "Regulee EI (2)",
      );

      const toutes = new EnsembleDeSpecifications([energie2, energie1]);

      const entiteEnergie: EtatQuestionnaire = {
        ...EtatQuestionnaireVide,
        secteurActivite: ["energie"],
      };

      const resultat = toutes.evalue(entiteEnergie);

      expect(resultat.resultat.pointsAttention.precisions).toEqual(["OSE"]);
    });
  });
});
