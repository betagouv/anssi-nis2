import { describe, it } from "vitest";
import { estEligible } from "../../src/Domaine/Simulateur/services/Eligibilite/Eligibilite.predicats";
import { arbForm } from "./arbitraires/arbitrairesSimulateur";
import { verifieQue } from "../utilitaires/assure";
import { Eligibilite } from "../../src/Domaine/Simulateur/Eligibilite.definitions";

describe(estEligible, () => {
  describe("Entité OSE pour NIS1", () => {
    it("de petite taille est toujours éligible", () => {
      verifieQue(estEligible)
        .quelqueSoit(arbForm.designeOSE.petit)
        .renvoieToujours(Eligibilite.EligiblePetiteEntreprise);
    });
    it("de moyenne ou grande taille est toujours éligible", () => {
      verifieQue(estEligible)
        .quelqueSoit(arbForm.designeOSE.moyenGrand)
        .renvoieToujours(Eligibilite.EligibleMoyenneGrandeEntreprise);
    });
  });
  
  describe("Entite non OSE pour NIS 1", () => {
    describe("Privée", () => {
      it("n'est pas eligible si activites cochees sont uniquement autres", () => {
        verifieQue(estEligible)
          .quelqueSoit(arbForm.nonDesigneOSE.privee.activitesAutres)
          .renvoieToujours(Eligibilite.NonEligible);
      });
      describe("Petite entité localisée en France ou en UE", () => {
        it("Est éligible si le secteur d'activité est 'Infrastructure Numérique'", () => {
          verifieQue(estEligible)
            .quelqueSoit(
              arbForm.nonDesigneOSE.privee.petit
                .fournisseursInfrastructureNumerique,
            )
            .renvoieToujours(Eligibilite.EligiblePetiteEntreprise);
        });
      });

      describe("Moyenne ou grande entité localisée en France ou en UE", () => {
        it("Est éligible si le secteur d'activité et l'activité sont listés", () => {
          verifieQue(estEligible)
            .quelqueSoit(arbForm.nonDesigneOSE.privee.grand.secteursListes)
            .renvoieToujours(Eligibilite.EligibleMoyenneGrandeEntreprise);
        });
        describe("N'est pas éligible", () => {
          // Doute sur le test
          it("Si le secteur est 'autre'", () => {
            verifieQue(estEligible)
              .quelqueSoit(arbForm.nonDesigneOSE.privee.grand.secteursAutres)
              .renvoieToujours(Eligibilite.NonEligible);
          });
          it("Si l'activité est 'autre'", () => {
            verifieQue(estEligible)
              .quelqueSoit(arbForm.nonDesigneOSE.privee.grand.activitesAutres)
              .renvoieToujours(Eligibilite.NonEligible);
          });
        });
      });
    });
  });

  describe("Publique", () => {
    it("est incertain pour un résultat non configuré", () => {
      verifieQue(estEligible)
        .quelqueSoit(arbForm.nonDesigneOSE.publique)
        .renvoieToujours(Eligibilite.Incertain);
    });
  });
  describe(Eligibilite.Incertain, () => {
    it("lorsque le type structure n'est pas remplie", () => {
      verifieQue(estEligible)
        .quelqueSoit(arbForm.nonValide.donneeAbsente.typeStructure)
        .renvoieToujours(Eligibilite.Incertain);
    });
    it("lorsque l'appartenance à l'UE n'est pas remplie", () => {
      verifieQue(estEligible)
        .quelqueSoit(arbForm.nonValide.donneeAbsente.typeStructure)
        .renvoieToujours(Eligibilite.Incertain);
    });
  });
});
