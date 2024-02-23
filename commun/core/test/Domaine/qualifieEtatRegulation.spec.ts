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
import { EtatEvaluation } from "../../src/Domain/Simulateur/services/Eligibilite/EtatEvaluation.definitions";
import {
  OperationEvalueEtape,
  ResultatEvaluationRegulation,
  ResultatEvaluationRegulationDefinitif,
  ResultatEvaluationRegulationEnSuspens,
} from "../../src/Domain/Simulateur/services/Eligibilite/EtatRegulation.definitions";
import {
  evalueRegulationEtatReponseInformationsSecteur,
  evalueRegulationEtatReponseLocalisation,
  evalueRegulationEtatReponseOse,
  evalueRegulationEtatReponseStructure,
} from "../../src/Domain/Simulateur/services/Eligibilite/EtatRegulation.operations";
import { propReponseEtat } from "../../src/Domain/Simulateur/services/Eligibilite/Reponse.operations";
import { ReponseEtatDesignationOperateurServicesEssentiels } from "../../src/Domain/Simulateur/services/Eligibilite/ReponseEtat.definitions";
import { fabriqueResultatEvaluationRegulationDefinitif } from "../../src/Domain/Simulateur/services/Eligibilite/ResultatEvaluationRegulation.fabriques";
import { estResultatRegulationPositif } from "../../src/Domain/Simulateur/services/Regulation/Regulation.predicats";
import {
  afficheDifferences,
  assertionArbitraire,
} from "../utilitaires/ResultatEvaluationRegulation.assertions";
import {
  fabriqueArbJamaisOse_ToujoursFrance_StructureGrand,
  fabriqueArbJamaisOse_ToujoursFrance_StructurePetit,
  tupleArbitrairesJamaisOseJamaisFrance,
  tupleArbitrairesJamaisOseToujoursFrance,
} from "./arbitraires/ResultatEvaluationRegulation.arbitraire";
import {
  fabriqueResultatEvaluationEnSuspensAppUE,
  fabriqueResultatEvaluationEnSuspensStructure,
  fabriqueResultatEvaluationInconnuOse,
} from "./arbitraires/ResultatEvaluationRegulation.arbitraire.fabrique";
import {
  arbDesignationOperateurServicesEssentielsJamaisOui,
  arbDesignationOperateurServicesEssentielsToujoursOui,
  arbInformationsSecteurAutreGrand,
  arbInformationsSecteurAutrePetit,
  arbInformationsSecteurGrand,
  arbInformationsSecteurGrandActivitesAutres,
  arbInformationsSecteurLocalisesFranceGrand,
  arbInformationsSecteurLocalisesFranceGrandEE,
  arbInformationsSecteurLocalisesFrancePetit,
  arbInformationsSecteurLocalisesHorsFrancePetit,
  arbInformationsSecteurPetit,
  arbStructurePetit,
} from "./arbitraires/ResultatEvaluationRegulation.bases.arbitraire";
import { arbitrairesResultatRegulation } from "./arbitraires/ResultatRegulation.arbitraires";

