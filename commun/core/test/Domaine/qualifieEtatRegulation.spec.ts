import { fc } from "@fast-check/vitest";
import { describe, expect, it } from "vitest";
import { DonneesFormulaireSimulateur } from "../../src/Domain/Simulateur/DonneesFormulaire.definitions";
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
  Regulation,
  RegulationEntite,
  ResultatRegulationEntite,
  TypeEntite,
} from "../../src/Domain/Simulateur/Regulation.definitions";
import { ConvertisseurDonneesBrutesVersEtatDonneesSimulateur } from "../../src/Domain/Simulateur/services/Eligibilite/EtatDonneesSimulateur.fabrique";
import { EtatEvaluation } from "../../src/Domain/Simulateur/services/Eligibilite/EtatEvaluation.definitions";
import {
  OperationEvalueEtape,
  ResultatEvaluationRegulation,
  ResultatEvaluationRegulationDefinitif,
  ResultatEvaluationRegulationEnSuspens,
} from "../../src/Domain/Simulateur/services/Eligibilite/EtatRegulation.definitions";
import {
  evalueEtatRegulation,
  evalueRegulationEtatReponseInformationsSecteur,
  evalueRegulationEtatReponseLocalisation,
  evalueRegulationEtatReponseOse,
  evalueRegulationEtatReponseStructure,
} from "../../src/Domain/Simulateur/services/Eligibilite/EtatRegulation.operations";
import { propReponseEtat } from "../../src/Domain/Simulateur/services/Eligibilite/Reponse.operations";
import { fabriqueResultatEvaluationRegulationDefinitif } from "../../src/Domain/Simulateur/services/Eligibilite/ResultatEvaluationRegulation.fabriques";
import { estResultatRegulationPositif } from "../../src/Domain/Simulateur/services/Regulation/Regulation.predicats";
import {
  afficheDifferences,
  assertionArbitraire,
} from "../utilitaires/ResultatEvaluationRegulation.assertions";
import { arbEnsembleSecteursLocalisablesPetitFrance } from "./arbitraires/EnsembleInformationsSecteur.arbitraires";
import {
  arbReponseInformationsSecteur_AvecActivitesEssentiels_SansBesoinLocalisation,
  arbReponseInformationsSecteurFranceGrandEILocalisationHorsFrance,
  arbReponseInformationsSecteurGrand,
  arbReponseInformationsSecteurGrandActivitesAutres,
  arbReponseInformationsSecteur_LocalisesFrance_Grand_EI,
  arbReponseInformationsSecteurLocalisesFranceGrandInfranumEE,
  arbReponseInformationsSecteurLocalisesFranceGrandInfranumEI,
  arbReponseInformationsSecteurLocalisesFrancePetit,
  arbReponseInformationsSecteurLocalisesHorsFrancePetit,
  arbReponseInformationsSecteurPetit,
} from "./arbitraires/ReponseInformationsSecteur.arbitraires";
import {
  fabriqueArbJamaisOse_ToujoursFrance_StructureGrand,
  fabriqueArbJamaisOse_ToujoursFrance_StructurePetit,
  tupleArbitrairesJamaisOseJamaisFrance,
  tupleArbitrairesJamaisOseToujoursFrance,
} from "./arbitraires/ResultatEvaluationRegulation.arbitraire";
import {
  fabriqueArbInformationsSecteurAutre,
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
import { arbitrairesResultatRegulation } from "./arbitraires/ResultatRegulation.arbitraires";

const verificationReponseNonRegule = (
  reponse: ResultatEvaluationRegulation,
) => {
  const resultatAttendu: ResultatEvaluationRegulationDefinitif = {
    _resultatEvaluationRegulation: "Definitif",
    etapeEvaluee: "InformationsSecteur",
    ...resultatNonRegule,
  };

  const resultatObtenu =
    evalueRegulationEtatReponseInformationsSecteur(reponse);
  expect(
    resultatObtenu,
    afficheDifferences(resultatAttendu, resultatObtenu),
  ).toStrictEqual(resultatAttendu);
};
const fabriqueVerificationReponseDefinitivementRegule =
  (typeEntite: TypeEntite) => (reponse: ResultatEvaluationRegulation) => {
    const causes: CausesRegulation = {
      ...propReponseEtat(reponse)("Structure"),
      ...propReponseEtat(reponse)("InformationsSecteur"),
    };
    const resultatAttendu: ResultatEvaluationRegulationDefinitif = {
      _resultatEvaluationRegulation: "Definitif",
      etapeEvaluee: "InformationsSecteur",
      ...fabriqueRegule(causes, typeEntite),
    };

    const resultatObtenu =
      evalueRegulationEtatReponseInformationsSecteur(reponse);
    expect(
      resultatObtenu,
      afficheDifferences(resultatAttendu, resultatObtenu),
    ).toStrictEqual(resultatAttendu);
  };

const verificationReponseDefinitivementReguleEI =
  fabriqueVerificationReponseDefinitivementRegule("EntiteImportante");

const verificationReponseDefinitivementReguleEE =
  fabriqueVerificationReponseDefinitivementRegule("EntiteEssentielle");

type DonneesTest = {
  description: string;
  decisionAttendue: RegulationEntite;
  typeEntite: TypeEntite;
};
describe("Regulation Etat Reponse", () => {
  describe("Invariants", () => {
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
  describe("Réponses partielles", () => {
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
          arbDesignationOperateurServicesEssentielsToujoursNon.map(
            fabriqueResultatEvaluationInconnuOse,
          ),
          (reponse) => {
            const copieProp = propReponseEtat(reponse);
            const resultatAttendu: ResultatEvaluationRegulationEnSuspens = {
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
            const resultatAttendu: ResultatEvaluationRegulationDefinitif = {
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
        "Structure Privée ==> toujours EnSuspens / Incertain",
        assertionArbitraire(
          fc
            .tuple(
              ...tupleArbitrairesJamaisOseToujoursFrance,
              arbStructurePetitPrive,
            )
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

            const resultatObtenu =
              evalueRegulationEtatReponseStructure(reponse);
            expect(resultatObtenu).toStrictEqual(resultatAttendu);
          },
        ),
      );
      it(
        "En Suspens / Structure Publique ==> toujours Definitif / Incertain",
        assertionArbitraire(
          fc
            .tuple(
              ...tupleArbitrairesJamaisOseToujoursFrance,
              arbStructurePublique,
            )
            .map(fabriqueResultatEvaluationEnSuspensStructure),
          (reponse) => {
            const resultatAttendu: ResultatEvaluationRegulationDefinitif = {
              _resultatEvaluationRegulation: "Definitif",
              etapeEvaluee: "Structure",
              ...resultatIncertain,
            };

            const resultatObtenu =
              evalueRegulationEtatReponseStructure(reponse);
            expect(resultatObtenu).toStrictEqual(resultatAttendu);
          },
        ),
      );
    });
  });
  describe("Secteur", () => {
    describe("Petit", () => {
      it("should stat", () => {
        fc.statistics(arbEnsembleSecteursLocalisablesPetitFrance, (ensemble) =>
          [...ensemble].map((s) => [...s.activites].join(", ")).join(";; "),
        );
      });
      it(
        "en suspens / secteur autre ==> toujours définitivement non régulé",
        assertionArbitraire(
          fabriqueArbJamaisOse_ToujoursFrance_StructurePetit(
            fabriqueArbInformationsSecteurAutre("Petit"),
          ),
          verificationReponseNonRegule,
        ),
      );

      it(
        "en suspens / secteurs+activités localisables et bien localisés ==> toujours définitivement régulé EE",
        assertionArbitraire(
          fabriqueArbJamaisOse_ToujoursFrance_StructurePetit(
            arbReponseInformationsSecteurLocalisesFrancePetit,
          ),
          verificationReponseDefinitivementReguleEE,
        ),
      );
      it(
        "en suspens / secteurs+activités essentielle sans besoin localisation ==> toujours définitivement régulé EE",
        assertionArbitraire(
          fabriqueArbJamaisOse_ToujoursFrance_StructurePetit(
            arbReponseInformationsSecteur_AvecActivitesEssentiels_SansBesoinLocalisation,
          ),
          verificationReponseDefinitivementReguleEE,
        ),
      );
      it(
        "en suspens / secteurs localisables et localisé hors France ==> toujours définitivement non-régulé",
        assertionArbitraire(
          fabriqueArbJamaisOse_ToujoursFrance_StructurePetit(
            arbReponseInformationsSecteurLocalisesHorsFrancePetit,
          ),
          verificationReponseNonRegule,
        ),
      );
      it(
        "en suspens / secteurs liste non eligible ==> toujours définitivement non-régulé",
        assertionArbitraire(
          fabriqueArbJamaisOse_ToujoursFrance_StructurePetit(
            arbReponseInformationsSecteurPetit,
          ),
          verificationReponseNonRegule,
        ),
      );
    });
    describe("Grandes", () => {
      it(
        "en suspens / secteur et sous-secteur listés ==> toujours définitivement régulé",
        assertionArbitraire(
          fabriqueArbJamaisOse_ToujoursFrance_StructureGrand(
            arbReponseInformationsSecteurGrand,
          ),
          verificationReponseDefinitivementReguleEI,
        ),
      );
      it(
        "en suspens / secteurs+activités EI localisables et bien localisés ==> toujours définitivement régulé EI",
        assertionArbitraire(
          fabriqueArbJamaisOse_ToujoursFrance_StructureGrand(
            arbReponseInformationsSecteur_LocalisesFrance_Grand_EI,
          ),
          verificationReponseDefinitivementReguleEI,
        ),
      );
      it(
        "en suspens / secteurs Infrastructure Numérique + activités EI sans besoin localisation ==> toujours définitivement régulé EI",
        assertionArbitraire(
          fabriqueArbJamaisOse_ToujoursFrance_StructureGrand(
            arbReponseInformationsSecteurLocalisesFranceGrandInfranumEI,
          ),
          verificationReponseDefinitivementReguleEI,
        ),
      );
      it(
        "en suspens / secteurs+activités EE localisables et bien localisés ==> toujours définitivement régulé EE",
        assertionArbitraire(
          fabriqueArbJamaisOse_ToujoursFrance_StructureGrand(
            arbReponseInformationsSecteurLocalisesFranceGrandInfranumEE,
          ),
          verificationReponseDefinitivementReguleEE,
        ),
      );
      it(
        "en suspens / secteurs+activités EI localisables et bien localisés ==> toujours définitivement non-régulé",
        assertionArbitraire(
          fabriqueArbJamaisOse_ToujoursFrance_StructureGrand(
            arbReponseInformationsSecteurFranceGrandEILocalisationHorsFrance,
          ),
          verificationReponseNonRegule,
        ),
      );
      it(
        "en suspens / secteurs/sous-secteur listés, uniquement activités autres ==> toujours définitivement non-régulé",
        assertionArbitraire(
          fabriqueArbJamaisOse_ToujoursFrance_StructureGrand(
            arbReponseInformationsSecteurGrandActivitesAutres,
          ),
          verificationReponseNonRegule,
        ),
      );
      it(
        "en suspens / secteur autre Grand ==> toujours définitivement non régulé",
        assertionArbitraire(
          fabriqueArbJamaisOse_ToujoursFrance_StructureGrand(
            fabriqueArbInformationsSecteurAutre("Grand"),
          ),
          verificationReponseNonRegule,
        ),
      );
    });
    describe("Cas incertains", () => {});
  });
  describe("chaine de décision", () => {
    it(
      "Une entité désignée OSE est toujours qualifiée définitivement régulée",
      assertionArbitraire(
        arbDesignationOperateurServicesEssentielsToujoursOui.map(
          fabriqueResultatEvaluationInconnuOse,
        ),
        (reponse) => {
          const resultatAttendu: ResultatEvaluationRegulation = {
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
      "Structure Privée ==> toujours EnSuspens / Incertain",
      assertionArbitraire(
        fc
          .tuple(
            ...tupleArbitrairesJamaisOseToujoursFrance,
            arbStructurePetitPrive,
          )
          .map(fabriqueResultatEvaluationEnSuspensStructure),
        (reponse) => {
          const resultatAttendu: ResultatEvaluationRegulationDefinitif = {
            _resultatEvaluationRegulation: "Definitif",
            etapeEvaluee: "InformationsSecteur",
            ...resultatIncertain,
          };

          const resultatObtenu = evalueEtatRegulation(reponse);
          expect(resultatObtenu).toStrictEqual(resultatAttendu);
        },
      ),
    );
    it(
      "en suspens / secteurs localisables et localisé hors France ==> toujours définitivement non-régulé",
      assertionArbitraire(
        fabriqueArbJamaisOse_ToujoursFrance_StructurePetit(
          arbReponseInformationsSecteurLocalisesHorsFrancePetit,
        ),
        (reponse: ResultatEvaluationRegulation) => {
          const resultatAttendu: ResultatEvaluationRegulationDefinitif = {
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
    ];
    it.each(contreExemples)(
      "Attendu: $decisionAttendue - $description",
      (donneesFormulaire) => {
        const resultatEvaluationRegulation =
          ConvertisseurDonneesBrutesVersEtatDonneesSimulateur.depuisDonneesFormulaireSimulateur(
            donneesFormulaire,
          ) as ResultatEvaluationRegulation;
        const resultatRegulationQualifiee = evalueEtatRegulation(
          resultatEvaluationRegulation,
        );
        expect(resultatRegulationQualifiee.decision).toEqual(
          donneesFormulaire.decisionAttendue,
        );
      },
    );
  });
});
