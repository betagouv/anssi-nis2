import { describe, it, expect } from "vitest";
import { donneesFormulaireSimulateurVide } from "../../src/Domain/Simulateur/DonneesFormulaire.constantes";
import { Eligibilite } from "../../src/Domain/Simulateur/Eligibilite.constantes";
import { ResultatEligibilite } from "../../src/Domain/Simulateur/Eligibilite.definitions";
import { fabriqueDonneesFormulaire } from "../../src/Domain/Simulateur/fabriques/DonneesFormulaire.fabrique";
import { fabriqueReguleOSE } from "../../src/Domain/Simulateur/fabriques/Regulation.fabrique";
import { ResultatRegulationEntite } from "../../src/Domain/Simulateur/Regulation.definitions";
import { transformeEligibiliteEnRegulationEntite } from "../../src/Domain/Simulateur/services/Regulation/Regulation.operations";

describe(transformeEligibiliteEnRegulationEntite, () => {
  const donneesFormulaireSimulateurOSE = fabriqueDonneesFormulaire({
    designeOperateurServicesEssentiels: ["oui"],
  });

  it("devrait retourner resultatIncertain lorsqu'un résultat d'éligibilité est donné", () => {
    const eligibilityResult: ResultatEligibilite = "Incertain";
    const expectedResult: ResultatRegulationEntite = { decision: "Incertain" };
    const result = transformeEligibiliteEnRegulationEntite(eligibilityResult)(
      donneesFormulaireSimulateurVide,
    );
    expect(result).toEqual(expectedResult);
  });
  
  it("devrait retourner reguleOSE lorsqu'un résultat d'éligibilité est donné", () => {
    const eligibilityResult = Eligibilite.EligiblePetiteEntreprise;
    const donneesOSEPetiteEntreprise = fabriqueDonneesFormulaire({
      ...donneesFormulaireSimulateurOSE,
      trancheCA: ["petit"],
      trancheNombreEmployes: ["petit"],
    });
    const expectedResult = fabriqueReguleOSE(donneesOSEPetiteEntreprise);

    const result = transformeEligibiliteEnRegulationEntite(eligibilityResult)(
      donneesOSEPetiteEntreprise,
    );
    expect(result).toEqual(expectedResult);
  });
});
