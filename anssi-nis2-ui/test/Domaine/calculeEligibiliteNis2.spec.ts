import { describe, expect, it } from "vitest";
import { DonneesFormulaireSimulateur } from "../../src/Domaine/Simulateur/DonneesFormulaire";
import {
  listeActivitesAutre,
  listeActivitesSaufAutre,
} from "../../src/Domaine/Simulateur/Activite";
import {
  eligibilite,
  ResultatEligibiliteEnum,
} from "../../src/Domaine/Simulateur/resultatEligibilite";

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
        ResultatEligibiliteEnum.Eligible,
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
        describe.each([reponsesFrancePrivePetit])("Petit", (reponses) => {
          const reponsesFrancePrivePetitInfraNum = reponses.avec({
            secteurActivite: ["infrastructureNumerique"],
          });
          describe.each([reponsesFrancePrivePetitInfraNum])(
            "Fournisseur Infrastructure Numérique",
            (reponses) => {
              describe(`est éligible`, () => {
                it.each(listeActivitesSaufAutre)(
                  `quand activité=%s)`,
                  (activite) => {
                    const donneesSimu = reponses.avec({
                      activites: [activite],
                    });
                    expect(eligibilite(donneesSimu)).toStrictEqual(
                      ResultatEligibiliteEnum.Eligible,
                    );
                  },
                );
              });
              describe(`n'est pas éligible`, () => {
                it.each(listeActivitesAutre)(
                  `quand activité est %s`,
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
            },
          );
        });
      });
    });
  });
});
