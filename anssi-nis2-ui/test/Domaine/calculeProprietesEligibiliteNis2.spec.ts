import { describe, it } from "vitest";
import { estEligible } from "../../src/Domaine/Simulateur/services/Eligibilite/Eligibilite.predicats";
import { arbForm } from "./arbitraires/arbitrairesSimulateur";
import { assure } from "../utilitaires/assure";
import { Eligibilite } from "../../src/Domaine/Simulateur/Eligibilite.definitions";
import { fc } from "@fast-check/vitest";

describe(estEligible, () => {
  describe("Entité OSE pour NIS1", () => {
    it("de petite taille est toujours éligible", () => {
      assure(estEligible)
        .sur(arbForm.designeOSE.petit)
        .toujoursEgal(Eligibilite.EligiblePetiteEntreprise);
    });
    it("de moyenne ou grande taille est toujours éligible", () => {
      assure(estEligible)
        .sur(arbForm.designeOSE.moyenGrand)
        .toujoursEgal(Eligibilite.EligibleMoyenneGrandeEntreprise);
    });
  });
  describe("Entite non OSE pour NIS 1", () => {
    describe("Privée", () => {
      it("n'est pas eligible si activites cochees sont uniquement autres", () => {
        assure(estEligible)
          .sur(arbForm.nonDesigneOSE.privee.activitesAutres)
          .toujoursEgal(Eligibilite.NonEligible);
      });
      describe("Petite entité localisée en France ou en UE", () => {
        it("Est éligible si le secteur d'activité est 'Infrastructure Numérique'", () => {
          assure(estEligible)
            .sur(
              arbForm.nonDesigneOSE.privee.petit
                .fournisseursInfrastructureNumerique,
            )
            .toujoursEgal(Eligibilite.EligiblePetiteEntreprise);
        });
      });

      describe("Moyenne ou grande entité localisée en France ou en UE", () => {
        it("Est éligible si le secteur d'activité et l'activité sont listés", () => {
          assure(estEligible)
            .sur(arbForm.nonDesigneOSE.privee.grand.secteursListes)
            .toujoursEgal(Eligibilite.EligibleMoyenneGrandeEntreprise);
        });
        describe("N'est pas éligible", () => {
          // Doute sur le test
          it("Si le secteur est 'autre'", () => {
            assure(estEligible)
              .sur(arbForm.nonDesigneOSE.privee.grand.secteursAutres)
              .toujoursEgal(Eligibilite.NonEligible);
          });
          it("Si l'activité est 'autre'", () => {
            assure(estEligible)
              .sur(arbForm.nonDesigneOSE.privee.grand.activitesAutres)
              .toujoursEgal(Eligibilite.NonEligible);
          });
        });
      });
    });
  });

  describe("Publique", () => {
    it("est incertain pour un résultat non configuré", () => {
      assure(estEligible)
        .sur(arbForm.nonDesigneOSE.publique)
        .toujoursEgal(Eligibilite.Incertain);
    });
  });
  describe(Eligibilite.Incertain, () => {
    it("lorsque le type structure n'est pas remplie", () => {
      assure(estEligible)
        .sur(arbForm.nonValide.donneeAbsente.typeStructure)
        .toujoursEgal(Eligibilite.Incertain);
    });
    it("lorsque l'appartenance à l'UE n'est pas remplie", () => {
      assure(estEligible)
        .sur(arbForm.nonValide.donneeAbsente.typeStructure)
        .toujoursEgal(Eligibilite.Incertain);
    });
  });
});
