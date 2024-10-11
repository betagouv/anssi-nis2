import { describe, expect, it } from "vitest";
import { et } from "../../../utils/services/commun.predicats";
import { DonneesFormulaireSimulateur } from "../../src/Domain/Simulateur/services/DonneesFormulaire/DonneesFormulaire.definitions";
import { donneesFormulaireSimulateurVide } from "../../src/Domain/Simulateur/services/DonneesFormulaire/DonneesFormulaire.constantes";
import { fabriqueDonneesFormulaire } from "../../src/Domain/Simulateur/services/DonneesFormulaire/DonneesFormulaire.fabrique";
import { auMoinsUn } from "../../src/Domain/Simulateur/services/ChampSimulateur/champs.predicats";
import { contientAutreSecteurActiviteUniquement } from "../../src/Domain/Simulateur/services/DonneesFormulaire/DonneesFormulaire.predicats";

describe("validateurs", () => {
  describe("valideAuMoinsUn", () => {
    it("doit être vrai pour un élément rempli", () => {
      const nomChamp = "designationOperateurServicesEssentiels";
      const donneesFormulaireSimulateur = fabriqueDonneesFormulaire({
        designationOperateurServicesEssentiels: ["oui"],
      });
      const result = auMoinsUn(nomChamp)(donneesFormulaireSimulateur);
      expect(result).toBeTruthy();
    });

    it("doit être faux pour un formulaire vide", () => {
      const nomChamp = "designationOperateurServicesEssentiels";
      const result = auMoinsUn(nomChamp)(donneesFormulaireSimulateurVide);
      expect(result).toBeFalsy();
    });

    it("doit être vrai pour plusieurs valeurs", () => {
      const nomChamp = "designationOperateurServicesEssentiels";
      const donneesFormulaireSimulateur = fabriqueDonneesFormulaire({
        designationOperateurServicesEssentiels: ["oui", "non"],
      });
      const result = auMoinsUn(nomChamp)(donneesFormulaireSimulateur);
      expect(result).toBeTruthy();
    });
  });

  describe("composeValidateurs", () => {
    it("peut appeler plusieurs validateurs sur une même fonction et retourne vrai", () => {
      const donneesFormulaireSimulateur = fabriqueDonneesFormulaire({
        trancheNombreEmployes: ["petit"],
        trancheChiffreAffaire: ["petit"],
      });
      const validateur = et(
        auMoinsUn("trancheNombreEmployes"),
        auMoinsUn("trancheChiffreAffaire")
      );
      const result = validateur(donneesFormulaireSimulateur);
      expect(result).toBeTruthy();
    });

    it("peut appeler plusieurs validateurs sur une même fonction et retourne faux", () => {
      const donneesFormulaireSimulateur = fabriqueDonneesFormulaire({
        trancheNombreEmployes: ["petit"],
        trancheChiffreAffaire: [],
      });
      const validateur = et(
        auMoinsUn("trancheNombreEmployes"),
        auMoinsUn("trancheChiffreAffaire")
      );
      const result = validateur(donneesFormulaireSimulateur);
      expect(result).toBeFalsy();
    });
  });

  describe(contientAutreSecteurActiviteUniquement, () => {
    it("est Vrai quand la seule valeur est 'autreSecteurActivite'", () => {
      const donnees: DonneesFormulaireSimulateur = {
        ...donneesFormulaireSimulateurVide,
        secteurActivite: ["autreSecteurActivite"],
      };

      expect(contientAutreSecteurActiviteUniquement(donnees)).toBeTruthy();
    });
  });
});
