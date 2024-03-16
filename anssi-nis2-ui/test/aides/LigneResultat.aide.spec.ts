import { describe, expect, it } from "vitest";
import { ActivitesSecteurBancaire } from "../../../commun/core/src/Domain/Simulateur/Activite.definitions";
import { Regulation } from "../../../commun/core/src/Domain/Simulateur/Regulation.definitions";
import { EtatRegulationDefinitif } from "../../../commun/core/src/Domain/Simulateur/services/Eligibilite/EtatRegulation.definitions";
import { ens } from "../../../commun/utils/services/sets.operations";
import {
  estCasGere,
  fabriqueClassesCSSResultat,
  getInformationsResultatEvaluation,
} from "../../src/Components/Simulateur/Resultats/LigneResultat.aide";
import {
  libelleTitreReguleEntiteEssentielle,
  libelleTitreReguleEntiteEssentielleTelcoPlusieursPaysDontFrance,
  libelleTitreReguleEntiteImportante,
} from "../../src/References/LibellesResultatsEligibilite";

describe("LigneResultat.aide", () => {
  describe(getInformationsResultatEvaluation, () => {
    describe("Régulés", () => {
      it("Entité Essentielle", () => {
        const etatEvaluation: EtatRegulationDefinitif = {
          _resultatEvaluationRegulation: "Definitif",
          etapeEvaluee: "InformationsSecteur",
          decision: "Regule",
          typeEntite: "EntiteEssentielle",
        };
        const informationsResultatEvaluationAttendues = {
          titre: libelleTitreReguleEntiteEssentielle,
          classes: fabriqueClassesCSSResultat(
            "fr-icon-check-line",
            "fr-nis2-eligible",
          ),
          fichierPrecisions: "PrecisionsResultat.ReguleStandard",
        };
        expect(getInformationsResultatEvaluation(etatEvaluation)).toStrictEqual(
          informationsResultatEvaluationAttendues,
        );
      });
      it("Entité Importante", () => {
        const etatEvaluation: EtatRegulationDefinitif = {
          _resultatEvaluationRegulation: "Definitif",
          etapeEvaluee: "InformationsSecteur",
          decision: "Regule",
          typeEntite: "EntiteImportante",
        };
        const informationsResultatEvaluationAttendues = {
          titre: libelleTitreReguleEntiteImportante,
          classes: fabriqueClassesCSSResultat(
            "fr-icon-check-line",
            "fr-nis2-eligible",
          ),
          fichierPrecisions: "PrecisionsResultat.ReguleStandard",
        };
        expect(getInformationsResultatEvaluation(etatEvaluation)).toStrictEqual(
          informationsResultatEvaluationAttendues,
        );
      });
      it("DORA", () => {
        const etatEvaluation: EtatRegulationDefinitif = {
          _resultatEvaluationRegulation: "Definitif",
          etapeEvaluee: "InformationsSecteur",
          decision: "Regule",
          typeEntite: "EntiteImportante",
          causes: {
            Structure: {
              _categorieTaille: "Grand",
              typeStructure: "privee",
              trancheChiffreAffaire: "moyen",
              trancheNombreEmployes: "grand",
            },
            InformationsSecteur: {
              _categorieTaille: "Grand",
              secteurs: ens({
                secteurActivite: "banqueSecteurBancaire",
                activites: ens<ActivitesSecteurBancaire>("etablissementCredit"),
              }),
            },
          },
        };
        const informationsResultatEvaluationAttendues = {
          titre: libelleTitreReguleEntiteImportante,
          classes: fabriqueClassesCSSResultat(
            "fr-icon-check-line",
            "fr-nis2-eligible",
          ),
          fichierPrecisions: "PrecisionsResultat.ReguleDORA",
        };
        expect(getInformationsResultatEvaluation(etatEvaluation)).toStrictEqual(
          informationsResultatEvaluationAttendues,
        );
      });
      it("Fournisseur de services d'Enregistrement de noms de domaines", () => {
        const etatEvaluation: EtatRegulationDefinitif = {
          _resultatEvaluationRegulation: "Definitif",
          etapeEvaluee: "InformationsSecteur",
          decision: "Regule",
          typeEntite: "EntiteImportante",
          causes: {
            Structure: {
              _categorieTaille: "Grand",
              typeStructure: "privee",
              trancheChiffreAffaire: "moyen",
              trancheNombreEmployes: "grand",
            },
            InformationsSecteur: {
              _categorieTaille: "Grand",
              secteurs: ens({
                _categorieTaille: "Grand",
                secteurActivite: "infrastructureNumerique",
                activites: ens("fournisseurServicesEnregristrementNomDomaine"),
              }),
            },
          },
        };
        const informationsResultatEvaluationAttendues = {
          titre: libelleTitreReguleEntiteImportante,
          classes: fabriqueClassesCSSResultat(
            "fr-icon-check-line",
            "fr-nis2-eligible",
          ),
          fichierPrecisions:
            "PrecisionsResultat.ReguleEnregistrementDeNomsDeDomaine",
        };
        expect(getInformationsResultatEvaluation(etatEvaluation)).toStrictEqual(
          informationsResultatEvaluationAttendues,
        );
      });
      it("Telco France + autres pays / question orange", () => {
        const etatEvaluation: EtatRegulationDefinitif = {
          _resultatEvaluationRegulation: "Definitif",
          etapeEvaluee: "InformationsSecteur",
          decision: "Regule",
          typeEntite: "EntiteEssentielle",
          causes: {
            Structure: {
              _categorieTaille: "Grand",
              typeStructure: "privee",
              trancheChiffreAffaire: "moyen",
              trancheNombreEmployes: "grand",
            },
            InformationsSecteur: {
              _categorieTaille: "Grand",
              secteurs: ens({
                _categorieTaille: "Grand",
                secteurActivite: "infrastructureNumerique",
                activites: ens(
                  "fournisseurReseauxCommunicationElectroniquesPublics",
                ),
                localisationFournitureServicesNumeriques: ens(
                  "france",
                  "autre",
                ),
              }),
            },
          },
        };
        const informationsResultatEvaluationAttendues = {
          titre:
            libelleTitreReguleEntiteEssentielleTelcoPlusieursPaysDontFrance,
          classes: fabriqueClassesCSSResultat(
            "fr-icon-check-line",
            "fr-nis2-eligible",
          ),
          fichierPrecisions: "PrecisionsResultat.ReguleTelcoFranceEtAutreEM",
        };
        expect(getInformationsResultatEvaluation(etatEvaluation)).toStrictEqual(
          informationsResultatEvaluationAttendues,
        );
      });
      it("Telco Autre EM / question bleue", () => {
        const etatEvaluation: EtatRegulationDefinitif = {
          _resultatEvaluationRegulation: "Definitif",
          etapeEvaluee: "InformationsSecteur",
          decision: "Regule",
          typeEntite: "EntiteImportante",
          causes: {
            Structure: {
              _categorieTaille: "Grand",
              typeStructure: "privee",
              trancheChiffreAffaire: "moyen",
              trancheNombreEmployes: "grand",
            },
            InformationsSecteur: {
              _categorieTaille: "Grand",
              secteurs: ens({
                _categorieTaille: "Grand",
                secteurActivite: "infrastructureNumerique",
                activites: ens("fournisseurServicesInformatiqueNuage"),
                paysDecisionsCyber: "autre",
              }),
            },
          },
        };
        const informationsResultatEvaluationAttendues = {
          titre: libelleTitreReguleEntiteImportante,
          classes: fabriqueClassesCSSResultat(
            "fr-icon-check-line",
            "fr-nis2-eligible",
          ),
          fichierPrecisions: "PrecisionsResultat.ReguleTelcoAutreEM",
        };
        expect(getInformationsResultatEvaluation(etatEvaluation)).toStrictEqual(
          informationsResultatEvaluationAttendues,
        );
      });
      it("Telco Autre EM / question orange", () => {
        const etatEvaluation: EtatRegulationDefinitif = {
          _resultatEvaluationRegulation: "Definitif",
          etapeEvaluee: "InformationsSecteur",
          decision: "Regule",
          typeEntite: "EntiteImportante",
          causes: {
            Structure: {
              _categorieTaille: "Grand",
              typeStructure: "privee",
              trancheChiffreAffaire: "moyen",
              trancheNombreEmployes: "grand",
            },
            InformationsSecteur: {
              _categorieTaille: "Grand",
              secteurs: ens({
                _categorieTaille: "Grand",
                secteurActivite: "infrastructureNumerique",
                activites: ens(
                  "fournisseurReseauxCommunicationElectroniquesPublics",
                ),
                localisationFournitureServicesNumeriques: ens("autre"),
              }),
            },
          },
        };
        const informationsResultatEvaluationAttendues = {
          titre: libelleTitreReguleEntiteImportante,
          classes: fabriqueClassesCSSResultat(
            "fr-icon-check-line",
            "fr-nis2-eligible",
          ),
          fichierPrecisions: "PrecisionsResultat.ReguleTelcoAutreEM",
        };
        expect(getInformationsResultatEvaluation(etatEvaluation)).toStrictEqual(
          informationsResultatEvaluationAttendues,
        );
      });
    });
    // describe("Non régulés", () => {
    //   // Standard
    //   // Hors UE
    // });

    // describe("Incertain", () => {
    //   // Standard
    //   // Autre EM
    // });
  });

  describe(estCasGere, () => {
    it("faux si incertain", () => {
      const etatRegulation: EtatRegulationDefinitif = {
        _resultatEvaluationRegulation: "Definitif",
        decision: "Incertain",
        causes: {
          _tag: "ConstructionTestEnCours",
          typeConstructionEnCours: "EntitePublique",
        },
        etapeEvaluee: "InformationsSecteur",
      };
      expect(estCasGere(etatRegulation)).toBeFalsy();
    });
    it("vrai si incertain / construction en cours / hors ue", () => {
      const etatRegulation: EtatRegulationDefinitif = {
        _resultatEvaluationRegulation: "Definitif",
        decision: "Incertain",
        causes: {
          _tag: "ConstructionTestEnCours",
          typeConstructionEnCours: "HorsUnionEuropeenne",
        },
        etapeEvaluee: "InformationsSecteur",
      };
      expect(estCasGere(etatRegulation)).toBeTruthy();
    });
    it("vrai si incertain / construction en cours / hors ue", () => {
      const etatRegulation: EtatRegulationDefinitif = {
        _resultatEvaluationRegulation: "Definitif",
        decision: "Incertain",
        causes: {
          _tag: "DefiniDansUnAutreEtatMembre",
        },
        etapeEvaluee: "InformationsSecteur",
      };
      expect(estCasGere(etatRegulation)).toBeTruthy();
    });
    it.each([Regulation.Regule, Regulation.NonRegule])(
      "vrai si %s",
      (decision) => {
        const etatRegulation: EtatRegulationDefinitif = {
          _resultatEvaluationRegulation: "Definitif",
          decision: decision,
          etapeEvaluee: "InformationsSecteur",
        };
        expect(estCasGere(etatRegulation)).toBeTruthy();
      },
    );
  });
});
