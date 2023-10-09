import { describe, expect, it } from "vitest";
import {
  DonneesFormulaireSimulateur,
  donneesFormulaireSimulateurVide,
} from "../../../src/Domaine/Simulateur/DonneesFormulaire";
import {
  auMoinsUnSousSecteurParSecteur,
  auMoinsUn,
  et,
  auMoinsUneActiviteParValeurSectorielle,
} from "../../../src/Domaine/Simulateur/Services/Validateurs";

describe("validateurs", () => {
  describe("valideAuMoinsUn", () => {
    it("doit être vrai pour un élément rempli", () => {
      const nomChamp = "designeOSE";
      const donneesFormulaireSimulateur = {
        ...donneesFormulaireSimulateurVide,
        designeOSE: ["oui"],
      };
      const result = auMoinsUn(nomChamp)(donneesFormulaireSimulateur);
      expect(result).toBeTruthy();
    });

    it("doit être faux pour un formulaire vide", () => {
      const nomChamp = "designeOSE";
      const result = auMoinsUn(nomChamp)(donneesFormulaireSimulateurVide);
      expect(result).toBeFalsy();
    });

    it("doit être vrai quand la valeur du chqmps est vide", () => {
      const nomChamp = "designeOSE";
      const donneesFormulaireSimulateur = {
        ...donneesFormulaireSimulateurVide,
        designeOSE: [""],
      };
      const result = auMoinsUn(nomChamp)(donneesFormulaireSimulateur);
      expect(result).toBeFalsy();
    });

    it("doit être vrai pour plusieurs valeurs", () => {
      const nomChamp = "designeOSE";
      const donneesFormulaireSimulateur = {
        ...donneesFormulaireSimulateurVide,
        designeOSE: ["oui", "non"],
      };
      const result = auMoinsUn(nomChamp)(donneesFormulaireSimulateur);
      expect(result).toBeTruthy();
    });
  });

  describe("composeValidateurs", () => {
    it("peut appeler plusieurs validateurs sur une même fonction et retourne vrai", () => {
      const donneesFormulaireSimulateur = {
        ...donneesFormulaireSimulateurVide,
        trancheNombreEmployes: ["petit"],
        trancheCA: ["petit"],
      };
      const validateur = et(
        auMoinsUn("trancheNombreEmployes"),
        auMoinsUn("trancheCA"),
      );
      const result = validateur(donneesFormulaireSimulateur);
      expect(result).toBeTruthy();
    });

    it("peut appeler plusieurs validateurs sur une même fonction et retourne faux", () => {
      const donneesFormulaireSimulateur = {
        ...donneesFormulaireSimulateurVide,
        trancheNombreEmployes: ["petit"],
        trancheCA: [],
      };
      const validateur = et(
        auMoinsUn("trancheNombreEmployes"),
        auMoinsUn("trancheCA"),
      );
      const result = validateur(donneesFormulaireSimulateur);
      expect(result).toBeFalsy();
    });
  });
  describe("auMoinsUnPar", () => {
    it("doit retourner vrai pour un champ coché dans une categorie", () => {
      const donneesFormulaireSimulateur = {
        ...donneesFormulaireSimulateurVide,
        secteurActivite: ["energie"],
        sousSecteurActivite: ["electricite"],
      };
      const result = auMoinsUnSousSecteurParSecteur(
        donneesFormulaireSimulateur,
      );
      expect(result).toBeTruthy();
    });

    it("doit retourner faux pour un champ coché alors qu'il y a 2 catégories", () => {
      const donneesFormulaireSimulateur = {
        ...donneesFormulaireSimulateurVide,
        secteurActivite: ["energie", "transports"],
        sousSecteurActivite: ["electricite"],
      };
      const result = auMoinsUnSousSecteurParSecteur(
        donneesFormulaireSimulateur,
      );
      expect(result).toBeFalsy();
    });

    it("doit retourner faux pour 2 champ coché si l'une des 2 catégorie n'a pas de champs correspondant", () => {
      const donneesFormulaireSimulateur = {
        ...donneesFormulaireSimulateurVide,
        secteurActivite: ["energie", "transport"],
        sousSecteurActivite: ["electricite", "hydrogene"],
      };
      const result = auMoinsUnSousSecteurParSecteur(
        donneesFormulaireSimulateur,
      );
      expect(result).toBeFalsy();
    });
  });
  describe("auMoinsUneActiviteParValeurSectorielle", () => {
    it("doit valider une activité cochée pour un seul secteur ", () => {
      const donneesFormulaireSimulateur: DonneesFormulaireSimulateur = {
        ...donneesFormulaireSimulateurVide,
        secteurActivite: ["espace"],
        activites: ["autreActiviteEspace"],
      };
      const result = auMoinsUneActiviteParValeurSectorielle(
        donneesFormulaireSimulateur,
      );
      expect(result).toBeTruthy();
    });

    it("doit valider 2 activités cochées pour 2 secteurs", () => {
      const donneesFormulaireSimulateur: DonneesFormulaireSimulateur = {
        ...donneesFormulaireSimulateurVide,
        secteurActivite: ["espace", "sante"],
        activites: ["autreActiviteEspace", "prestataireSoinsSante"],
      };
      const result = auMoinsUneActiviteParValeurSectorielle(
        donneesFormulaireSimulateur,
      );
      expect(result).toBeTruthy();
    });

    it("ne doit pas valider 2 activités cochées appartenant au même secteur si 2 sont cochés", () => {
      const donneesFormulaireSimulateur: DonneesFormulaireSimulateur = {
        ...donneesFormulaireSimulateurVide,
        secteurActivite: ["espace", "sante"],
        activites: ["laboratoireReferenceUE", "prestataireSoinsSante"],
      };
      const result = auMoinsUneActiviteParValeurSectorielle(
        donneesFormulaireSimulateur,
      );
      expect(result).toBeFalsy();
    });

    it("ne doit pas valider 1 activités cochées pour 1 secteurs et 2 sous-secteur", () => {
      const donneesFormulaireSimulateur: DonneesFormulaireSimulateur = {
        ...donneesFormulaireSimulateurVide,
        secteurActivite: ["energie"],
        sousSecteurActivite: ["electricite", "hydrogene"],
        activites: ["acteurDuMarche"],
      };
      const result = auMoinsUneActiviteParValeurSectorielle(
        donneesFormulaireSimulateur,
      );
      expect(result).toBeFalsy();
    });
  });
});
