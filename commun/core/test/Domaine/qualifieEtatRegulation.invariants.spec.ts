import { fc } from "@fast-check/vitest";
import { describe, expect, it } from "vitest";
import { ResultatRegulationEntite } from "../../src/Domain/Simulateur/Regulation.definitions";
import { estResultatRegulationPositif } from "../../src/Domain/Simulateur/Regulation.predicats";
import {
  EtapeEvaluation,
  EtatRegulationDefinitif,
  OperationEvalueEtat,
} from "../../src/Domain/Simulateur/services/Eligibilite/EtatRegulation.definitions";
import { fabriqueResultatEvaluationRegulationDefinitif } from "../../src/Domain/Simulateur/services/Eligibilite/EtatRegulation.fabriques";
import { evalueRegulationEtatReponseLocalisation } from "../../src/Domain/Simulateur/services/Eligibilite/EtatRegulation.localisation.operations";
import { evalueRegulationEtatReponseStructure } from "../../src/Domain/Simulateur/services/Eligibilite/EtatRegulation.localisation.structure";
import { evalueRegulationEtatReponseInformationsSecteur } from "../../src/Domain/Simulateur/services/Eligibilite/EtatRegulation.operations";
import { evalueRegulationEtatReponseOse } from "../../src/Domain/Simulateur/services/Eligibilite/EtatRegulation.ose.operations";
import { arbitrairesResultatRegulation } from "./arbitraires/ResultatRegulation.arbitraires";

describe("Regulation Etat Reponse", () => {
  describe("Invariants", () => {
    const generateurEtapesEvalueesConsecutives = fc.constantFrom<
      [EtapeEvaluation, EtapeEvaluation, OperationEvalueEtat]
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
      [
        "Structure",
        "InformationsSecteur",
        evalueRegulationEtatReponseInformationsSecteur,
      ],
    );

    it("Definitif ==> Definitif", () => {
      fc.assert(
        fc.property<
          [
            ResultatRegulationEntite,
            [EtapeEvaluation, EtapeEvaluation, OperationEvalueEtat],
          ]
        >(
          arbitrairesResultatRegulation,
          generateurEtapesEvalueesConsecutives,
          (resultatRegulation, [etapeSource, etapeCible, evaluation]) => {
            const reponse = fabriqueResultatEvaluationRegulationDefinitif(
              resultatRegulation,
              etapeSource,
            );
            const resultat = evaluation(reponse) as EtatRegulationDefinitif;

            expect(resultat._resultatEvaluationRegulation).toBe("Definitif");
            expect(resultat.etapeEvaluee).toBe(etapeCible);
            expect(resultat.decision).toBe(resultatRegulation.decision);

            expect("cause" in resultat).toBe("cause" in resultatRegulation);
            if (
              estResultatRegulationPositif(resultatRegulation) &&
              estResultatRegulationPositif(resultat)
            ) {
              expect(resultat.causes).toStrictEqual(resultatRegulation.causes);
            }
          },
        ),
      );
    });
  });
});
