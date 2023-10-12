import { describe, expect, it } from "vitest";
import { DonneesFormulaireSimulateur } from "../../src/Domaine/Simulateur/DonneesFormulaire";
import { listeActivitesAutre } from "../../src/Domaine/Simulateur/Activite";
import {
  eligibilite,
  ResultatEligibiliteEnum,
} from "../../src/Domaine/Simulateur/resultatEligibilite";
import { suiteTestsNonOSEPriveFrancePetit } from "./Eligibilite/NonOSEPriveFrancePetit";
import { suiteTestsNonOSEPriveFranceMoyenneGrande } from "./Eligibilite/NonOSEPriveFranceMoyenneGrande";

describe("Calcul d'éligibilité NIS 2", () => {
  const reponseDesigneOSE = new DonneesFormulaireSimulateur({
    designeOperateurServicesEssentiels: ["oui"],
  });
  const reponseNonDesigneOSE = new DonneesFormulaireSimulateur({
    designeOperateurServicesEssentiels: ["non"],
  });
  describe.each([reponseDesigneOSE])("Designe OSE NIS 1", (reponses) => {
    it("est toujours Eligible", () => {
      expect(eligibilite(reponses)).toStrictEqual(
        ResultatEligibiliteEnum.EligiblePetiteEntreprise,
      );
    });
  });
  describe.each([reponseNonDesigneOSE])("Non designe OSE NIS 1", () => {
    describe.each([reponseNonDesigneOSE])("Autres activités", (reponses) => {
      it.each(listeActivitesAutre)(
        "doit calculer non-eligible si la seul activité cochée est '%s'",
        (activite) => {
          const donneesSimu = reponses.avec({
            activites: [activite],
          });
          expect(eligibilite(donneesSimu)).toStrictEqual(
            ResultatEligibiliteEnum.NonEligible,
          );
        },
      );
    });
    const reponsesFrance = new DonneesFormulaireSimulateur({
      etatMembre: ["france"],
    });
    describe.each([reponsesFrance])("France", (reponses) => {
      const reponsesFrancePrive = reponses.avec({
        typeStructure: ["privee"],
      });
      describe.each([reponsesFrancePrive])("Privé", (reponses) => {
        const reponsesFrancePrivePetit = reponses.avec({
          trancheCA: ["petit"],
          trancheNombreEmployes: ["petit"],
        });
        describe.each([reponsesFrancePrivePetit])(
          "Petit",
          suiteTestsNonOSEPriveFrancePetit,
        );
        const reponsesFrancePriveMoyen = [
          reponses.avec({
            trancheCA: ["moyen"],
            trancheNombreEmployes: ["moyen"],
          }),
          reponses.avec({
            trancheCA: ["petit"],
            trancheNombreEmployes: ["moyen"],
          }),
          reponses.avec({
            trancheCA: ["moyen"],
            trancheNombreEmployes: ["petit"],
          }),
        ];
        describe.each(reponsesFrancePriveMoyen)(
          "Moyen CA$trancheCA Empl$trancheNombreEmployes",
          suiteTestsNonOSEPriveFranceMoyenneGrande,
        );
        const grandeEntreprise = reponses.avec({
          trancheCA: ["grand"],
          trancheNombreEmployes: ["grand"],
        });
        const reponsesFrancePriveGrand = [
          grandeEntreprise,
          grandeEntreprise.avec({ trancheCA: ["petit"] }),
          grandeEntreprise.avec({ trancheCA: ["moyen"] }),
          grandeEntreprise.avec({ trancheNombreEmployes: ["petit"] }),
          grandeEntreprise.avec({ trancheNombreEmployes: ["moyen"] }),
        ];
        describe.each(reponsesFrancePriveGrand)(
          "Intermediaire CA$trancheCA Empl$trancheNombreEmployes",
          suiteTestsNonOSEPriveFranceMoyenneGrande,
        );
      });
    });
  });
});
