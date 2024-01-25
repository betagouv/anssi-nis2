import { describe, it } from "vitest";
import { expect } from "vitest";
import { donneesFormulaireSimulateurVide } from "../../src/Domain/Simulateur/DonneesFormulaire.constantes";
import { predicatDonneesFormulaire } from "../../src/Domain/Simulateur/services/DonneesFormulaire/DonneesFormulaire.predicats";

describe("predicatDonneesFormulaire", () => {
  describe("Champ contient", () => {
    it("Predicat contient", () => {
      const donnees = {
        ...donneesFormulaireSimulateurVide,
        secteurActivite: ["infrastructureNumerique"],
      };
      expect(donnees).toSatisfy(
        predicatDonneesFormulaire
          .champs("secteurActivite")
          .contient("infrastructureNumerique"),
      );
      expect(donnees).not.toSatisfy(
        predicatDonneesFormulaire
          .champs("secteurActivite")
          .contient("fournisseursNumeriques"),
      );
    });
  });
});
