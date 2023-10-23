import { describe, it } from "vitest";
import { fc } from "@fast-check/vitest";
import {
  eligi,
  eligibilite,
  Eligibilite,
  ResultatEligibilite,
} from "../../src/Domaine/Simulateur/resultatEligibilite";
import { arbForm } from "./arbitraires/arbitrairesSimulateur";
import { IDonneesFormulaireSimulateur } from "../../src/Domaine/Simulateur/DonneesFormulaire";
import { assure } from "../utilitaires/assure";

const eligibiliteEstToujoursEgale = (
  arbitraire: fc.Arbitrary<IDonneesFormulaireSimulateur>,
  resultatAttendu: ResultatEligibilite,
) => {
  assure.toujoursEgal(arbitraire, eligibilite, resultatAttendu);
};

const eligiEstToujoursEgale = (
  arbitraire: fc.Arbitrary<IDonneesFormulaireSimulateur>,
  resultatAttendu: ResultatEligibilite,
) => {
  assure.toujoursEgal(arbitraire, eligi, resultatAttendu);
};

describe(eligibilite, () => {
  describe("Entité OSE pour NIS1", () => {
    it("de petite taille est toujours éligible", () => {
      eligibiliteEstToujoursEgale(
        arbForm.designeOSE.petit,
        Eligibilite.EligiblePetiteEntreprise,
      );
    });
    it("de moyenne ou grande taille est toujours éligible", () => {
      eligibiliteEstToujoursEgale(
        arbForm.designeOSE.moyenGrand,
        Eligibilite.EligibleMoyenneGrandeEntreprise,
      );
    });
  });
  describe("Entite non OSE pour NIS 1", () => {
    describe("Privée", () => {
      it("n'est pas eligible si activites cochees sont uniquement autres", () => {
        eligibiliteEstToujoursEgale(
          arbForm.nonDesigneOSE.privee.activitesAutres,
          Eligibilite.NonEligible,
        );
      });
      describe("Petite entité localisée en France ou en UE", () => {
        it("Est éligible si le secteur d'activité est 'Infrastructure Numérique'", () => {
          eligibiliteEstToujoursEgale(
            arbForm.nonDesigneOSE.privee.petit
              .fournisseursInfrastructureNumerique,
            Eligibilite.EligiblePetiteEntreprise,
          );
        });
      });

      describe("Moyenne ou grande entité localisée en France ou en UE", () => {
        it("Est éligible si le secteur d'activité et l'activité sont listés", () => {
          eligibiliteEstToujoursEgale(
            arbForm.nonDesigneOSE.privee.grand.secteursListes,
            Eligibilite.EligibleMoyenneGrandeEntreprise,
          );
        });
        describe("N'est pas éligible", () => {
          it("Si le secteur est 'autre'", () => {
            eligibiliteEstToujoursEgale(
              arbForm.nonDesigneOSE.privee.grand.secteursAutres,
              Eligibilite.NonEligible,
            );
          });
          it("Si l'activité est 'autre'", () => {
            eligibiliteEstToujoursEgale(
              arbForm.nonDesigneOSE.privee.grand.activitesAutres,
              Eligibilite.NonEligible,
            );
          });
        });
      });
    });
  });

  // ajouter à Incertain tous champs non rempli

  describe("Publique", () => {
    it("est incertain pour un résultat non configuré", () => {
      eligibiliteEstToujoursEgale(
        arbForm.nonDesigneOSE.publique,
        Eligibilite.Incertain,
      );
    });
  });
});

describe(eligi, () => {
  describe("Entité OSE pour NIS1", () => {
    it("de petite taille est toujours éligible", () => {
      eligiEstToujoursEgale(
        arbForm.designeOSE.petit,
        Eligibilite.EligiblePetiteEntreprise,
      );
    });
    it("de moyenne ou grande taille est toujours éligible", () => {
      eligiEstToujoursEgale(
        arbForm.designeOSE.moyenGrand,
        Eligibilite.EligibleMoyenneGrandeEntreprise,
      );
    });
  });
  describe("Entite non OSE pour NIS 1", () => {
    describe("Privée", () => {
      it("n'est pas eligible si activites cochees sont uniquement autres", () => {
        eligiEstToujoursEgale(
          arbForm.nonDesigneOSE.privee.activitesAutres,
          Eligibilite.NonEligible,
        );
      });
      describe("Petite entité localisée en France ou en UE", () => {
        it("Est éligible si le secteur d'activité est 'Infrastructure Numérique'", () => {
          eligiEstToujoursEgale(
            arbForm.nonDesigneOSE.privee.petit
              .fournisseursInfrastructureNumerique,
            Eligibilite.EligiblePetiteEntreprise,
          );
        });
      });

      describe("Moyenne ou grande entité localisée en France ou en UE", () => {
        it("Est éligible si le secteur d'activité et l'activité sont listés", () => {
          eligiEstToujoursEgale(
            arbForm.nonDesigneOSE.privee.grand.secteursListes,
            Eligibilite.EligibleMoyenneGrandeEntreprise,
          );
        });
        describe("N'est pas éligible", () => {
          // Doute sur le test
          it("Si le secteur est 'autre'", () => {
            eligiEstToujoursEgale(
              arbForm.nonDesigneOSE.privee.grand.secteursAutres,
              Eligibilite.NonEligible,
            );
          });
          it("Si l'activité est 'autre'", () => {
            eligiEstToujoursEgale(
              arbForm.nonDesigneOSE.privee.grand.activitesAutres,
              Eligibilite.NonEligible,
            );
          });
        });
      });
    });
  });

  // ajouter à Incertain tous champs non rempli

  describe("Publique", () => {
    it("est incertain pour un résultat non configuré", () => {
      eligiEstToujoursEgale(
        arbForm.nonDesigneOSE.publique,
        Eligibilite.Incertain,
      );
    });
  });
});
