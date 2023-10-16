import { describe, expect, it } from "vitest";
import { fc } from "@fast-check/vitest";
import {
  eligibilite,
  ResultatEligibiliteEnum,
} from "../../src/Domaine/Simulateur/resultatEligibilite";
import { arbForm } from "./arbitraires/arbitrairesSimulateur";

describe(eligibilite, () => {
  describe("Entité OSE pour NIS1", () => {
    it("de petite taille est toujours éligible", () => {
      fc.assert(
        fc.property(arbForm.designeOSE.petit, (donnees) => {
          expect(eligibilite(donnees)).toStrictEqual(
            ResultatEligibiliteEnum.EligiblePetiteEntreprise,
          );
        }),
      );
    });
    it("de moyenne ou grande taille est toujours éligible", () => {
      fc.assert(
        fc.property(arbForm.designeOSE.moyenGrand, (donnees) => {
          expect(eligibilite(donnees)).toStrictEqual(
            ResultatEligibiliteEnum.EligibleMoyenneGrandeEntreprise,
          );
        }),
      );
    });
  });
  describe("Entite non OSE pour NIS 1", () => {
    it("n'est pas eligible si activites cochees sont uniquement autres", () => {
      fc.assert(
        fc.property(arbForm.nonDesigneOSE.activitesAutres, (donnees) => {
          expect(eligibilite(donnees)).toStrictEqual(
            ResultatEligibiliteEnum.NonEligible,
          );
        }),
      );
    });
    describe("Petite / France", () => {
      it("Est éligible si le secteur d'activité est 'Infrastructure Numérique'", () => {
        fc.assert(
          fc.property(
            arbForm.nonDesigneOSE.petit.fournisseursInfrastructureNumerique,
            (donnees) => {
              expect(eligibilite(donnees)).toStrictEqual(
                ResultatEligibiliteEnum.EligiblePetiteEntreprise,
              );
            },
          ),
        );
      });
    });
  });
});
