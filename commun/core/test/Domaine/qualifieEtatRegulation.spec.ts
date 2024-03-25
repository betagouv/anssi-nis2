import { fc } from "@fast-check/vitest";
import { describe, expect, it } from "vitest";
import { DonneesFormulaireSimulateur } from "../../src/Domain/Simulateur/services/DonneesFormulaire/DonneesFormulaire.definitions";
import {
  fabriqueIncertain,
  resultatReguleOSE,
} from "../../src/Domain/Simulateur/ResultatRegulation.fabrique";
import {
  RegulationEntite,
  TypeEntite,
} from "../../src/Domain/Simulateur/Regulation.definitions";
import {
  fabriqueResultatEvaluationEnSuspensAppUE,
  fabriqueResultatEvaluationEnSuspensStructure,
  fabriqueResultatEvaluationInconnuOse,
} from "../../src/Domain/Simulateur/services/Eligibilite/EtatRegulation.fabriques";
import { evalueEtatRegulation } from "../../src/Domain/Simulateur/services/Eligibilite/EvalueEtatRegulation";
import { ConvertisseurDonneesBrutesVersEtatDonneesSimulateur } from "../../src/Domain/Simulateur/services/Eligibilite/ReponseEtat.fabriques";
import {
  EtatRegulation,
  EtatRegulationDefinitif,
} from "../../src/Domain/Simulateur/services/Eligibilite/EtatRegulation.definitions";
import { assertionArbitraire } from "../utilitaires/ResultatEvaluationRegulation.assertions";
import { arbReponseStructure_ToujoursPrivee_ToujoursPE } from "./arbitraires/ReponseStructure.arbitraires";
import { arbReponseDesignationOperateurServicesEssentiels_ToujoursOui } from "./arbitraires/ReponseDesignationOperateurServicesEssentiels.arbitraires";
import {
  arbTuple_JamaisOse_ToujoursAutreUE,
  arbTuple_JamaisOse_ToujoursHorsUE,
} from "./arbitraires/ResultatEvaluationRegulation.arbitraire";

type DonneesTest = {
  description: string;
  decisionAttendue: RegulationEntite;
  typeEntite: TypeEntite;
};
describe("chaine de décision", () => {
  it(
    "Une entité désignée OSE est toujours qualifiée définitivement régulée",
    assertionArbitraire(
      arbReponseDesignationOperateurServicesEssentiels_ToujoursOui.map(
        fabriqueResultatEvaluationInconnuOse,
      ),
      (reponse) => {
        const resultatAttendu: EtatRegulation = {
          _resultatEvaluationRegulation: "Definitif",
          etapeEvaluee: "InformationsSecteur",
          ...resultatReguleOSE,
        };
        const resultatObtenu = evalueEtatRegulation(reponse);
        expect(resultatObtenu).toStrictEqual(resultatAttendu);
      },
    ),
  );
  it(
    "Structure Privée autre UE ==> toujours EnSuspens / Incertain mais p-e pays membre",
    assertionArbitraire(
      fc
        .tuple(
          ...arbTuple_JamaisOse_ToujoursAutreUE,
          arbReponseStructure_ToujoursPrivee_ToujoursPE,
        )
        .map(fabriqueResultatEvaluationEnSuspensStructure),
      (reponse) => {
        const resultatAttendu: EtatRegulationDefinitif = {
          _resultatEvaluationRegulation: "Definitif",
          etapeEvaluee: "InformationsSecteur",
          ...fabriqueIncertain({ _tag: "DefiniDansUnAutreEtatMembre" }),
        };

        const resultatObtenu = evalueEtatRegulation(reponse);
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
          etapeEvaluee: "InformationsSecteur",
          ...fabriqueIncertain({
            _tag: "ConstructionTestEnCours",
            typeConstructionEnCours: "HorsUnionEuropeenne",
          }),
        };
        const resultatObtenu = evalueEtatRegulation(reponse);
        expect(resultatObtenu).toStrictEqual(resultatAttendu);
      },
    ),
  );

  const contreExemples: (DonneesFormulaireSimulateur & DonneesTest)[] = [
    {
      description: "Gestion TIC France",
      decisionAttendue: "Regule",
      typeEntite: "EntiteImportante",
      designationOperateurServicesEssentiels: ["non"],
      appartenancePaysUnionEuropeenne: ["france"],
      secteurActivite: ["gestionServicesTic"],
      sousSecteurActivite: [],
      trancheChiffreAffaire: ["moyen"],
      trancheNombreEmployes: ["petit"],
      typeStructure: ["privee"],
      typeEntitePublique: [],
      activites: ["fournisseurServicesGeres"],
      localisationFournitureServicesNumeriques: [],
      paysDecisionsCyber: ["france"],
      paysOperationsCyber: [],
      paysPlusGrandNombreSalaries: [],
    },
  ];
  it.each(contreExemples)(
    "Attendu: $decisionAttendue - $description",
    (donneesFormulaire) => {
      const resultatEvaluationRegulation =
        ConvertisseurDonneesBrutesVersEtatDonneesSimulateur.depuisDonneesFormulaireSimulateur(
          donneesFormulaire,
        ) as EtatRegulation;
      const resultatRegulationQualifiee = evalueEtatRegulation(
        resultatEvaluationRegulation,
      );
      expect(resultatRegulationQualifiee.decision).toEqual(
        donneesFormulaire.decisionAttendue,
      );
    },
  );
});
