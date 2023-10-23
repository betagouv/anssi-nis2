import { describe, it } from "vitest";
import { fc } from "@fast-check/vitest";
import {
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
    it("n'est pas eligible si activites cochees sont uniquement autres", () => {
      eligibiliteEstToujoursEgale(
        arbForm.nonDesigneOSE.activitesAutres,
        Eligibilite.NonEligible,
      );
    });
    describe("Petite entité localisée en France ou en UE", () => {
      it("Est éligible si le secteur d'activité est 'Infrastructure Numérique'", () => {
        eligibiliteEstToujoursEgale(
          arbForm.nonDesigneOSE.petit.fournisseursInfrastructureNumerique,
          Eligibilite.EligiblePetiteEntreprise,
        );
      });
    });

    describe("Moyenne ou grande entité localisée en France ou en UE", () => {
      it("Est éligible si le secteur d'activité et l'activité sont listés", () => {
        it("Est éligible si le secteur d'activité est 'Infrastructure Numérique'", () => {
          eligibiliteEstToujoursEgale(
            arbForm.nonDesigneOSE.grand.secteursListes,
            Eligibilite.EligibleMoyenneGrandeEntreprise,
          );
        });
      });
      describe("N'est pas éligible", () => {
        it("Si le secteur est 'autre'", () => {
          eligibiliteEstToujoursEgale(
            arbForm.nonDesigneOSE.grand.secteursAutres,
            Eligibilite.NonEligible,
          );
        });
        it("Si l'activité est 'autre'", () => {
          it("Si le secteur est 'autre'", () => {
            eligibiliteEstToujoursEgale(
              arbForm.nonDesigneOSE.grand.activitesAutres,
              Eligibilite.NonEligible,
            );
          });
        });
      });
    });
  });
});
