import { describe, expect, it } from "vitest";
import {
  donneesFormulaireSimulateurVide,
} from "../../src/Domain/Simulateur/services/DonneesFormulaire/DonneesFormulaire.constantes";
import {
  fabriqueDonneesFormulaire,
} from "../../src/Domain/Simulateur/services/DonneesFormulaire/DonneesFormulaire.fabrique";
import { auMoinsUneActiviteListee } from "../../src/Domain/Simulateur/Activite.predicats";
import {
  predicatDonneesFormulaire,
} from "../../src/Domain/Simulateur/services/DonneesFormulaire/DonneesFormulaire.predicats";

describe("predicatDonneesFormulaire", () => {
  describe("Champ contient", () => {
    it("Predicat contient", () => {
      const donnees = {
        ...donneesFormulaireSimulateurVide,
        secteurActivite: ["infrastructureNumerique"],
      };
      expect(donnees).toSatisfy(
        predicatDonneesFormulaire.secteurActivite.contient(
          "infrastructureNumerique",
        ),
      );
      expect(donnees).not.toSatisfy(
        predicatDonneesFormulaire.secteurActivite.contient(
          "fournisseursNumeriques",
        ),
      );
    });
  });
  describe("Champ vérifie", () => {
    it("Vérifie au moins une activité listée", () => {
      const donnees = fabriqueDonneesFormulaire({
        activites: ["entiteCentralesStockage"],
      });
      expect(donnees).toSatisfy(
        predicatDonneesFormulaire.activites.satisfait(auMoinsUneActiviteListee),
      );
    });
  });

});
