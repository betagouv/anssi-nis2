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
import { ConvertisseurDonneesBrutesVersEtatDonneesSimulateur } from "../../src/Domain/Simulateur/services/Eligibilite/EtatDonneesSimulateur.fabrique";
import {
  EtatRegulation,
  EtatRegulationDefinitif,
} from "../../src/Domain/Simulateur/services/Eligibilite/EtatRegulation.definitions";
import { evalueEtatRegulation } from "../../src/Domain/Simulateur/services/Eligibilite/EtatRegulation.operations";
import {
  afficheDifferences,
  assertionArbitraire,
} from "../utilitaires/ResultatEvaluationRegulation.assertions";
import { arbReponseInformationsSecteurLocalisesHorsFrancePetit } from "./arbitraires/ReponseInformationsSecteur.arbitraires";
import {
  arbTuple_JamaisOse_ToujoursAutreUE,
  fabriqueArbJamaisOse_ToujoursFrance_StructurePetit,
} from "./arbitraires/ResultatEvaluationRegulation.arbitraire";
import {
  fabriqueResultatEvaluationEnSuspensStructure,
  fabriqueResultatEvaluationInconnuOse,
} from "../utilitaires/ResultatEvaluationRegulation.arbitraire.fabrique";
import {
  arbDesignationOperateurServicesEssentielsToujoursOui,
  arbStructurePetitPrive,
} from "./arbitraires/ResultatEvaluationRegulation.bases.arbitraire";

type DonneesTest = {
  description: string;
  decisionAttendue: RegulationEntite;
  typeEntite: TypeEntite;
};
describe("chaine de décision", () => {
  it(
    "Une entité désignée OSE est toujours qualifiée définitivement régulée",
    assertionArbitraire(
      arbDesignationOperateurServicesEssentielsToujoursOui.map(
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
        .tuple(...arbTuple_JamaisOse_ToujoursAutreUE, arbStructurePetitPrive)
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
        arbReponseInformationsSecteurLocalisesHorsFrancePetit,
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
