import { fc } from "@fast-check/vitest";
import { describe, expect, it } from "vitest";
import { resultatReguleOSE } from "../../src/Domain/Simulateur/fabriques/Regulation.fabrique";
import { resultatIncertain } from "../../src/Domain/Simulateur/Regulation.constantes";
import { ResultatRegulationEntite } from "../../src/Domain/Simulateur/Regulation.definitions";
import {
  OperationEvalueEtape,
  ResultatEvaluationRegulation,
  ResultatEvaluationRegulationDefinitif,
  ResultatEvaluationRegulationEnSuspens,
} from "../../src/Domain/Simulateur/services/Eligibilite/EtatRegulation.definition";
import {
  evalueRegulationEtatReponseLocalisation,
  evalueRegulationEtatReponseOse,
  evalueRegulationEtatReponseStructure,
} from "../../src/Domain/Simulateur/services/Eligibilite/EtatRegulation.operations";
import { EtapesEvaluation } from "../../src/Domain/Simulateur/services/Eligibilite/Reponse.definitions";
import { fabriqueResultatEvaluationRegulationDefinitif } from "../../src/Domain/Simulateur/services/Eligibilite/ResultatEvaluationRegulation.fabriques";
import { arbitrairesResultatRegulation } from "./arbitraires/ResultatRegulation.arbitraires";

describe("Regulation Etat Reponse", () => {
  const generateurEtapesEvalueesConsecutives = fc.constantFrom<
    [EtapesEvaluation, EtapesEvaluation, OperationEvalueEtape]
  >(
    [
      "NonEvalue",
      "DesignationOperateurServicesEssentiels",
      evalueRegulationEtatReponseOse,
    ],
    [
      "DesignationOperateurServicesEssentiels",
      "AppartenancePaysUnionEuropeenne",
      evalueRegulationEtatReponseLocalisation,
    ],
    [
      "AppartenancePaysUnionEuropeenne",
      "Structure",
      evalueRegulationEtatReponseStructure,
    ],
  );
  describe("Invariants", () => {
    it("Definitif ==> Definitif", () => {
      fc.assert(
        fc.property<
          [
            ResultatRegulationEntite,
            [EtapesEvaluation, EtapesEvaluation, OperationEvalueEtape],
          ]
        >(
          arbitrairesResultatRegulation,
          generateurEtapesEvalueesConsecutives,
          (resultatRegulation, [etapeSource, etapeCible, evaluation]) => {
            const reponse = fabriqueResultatEvaluationRegulationDefinitif(
              resultatRegulation,
              etapeSource,
            );
            const resultat = evaluation(reponse);

            expect(resultat._resultatEvaluationRegulation).toBe("Definitif");
            expect(resultat.etapeEvaluee).toBe(etapeCible);
            expect(
              (resultat as ResultatEvaluationRegulationDefinitif).decision,
            ).toBe(resultatRegulation.decision);

            expect("cause" in resultat).toBe("cause" in resultatRegulation);
            if ("cause" in resultatRegulation && "cause" in resultat) {
              expect(resultat.cause).toStrictEqual(resultatRegulation.cause);
            }
          },
        ),
      );
    });
  });

  describe("DesignationOperateurServicesEssentiels", () => {
    // TODO : Invariant - non Définitif OSE = oui ==> toujours Définitif / Regulé
    it("OSE = oui, définitivement régulé", () => {
      const reponse: ResultatEvaluationRegulation = {
        _tag: "DesignationOperateurServicesEssentiels",
        _resultatEvaluationRegulation: "Inconnu",
        etapeEvaluee: "NonEvalue",
        DesignationOperateurServicesEssentiels: {
          designationOperateurServicesEssentiels: "oui",
        },
      };
      const resultatAttendu: ResultatEvaluationRegulation = {
        _resultatEvaluationRegulation: "Definitif",
        etapeEvaluee: "DesignationOperateurServicesEssentiels",
        ...resultatReguleOSE,
      };
      const resultatObtenu = evalueRegulationEtatReponseOse(reponse);
      expect(resultatObtenu).toStrictEqual(resultatAttendu);
    });
    // TODO : Invariant - non Définitif OSE = non ==> toujours Incertain
    it("OSE = non, en suspens Incertain", () => {
      const reponse: ResultatEvaluationRegulation = {
        _tag: "DesignationOperateurServicesEssentiels",
        _resultatEvaluationRegulation: "Inconnu",
        etapeEvaluee: "NonEvalue",
        DesignationOperateurServicesEssentiels: {
          designationOperateurServicesEssentiels: "non",
        },
      };
      const resultatAttendu: ResultatEvaluationRegulationEnSuspens = {
        _tag: "DesignationOperateurServicesEssentiels",
        _resultatEvaluationRegulation: "EnSuspens",
        etapeEvaluee: "DesignationOperateurServicesEssentiels",
        ...resultatIncertain,
        DesignationOperateurServicesEssentiels: {
          designationOperateurServicesEssentiels: "non",
        },
      };
      const resultatObtenu = evalueRegulationEtatReponseOse(reponse);
      expect(resultatObtenu).toStrictEqual(resultatAttendu);
    });
  });
  describe("AppartenancePaysUnionEuropeenne", () => {
    // TODO : Invariant - non Définitif app UE = FR ==> toujours Incertain
    it(" = france ==> EnSuspens / Incertain", () => {
      const reponse: ResultatEvaluationRegulationEnSuspens = {
        _tag: "AppartenancePaysUnionEuropeenne",
        _resultatEvaluationRegulation: "EnSuspens",
        etapeEvaluee: "AppartenancePaysUnionEuropeenne",
        ...resultatIncertain,
        DesignationOperateurServicesEssentiels: {
          designationOperateurServicesEssentiels: "non",
        },
        AppartenancePaysUnionEuropeenne: {
          appartenancePaysUnionEuropeenne: "france",
        },
      };

      const resultatAttendu: ResultatEvaluationRegulationEnSuspens = {
        _tag: "AppartenancePaysUnionEuropeenne",
        _resultatEvaluationRegulation: "EnSuspens",
        etapeEvaluee: "AppartenancePaysUnionEuropeenne",
        ...resultatIncertain,
        DesignationOperateurServicesEssentiels: {
          designationOperateurServicesEssentiels: "non",
        },
        AppartenancePaysUnionEuropeenne: {
          appartenancePaysUnionEuropeenne: "france",
        },
      };

      const resultatObtenu = evalueRegulationEtatReponseLocalisation(reponse);
      expect(resultatObtenu).toStrictEqual(resultatAttendu);
    });
  });
  describe("Structure", () => {});
});
