import { fc } from "@fast-check/vitest";
import { describe, expect, it } from "vitest";
import {
  fabriqueRegule,
  resultatReguleOSE,
} from "../../src/Domain/Simulateur/fabriques/Regulation.fabrique";
import {
  resultatIncertain,
  resultatNonRegule,
} from "../../src/Domain/Simulateur/Regulation.constantes";
import {
  CausesRegulation,
  ResultatRegulationEntite,
} from "../../src/Domain/Simulateur/Regulation.definitions";
import {
  OperationEvalueEtape,
  ResultatEvaluationRegulation,
  ResultatEvaluationRegulationDefinitif,
  ResultatEvaluationRegulationEnSuspens,
} from "../../src/Domain/Simulateur/services/Eligibilite/EtatRegulation.definition";
import {
  evalueRegulationEtatReponseInformationsSecteur,
  evalueRegulationEtatReponseLocalisation,
  evalueRegulationEtatReponseOse,
  evalueRegulationEtatReponseStructure,
} from "../../src/Domain/Simulateur/services/Eligibilite/EtatRegulation.operations";
import {
  EtapesEvaluation,
  ReponseEtatDesignationOperateurServicesEssentiels,
} from "../../src/Domain/Simulateur/services/Eligibilite/Reponse.definitions";
import { propReponseEtat } from "../../src/Domain/Simulateur/services/Eligibilite/Reponse.operations";
import { fabriqueResultatEvaluationRegulationDefinitif } from "../../src/Domain/Simulateur/services/Eligibilite/ResultatEvaluationRegulation.fabriques";
import { assertionArbitraire } from "../utilitaires/ResultatEvaluationRegulation.assertions";
import {
  arbResultatEvaluationRegulationDesigneeOse,
  arbResultatEvaluationRegulationEnSuspensApresLocalisation,
  arbResultatEvaluationRegulationEnSuspensApresLocalisationFrance,
  arbResultatEvaluationRegulationEnSuspensApresLocalisationHorsFrance,
  arbResultatEvaluationRegulationEnSuspensApresStructure,
  arbResultatEvaluationRegulationEnSuspensApresStructureAutre,
  arbResultatEvaluationRegulationEnSuspensApresStructureLocalisable,
  arbResultatEvaluationRegulationNonOse,
} from "./arbitraires/ResultatEvaluationRegulation.arbitraire";
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
    [
      "Structure",
      "InformationsSecteur",
      evalueRegulationEtatReponseInformationsSecteur,
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
    it(
      "Une entité désignée OSE est toujours définitivement régulée",
      assertionArbitraire(
        arbResultatEvaluationRegulationDesigneeOse,
        (reponse) => {
          const resultatAttendu: ResultatEvaluationRegulation = {
            _resultatEvaluationRegulation: "Definitif",
            etapeEvaluee: "DesignationOperateurServicesEssentiels",
            ...resultatReguleOSE,
          };
          const resultatObtenu = evalueRegulationEtatReponseOse(reponse);
          expect(resultatObtenu).toStrictEqual(resultatAttendu);
        },
      ),
    );
    it(
      "Une entité non désignée OSE donne toujours incertain en suspens",
      assertionArbitraire(arbResultatEvaluationRegulationNonOse, (reponse) => {
        const resultatAttendu: ResultatEvaluationRegulationEnSuspens = {
          _tag: "DesignationOperateurServicesEssentiels",
          _resultatEvaluationRegulation: "EnSuspens",
          etapeEvaluee: "DesignationOperateurServicesEssentiels",
          ...resultatIncertain,
          DesignationOperateurServicesEssentiels: (
            reponse as ReponseEtatDesignationOperateurServicesEssentiels
          ).DesignationOperateurServicesEssentiels,
        };
        const resultatObtenu = evalueRegulationEtatReponseOse(reponse);
        expect(resultatObtenu).toStrictEqual(resultatAttendu);
      }),
    );
  });
  describe("AppartenancePaysUnionEuropeenne", () => {
    it(
      "AppUE = france ==> toujours EnSuspens / Incertain",
      assertionArbitraire(
        arbResultatEvaluationRegulationEnSuspensApresLocalisationFrance,
        (reponse) => {
          const copieProp = propReponseEtat(reponse);
          const resultatAttendu: ResultatEvaluationRegulationEnSuspens = {
            _tag: "AppartenancePaysUnionEuropeenne",
            _resultatEvaluationRegulation: "EnSuspens",
            etapeEvaluee: "AppartenancePaysUnionEuropeenne",
            ...resultatIncertain,
            ...copieProp("DesignationOperateurServicesEssentiels"),
            ...copieProp("AppartenancePaysUnionEuropeenne"),
          };

          const resultatObtenu =
            evalueRegulationEtatReponseLocalisation(reponse);
          expect(resultatObtenu).toStrictEqual(resultatAttendu);
        },
      ),
    );
    it(
      "AppUE != france ==> toujours Définitif / Incertain",
      assertionArbitraire(
        arbResultatEvaluationRegulationEnSuspensApresLocalisationHorsFrance,
        (reponse) => {
          const resultatAttendu: ResultatEvaluationRegulationDefinitif = {
            _resultatEvaluationRegulation: "Definitif",
            etapeEvaluee: "AppartenancePaysUnionEuropeenne",
            ...resultatIncertain,
          };

          const resultatObtenu =
            evalueRegulationEtatReponseLocalisation(reponse);
          expect(resultatObtenu).toStrictEqual(resultatAttendu);
        },
      ),
    );
  });
  describe("Structure", () => {
    it(
      "Structure Incertain ==> toujours EnSuspens / Incertain",
      assertionArbitraire(
        arbResultatEvaluationRegulationEnSuspensApresLocalisation,
        (reponse) => {
          const copieProp = propReponseEtat(reponse);
          const resultatAttendu: ResultatEvaluationRegulationEnSuspens = {
            _tag: "Structure",
            _resultatEvaluationRegulation: "EnSuspens",
            etapeEvaluee: "Structure",
            ...resultatIncertain,
            ...copieProp("DesignationOperateurServicesEssentiels"),
            ...copieProp("AppartenancePaysUnionEuropeenne"),
            ...copieProp("Structure"),
          };

          const resultatObtenu = evalueRegulationEtatReponseStructure(reponse);
          expect(resultatObtenu).toStrictEqual(resultatAttendu);
        },
      ),
    );
  });

  describe("Secteur", () => {
    describe("Petit", () => {
      it(
        "en suspens / secteur autre ==> toujours définitivement non régulé",
        assertionArbitraire(
          arbResultatEvaluationRegulationEnSuspensApresStructureAutre,
          (reponse) => {
            const resultatAttendu: ResultatEvaluationRegulationDefinitif = {
              _resultatEvaluationRegulation: "Definitif",
              etapeEvaluee: "InformationsSecteur",
              ...resultatNonRegule,
            };

            const resultatObtenu =
              evalueRegulationEtatReponseInformationsSecteur(reponse);
            expect(resultatObtenu).toStrictEqual(resultatAttendu);
          },
        ),
      );
      it(
        "en suspens / sous-secteur listés ==> toujours définitivement régulé",
        assertionArbitraire(
          arbResultatEvaluationRegulationEnSuspensApresStructure,
          (reponse) => {
            const causes: CausesRegulation = {
              ...propReponseEtat(reponse)("Structure"),
              ...propReponseEtat(reponse)("InformationsSecteur"),
            };
            const resultatAttendu: ResultatEvaluationRegulationDefinitif = {
              _resultatEvaluationRegulation: "Definitif",
              etapeEvaluee: "InformationsSecteur",
              ...fabriqueRegule(causes),
            };

            const resultatObtenu =
              evalueRegulationEtatReponseInformationsSecteur(reponse);
            expect(resultatObtenu).toStrictEqual(resultatAttendu);
          },
        ),
      );
      it(
        "en suspens / secteurs localisables et bien localisés ==> toujours définitivement régulé",
        assertionArbitraire(
          arbResultatEvaluationRegulationEnSuspensApresStructureLocalisable,
          (reponse) => {
            const causes: CausesRegulation = {
              ...propReponseEtat(reponse)("Structure"),
              ...propReponseEtat(reponse)("InformationsSecteur"),
            };
            const resultatAttendu: ResultatEvaluationRegulationDefinitif = {
              _resultatEvaluationRegulation: "Definitif",
              etapeEvaluee: "InformationsSecteur",
              ...fabriqueRegule(causes),
            };

            const resultatObtenu =
              evalueRegulationEtatReponseInformationsSecteur(reponse);
            expect(resultatObtenu).toStrictEqual(resultatAttendu);
          },
        ),
      );
    });
  });
});
