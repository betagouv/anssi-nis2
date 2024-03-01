import { fc } from "@fast-check/vitest";
import { describe, expect, it } from "vitest";
import {
  fabriqueIncertain,
  resultatReguleOSE,
} from "../../src/Domain/Simulateur/fabriques/ResultatRegulation.fabrique";
import { resultatIncertain } from "../../src/Domain/Simulateur/Regulation.constantes";
import {
  EtatEvaluationEnSuspens,
  EtatRegulation,
  EtatRegulationDefinitif,
} from "../../src/Domain/Simulateur/services/Eligibilite/EtatRegulation.definitions";
import {
  evalueRegulationEtatReponseLocalisation,
  evalueRegulationEtatReponseOse,
  evalueRegulationEtatReponseStructure,
} from "../../src/Domain/Simulateur/services/Eligibilite/EtatRegulation.operations";
import { propReponseEtat } from "../../src/Domain/Simulateur/services/Eligibilite/StructuresReponse.operations";
import { assertionArbitraire } from "../utilitaires/ResultatEvaluationRegulation.assertions";
import {
  arbTuple_JamaisOse_ToujoursAutreUE,
  arbTuple_JamaisOse_ToujoursFrance,
  arbTuple_JamaisOse_ToujoursHorsUE,
} from "./arbitraires/ResultatEvaluationRegulation.arbitraire";
import {
  fabriqueResultatEvaluationEnSuspensAppUE,
  fabriqueResultatEvaluationEnSuspensStructure,
  fabriqueResultatEvaluationInconnuOse,
} from "./arbitraires/ResultatEvaluationRegulation.arbitraire.fabrique";
import {
  arbDesignationOperateurServicesEssentielsToujoursNeSaitPas,
  arbDesignationOperateurServicesEssentielsToujoursNon,
  arbDesignationOperateurServicesEssentielsToujoursOui,
  arbStructurePetitPrive,
  arbStructurePublique,
} from "./arbitraires/ResultatEvaluationRegulation.bases.arbitraire";

describe("Réponses partielles", () => {
  describe("DesignationOperateurServicesEssentiels", () => {
    it(
      "Une entité désignée OSE est toujours définitivement régulée",
      assertionArbitraire(
        arbDesignationOperateurServicesEssentielsToujoursOui.map(
          fabriqueResultatEvaluationInconnuOse,
        ),
        (reponse) => {
          const resultatAttendu: EtatRegulation = {
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
        arbDesignationOperateurServicesEssentielsToujoursNon.map(
          fabriqueResultatEvaluationInconnuOse,
        ),
        (reponse) => {
          const copieProp = propReponseEtat(reponse);
          const resultatAttendu: EtatEvaluationEnSuspens = {
            _tag: "DesignationOperateurServicesEssentiels",
            _resultatEvaluationRegulation: "EnSuspens",
            etapeEvaluee: "DesignationOperateurServicesEssentiels",
            ...resultatIncertain,
            ...copieProp("DesignationOperateurServicesEssentiels"),
          };
          const resultatObtenu = evalueRegulationEtatReponseOse(reponse);
          expect(resultatObtenu).toStrictEqual(resultatAttendu);
        },
      ),
    );
    it(
      "Une entité non désignée OSE donne toujours incertain en suspens",
      assertionArbitraire(
        arbDesignationOperateurServicesEssentielsToujoursNeSaitPas.map(
          fabriqueResultatEvaluationInconnuOse,
        ),
        (reponse) => {
          const resultatAttendu: EtatRegulationDefinitif = {
            _resultatEvaluationRegulation: "Definitif",
            etapeEvaluee: "DesignationOperateurServicesEssentiels",
            ...resultatIncertain,
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
          .tuple(...arbTuple_JamaisOse_ToujoursFrance)
          .map(fabriqueResultatEvaluationEnSuspensAppUE),
        (reponse) => {
          const copieProp = propReponseEtat(reponse);
          const resultatAttendu: EtatEvaluationEnSuspens = {
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
      "AppUE == autre pays UE ==> toujours Définitif / Incertain avec précision UE",
      assertionArbitraire(
        fc
          .tuple(...arbTuple_JamaisOse_ToujoursAutreUE)
          .map(
            fabriqueResultatEvaluationEnSuspensAppUE,
          ) as fc.Arbitrary<EtatRegulation>,
        (reponse) => {
          const resultatAttendu: EtatRegulationDefinitif = {
            _resultatEvaluationRegulation: "Definitif",
            etapeEvaluee: "AppartenancePaysUnionEuropeenne",
            ...fabriqueIncertain({ _tag: "DefiniDansUnAutreEtatMembre" }),
          };

          const resultatObtenu =
            evalueRegulationEtatReponseLocalisation(reponse);
          expect(resultatObtenu).toStrictEqual(resultatAttendu);
        },
      ),
    );
    it(
      "AppUE == Hors UE ==> toujours Définitif / Non-Régulé",
      assertionArbitraire(
        fc
          .tuple(...arbTuple_JamaisOse_ToujoursHorsUE)
          .map(
            fabriqueResultatEvaluationEnSuspensAppUE,
          ) as fc.Arbitrary<EtatRegulation>,
        (reponse) => {
          const resultatAttendu: EtatRegulationDefinitif = {
            _resultatEvaluationRegulation: "Definitif",
            etapeEvaluee: "AppartenancePaysUnionEuropeenne",
            ...fabriqueIncertain({
              _tag: "ConstructionTestEnCours",
              typeConstructionEnCours: "HorsUnionEuropeenne",
            }),
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
      "Structure Privée ==> toujours EnSuspens / Incertain",
      assertionArbitraire(
        fc
          .tuple(...arbTuple_JamaisOse_ToujoursAutreUE, arbStructurePetitPrive)
          .map(fabriqueResultatEvaluationEnSuspensStructure),
        (reponse) => {
          const copieProp = propReponseEtat(reponse);
          const resultatAttendu: EtatEvaluationEnSuspens = {
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
    it(
      "En Suspens / Structure Publique ==> toujours Definitif / Incertain",
      assertionArbitraire(
        fc
          .tuple(...arbTuple_JamaisOse_ToujoursAutreUE, arbStructurePublique)
          .map(fabriqueResultatEvaluationEnSuspensStructure),
        (reponse) => {
          const resultatAttendu: EtatRegulationDefinitif = {
            _resultatEvaluationRegulation: "Definitif",
            etapeEvaluee: "Structure",
            ...resultatIncertain,
          };

          const resultatObtenu = evalueRegulationEtatReponseStructure(reponse);
          expect(resultatObtenu).toStrictEqual(resultatAttendu);
        },
      ),
    );
  });
});
