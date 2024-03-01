import { describe, it, expect } from "vitest";
import { donneesFormulaireSimulateurVide } from "../../src/Domain/Simulateur/DonneesFormulaire.constantes";
import { Eligibilite } from "../../src/Domain/Simulateur/Eligibilite.constantes";
import { fabriqueDonneesFormulaire } from "../../src/Domain/Simulateur/fabriques/DonneesFormulaire.fabrique";
import { resultatReguleOSE } from "../../src/Domain/Simulateur/fabriques/ResultatRegulation.fabrique";
import {
  resultatIncertain,
  resultatNonRegule,
} from "../../src/Domain/Simulateur/Regulation.constantes";
import { Regulation } from "../../src/Domain/Simulateur/Regulation.definitions";
import { transformeEligibiliteEnRegulationEntite } from "../../src/Domain/Simulateur/services/Regulation/Regulation.operations";

/* TODO supprimer ces tests de transformations une fois l'éligibilité totalement mise de côté au profit de EtatRegulation */
describe.skip(transformeEligibiliteEnRegulationEntite, () => {
  const donneesFormulaireSimulateurOSE = fabriqueDonneesFormulaire({
    designationOperateurServicesEssentiels: ["oui"],
  });

  describe(Regulation.Incertain, () => {
    it("devrait retourner resultatIncertain lorsqu'un résultat d'éligibilité est donné", () => {
      const eligibilityResult = Eligibilite.Incertain;
      const result = transformeEligibiliteEnRegulationEntite(eligibilityResult)(
        donneesFormulaireSimulateurVide,
      );
      expect(result).toEqual(resultatIncertain);
    });
  });

  describe(Regulation.Regule, () => {
    it("devrait retourner reguleOSE lorsqu'un résultat d'éligibilité est donné", () => {
      const eligibilityResult = Eligibilite.EligiblePetiteEntreprise;
      const donneesOSEPetiteEntreprise = fabriqueDonneesFormulaire({
        ...donneesFormulaireSimulateurOSE,
        trancheChiffreAffaire: ["petit"],
        trancheNombreEmployes: ["petit"],
      });
      const expectedResult = resultatReguleOSE;

      const result = transformeEligibiliteEnRegulationEntite(eligibilityResult)(
        donneesOSEPetiteEntreprise,
      );
      expect(result).toEqual(expectedResult);
    });

    it.each([
      Eligibilite.EligiblePetiteEntreprise,
      Eligibilite.EligibleMoyenneGrandeEntreprise,
    ])(
      "devrait retourner reguleOSE lorsqu'un résultat d'éligibilité est %s",
      (eligibilityResult) => {
        const expectedResult = resultatReguleOSE;

        const result = transformeEligibiliteEnRegulationEntite(
          eligibilityResult,
        )(donneesFormulaireSimulateurOSE);
        expect(result).toEqual(expectedResult);
      },
    );
  });

  describe(Regulation.NonRegule, () => {
    it("devrait retourner reguleOSE lorsqu'un résultat d'éligibilité est NonRegule", () => {
      const expectedResult = resultatNonRegule;

      const result = transformeEligibiliteEnRegulationEntite(
        Eligibilite.NonEligible,
      )(donneesFormulaireSimulateurOSE);
      expect(result).toEqual(expectedResult);
    });
  });
});