describe("Regulation Etat Reponse", () => {
  const generateurEtapesEvalueesConsecutives = fc.constantFrom<
    [EtatEvaluation, EtatEvaluation, OperationEvalueEtape]
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
            [EtatEvaluation, EtatEvaluation, OperationEvalueEtape],
          ]
        >(
          arbitrairesResultatRegulation,
          generateurEtapesEvalueesConsecutives,
          (resultatRegulation, [etapeSource, etapeCible, evaluation]) => {
            const reponse = fabriqueResultatEvaluationRegulationDefinitif(
              resultatRegulation,
              etapeSource,
            );
            const resultat = evaluation(
              reponse,
            ) as ResultatEvaluationRegulationDefinitif;

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

  describe("DesignationOperateurServicesEssentiels", () => {
    it(
      "Une entité désignée OSE est toujours définitivement régulée",
      assertionArbitraire(
        arbDesignationOperateurServicesEssentielsToujoursOui.map(
          fabriqueResultatEvaluationInconnuOse,
        ),
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
      assertionArbitraire(
        arbDesignationOperateurServicesEssentielsJamaisOui.map(
          fabriqueResultatEvaluationInconnuOse,
        ),
        (reponse) => {
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
        },
      ),
    );
  });
  describe("AppartenancePaysUnionEuropeenne", () => {
    it(
      "AppUE = france ==> toujours EnSuspens / Incertain",
      assertionArbitraire(
        fc
          .tuple(...tupleArbitrairesJamaisOseToujoursFrance)
          .map(fabriqueResultatEvaluationEnSuspensAppUE),
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
        fc
          .tuple(...tupleArbitrairesJamaisOseJamaisFrance)
          .map(
            fabriqueResultatEvaluationEnSuspensAppUE,
          ) as fc.Arbitrary<ResultatEvaluationRegulation>,
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
        fc
          .tuple(...tupleArbitrairesJamaisOseToujoursFrance, arbStructurePetit)
          .map(fabriqueResultatEvaluationEnSuspensStructure),
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
          fabriqueArbJamaisOse_ToujoursFrance_StructurePetit(
            arbInformationsSecteurAutrePetit,
          ),
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
        "en suspens / secteurs+activités localisables et bien localisés ==> toujours définitivement régulé EE",
        assertionArbitraire(
          fabriqueArbJamaisOse_ToujoursFrance_StructurePetit(
            arbInformationsSecteurLocalisesFrancePetit,
          ),
          (reponse) => {
            const causes: CausesRegulation = {
              ...propReponseEtat(reponse)("Structure"),
              ...propReponseEtat(reponse)("InformationsSecteur"),
            };
            const resultatAttendu: ResultatEvaluationRegulationDefinitif = {
              _resultatEvaluationRegulation: "Definitif",
              etapeEvaluee: "InformationsSecteur",
              ...fabriqueRegule(causes, "EntiteEssentielle"),
            };

            const resultatObtenu =
              evalueRegulationEtatReponseInformationsSecteur(reponse);
            expect(resultatObtenu).toStrictEqual(resultatAttendu);
          },
        ),
      );
      it(
        "en suspens / secteurs localisables et localisé hors France ==> toujours définitivement non-régulé",
        assertionArbitraire(
          fabriqueArbJamaisOse_ToujoursFrance_StructurePetit(
            arbInformationsSecteurLocalisesHorsFrancePetit,
          ),
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
        "en suspens / secteurs liste non eligible ==> toujours définitivement non-régulé",
        assertionArbitraire(
          fabriqueArbJamaisOse_ToujoursFrance_StructurePetit(
            arbInformationsSecteurPetit,
          ),
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
    });
    describe("Grandes", () => {
      it(
        "en suspens / sous-secteur listés ==> toujours définitivement régulé",
        assertionArbitraire(
          fabriqueArbJamaisOse_ToujoursFrance_StructureGrand(
            arbInformationsSecteurGrand,
          ),
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
        "en suspens / secteurs+activités EI localisables et bien localisés ==> toujours définitivement régulé EE",
        assertionArbitraire(
          fabriqueArbJamaisOse_ToujoursFrance_StructureGrand(
            arbInformationsSecteurLocalisesFranceGrand,
          ),
          (reponse) => {
            const causes: CausesRegulation = {
              ...propReponseEtat(reponse)("Structure"),
              ...propReponseEtat(reponse)("InformationsSecteur"),
            };
            const resultatAttendu: ResultatEvaluationRegulationDefinitif = {
              _resultatEvaluationRegulation: "Definitif",
              etapeEvaluee: "InformationsSecteur",
              ...fabriqueRegule(causes, "EntiteImportante"),
            };

            const resultatObtenu =
              evalueRegulationEtatReponseInformationsSecteur(reponse);
            expect(
              resultatObtenu,
              afficheDifferences(resultatAttendu, resultatObtenu),
            ).toStrictEqual(resultatAttendu);
          },
        ),
      );
      it(
        "en suspens / secteurs+activités EE localisables et bien localisés ==> toujours définitivement régulé EE",
        assertionArbitraire(
          fabriqueArbJamaisOse_ToujoursFrance_StructureGrand(
            arbInformationsSecteurLocalisesFranceGrandEE,
          ),
          (reponse) => {
            const causes: CausesRegulation = {
              ...propReponseEtat(reponse)("Structure"),
              ...propReponseEtat(reponse)("InformationsSecteur"),
            };
            const resultatAttendu: ResultatEvaluationRegulationDefinitif = {
              _resultatEvaluationRegulation: "Definitif",
              etapeEvaluee: "InformationsSecteur",
              ...fabriqueRegule(causes, "EntiteImportante"),
            };

            const resultatObtenu =
              evalueRegulationEtatReponseInformationsSecteur(reponse);
            expect(
              resultatObtenu,
              afficheDifferences(resultatAttendu, resultatObtenu),
            ).toStrictEqual(resultatAttendu);
          },
        ),
      );
      it(
        "en suspens / secteurs/sous-secteur listés, uniquement activités autres ==> toujours définitivement non-régulé",
        assertionArbitraire(
          fabriqueArbJamaisOse_ToujoursFrance_StructureGrand(
            arbInformationsSecteurGrandActivitesAutres,
          ),
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
        "en suspens / secteur autre Grand ==> toujours définitivement non régulé",
        assertionArbitraire(
          fabriqueArbJamaisOse_ToujoursFrance_StructureGrand(
            arbInformationsSecteurAutreGrand,
          ),
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
    });
  });
});
