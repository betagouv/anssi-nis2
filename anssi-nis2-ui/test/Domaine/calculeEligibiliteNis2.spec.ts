import { describe, expect, it } from "vitest";
import {
  DonneesFormulaireSimulateur,
  donneesFormulaireSimulateurVide,
} from "../../src/Domaine/Simulateur/DonneesFormulaire";
import {
  listeActivitesAutre,
  listeActivitesSaufAutre,
} from "../../src/Domaine/Simulateur/Activite";
import {
  eligibilite,
  ResultatEligibiliteEnum,
} from "../../src/Domaine/Simulateur/resultatEligibilite";

describe("Calcul d'éligibilité NIS 2", () => {
  const reponseDesigneOSE: DonneesFormulaireSimulateur = {
    ...donneesFormulaireSimulateurVide,
    designeOperateurServicesEssentiels: ["oui"],
  };
  const reponseNonDesigneOSE: DonneesFormulaireSimulateur = {
    ...donneesFormulaireSimulateurVide,
    designeOperateurServicesEssentiels: ["non"],
  };
  describe.each([reponseDesigneOSE])("Designe OSE NIS 1", (reponses) => {
    it("est toujours Eligible", () => {
      const donneesSimu: DonneesFormulaireSimulateur = {
        ...reponses,
      };
      expect(eligibilite(donneesSimu)).toStrictEqual(
        ResultatEligibiliteEnum.Eligible,
      );
    });
  });
  describe.each([reponseNonDesigneOSE])("Non designe OSE NIS 1", () => {
    describe.each([reponseNonDesigneOSE])("Autres activités", (reponses) => {
      it.each(listeActivitesAutre)(
        "doit calculer non-eligible si la seul activité cochée est '%s'",
        (activite) => {
          const donneesSimu: DonneesFormulaireSimulateur = {
            ...reponses,
            activites: [activite],
          };
          expect(eligibilite(donneesSimu)).toStrictEqual(
            ResultatEligibiliteEnum.NonEligible,
          );
        },
      );
    });
    const reponsesFrance: DonneesFormulaireSimulateur = {
      ...donneesFormulaireSimulateurVide,
      etatMembre: ["france"],
    };
    describe.each([reponsesFrance])("France", (reponses) => {
      const reponsesFrancePrive: DonneesFormulaireSimulateur = {
        ...reponses,
        typeStructure: ["privee"],
      };
      describe.each([reponsesFrancePrive])("Privé", (reponses) => {
        const reponsesFrancePrivePetit: DonneesFormulaireSimulateur = {
          ...reponses,
          trancheCA: ["petit"],
          trancheNombreEmployes: ["petit"],
        };
        describe.each([reponsesFrancePrivePetit])("Petit", (reponses) => {
          const reponsesFrancePrivePetitInfraNum: DonneesFormulaireSimulateur =
            {
              ...reponses,
              secteurActivite: ["infrastructureNumerique"],
            };
          describe.each([reponsesFrancePrivePetitInfraNum])(
            "Fournisseur Infrastructure Numérique",
            (reponses) => {
              describe(`est éligible`, () => {
                it.each(listeActivitesSaufAutre)(
                  `quand activité=%s)`,
                  (activite) => {
                    const donneesSimu: DonneesFormulaireSimulateur = {
                      ...reponses,
                      activites: [activite],
                    };
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
                    const donneesSimu: DonneesFormulaireSimulateur = {
                      ...reponses,
                      activites: [activite],
                    };
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
