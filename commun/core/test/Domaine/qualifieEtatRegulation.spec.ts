import { fc } from "@fast-check/vitest";
import { describe, expect, it } from "vitest";
import { DonneesFormulaireSimulateur } from "../../src/Domain/Simulateur/DonneesFormulaire.definitions";
import {
  fabriqueIncertain,
  resultatReguleOSE,
} from "../../src/Domain/Simulateur/fabriques/ResultatRegulation.fabrique";
import { resultatNonRegule } from "../../src/Domain/Simulateur/Regulation.constantes";
import {
  Regulation,
  RegulationEntite,
  TypeEntite,
} from "../../src/Domain/Simulateur/Regulation.definitions";
import {
  fabriqueResultatEvaluationEnSuspensStructure,
  fabriqueResultatEvaluationInconnuOse,
} from "../../src/Domain/Simulateur/services/Eligibilite/EtatRegulation.fabriques";
import { evalueEtatRegulation } from "../../src/Domain/Simulateur/services/Eligibilite/EvalueEtatRegulation";
import { ConvertisseurDonneesBrutesVersEtatDonneesSimulateur } from "../../src/Domain/Simulateur/services/Eligibilite/ReponseEtat.fabriques";
import {
  EtatRegulation,
  EtatRegulationDefinitif,
} from "../../src/Domain/Simulateur/services/Eligibilite/EtatRegulation.definitions";
import {
  afficheDifferences,
  assertionArbitraire,
} from "../utilitaires/ResultatEvaluationRegulation.assertions";
import { fabriqueArbJamaisOse_ToujoursFrance_StructurePetit } from "../utilitaires/ResultatEvaluationRegulation.tuple.arbitraire.fabrique";
import { arbReponseStructure_ToujoursPrivee_ToujoursPE } from "./arbitraires/ReponseStructure.arbitraires";
import { arbReponseDesignationOperateurServicesEssentiels_ToujoursOui } from "./arbitraires/ReponseDesignationOperateurServicesEssentiels.arbitraires";
import { arbReponseInformationsSecteur_LocalisesHorsUE_Petit } from "./arbitraires/ReponseInformationsSecteur.arbitraires";
import { arbTuple_JamaisOse_ToujoursAutreUE } from "./arbitraires/ResultatEvaluationRegulation.arbitraire";

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
    "en suspens / secteurs localisables et localisé hors France ==> toujours définitivement incertain car psa implémenté",
    assertionArbitraire(
      fabriqueArbJamaisOse_ToujoursFrance_StructurePetit(
        arbReponseInformationsSecteur_LocalisesHorsUE_Petit,
      ),
      (reponse: EtatRegulation) => {
        const resultatAttendu: EtatRegulationDefinitif = {
          _resultatEvaluationRegulation: "Definitif",
          etapeEvaluee: "InformationsSecteur",
          ...resultatNonRegule,
        };

        const resultatObtenu = evalueEtatRegulation(reponse);
        expect(
          resultatObtenu,
          afficheDifferences(resultatAttendu, resultatObtenu),
        ).toStrictEqual(resultatAttendu);
      },
    ),
  );
  const contreExemples: (DonneesFormulaireSimulateur & DonneesTest)[] = [
    {
      description:
        "Non OSE > Privée > Infra Num > Petite : Est éligible si le secteur d'activité est 'Infrastructure Numérique",
      decisionAttendue: Regulation.Regule,
      typeEntite: "EntiteEssentielle",
      typeEntitePublique: [],
      fournitServicesUnionEuropeenne: [],
      localisationRepresentant: [],
      secteurActivite: ["infrastructureNumerique"],
      sousSecteurActivite: [],
      designationOperateurServicesEssentiels: ["non"],
      typeStructure: ["privee"],
      trancheChiffreAffaire: ["petit"],
      trancheNombreEmployes: ["petit"],
      appartenancePaysUnionEuropeenne: ["france"],
      activites: ["fournisseurReseauxCommunicationElectroniquesPublics"],
      localisationFournitureServicesNumeriques: [],
    },
    {
      description:
        "Non OSE > Privée > Infra Num > Moyenne/Grande : Moyen grand Gestion TIC",
      decisionAttendue: Regulation.Regule,
      typeEntite: "EntiteImportante",
      typeEntitePublique: [],
      fournitServicesUnionEuropeenne: ["oui"],
      localisationRepresentant: ["france"],
      secteurActivite: ["gestionServicesTic"],
      sousSecteurActivite: [],
      designationOperateurServicesEssentiels: ["non"],
      typeStructure: ["privee"],
      trancheChiffreAffaire: ["grand"],
      appartenancePaysUnionEuropeenne: ["france"],
      trancheNombreEmployes: ["moyen"],
      activites: ["fournisseurServicesSecuriteGeres"],
      localisationFournitureServicesNumeriques: [],
    },
    {
      description:
        "Moyenne ou grande entité localisée en France ou en UE > secteur d'activité et activité listés avec besoin de localisation",
      decisionAttendue: "Regule",
      typeEntite: "EntiteEssentielle",
      typeEntitePublique: [],
      fournitServicesUnionEuropeenne: ["oui"],
      localisationRepresentant: ["france"],
      secteurActivite: ["gestionServicesTic", "infrastructureNumerique"],
      sousSecteurActivite: [],
      designationOperateurServicesEssentiels: ["non"],
      typeStructure: ["privee"],
      trancheChiffreAffaire: ["grand"],
      appartenancePaysUnionEuropeenne: ["france"],
      trancheNombreEmployes: ["grand"],
      activites: ["fournisseurServicesInformatiqueNuage"],
      localisationFournitureServicesNumeriques: [],
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
