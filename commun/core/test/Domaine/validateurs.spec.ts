import { describe, expect, it, vi } from "vitest";
import { DonneesFormulaireSimulateur } from "../../src/Domain/Simulateur/DonneesFormulaire.definitions";
import { donneesFormulaireSimulateurVide } from "../../src/Domain/Simulateur/DonneesFormulaire.constantes";
import { fabriqueDonneesFormulaire } from "../../src/Domain/Simulateur/fabriques/DonneesFormulaire.fabrique";
import { PredicatDonneesFormulaire } from "../../src/Domain/Simulateur/services/ChampSimulateur/champs.domaine";
import {
  auMoinsUn,
  auMoinsUneActiviteParValeurSectorielleListee,
  auMoinsUnSousSecteurParSecteur,
  et,
  lorsque,
} from "../../src/Domain/Simulateur/services/ChampSimulateur/champs.predicats";
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
        auMoinsUn("trancheChiffreAffaire"),
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
        auMoinsUn("trancheChiffreAffaire"),
      );
      const result = validateur(donneesFormulaireSimulateur);
      expect(result).toBeFalsy();
    });
  });
  describe(auMoinsUnSousSecteurParSecteur, () => {
    it("doit retourner vrai pour un champ coché dans une categorie", () => {
      const donneesFormulaireSimulateur = fabriqueDonneesFormulaire({
        secteurActivite: ["energie"],
        sousSecteurActivite: ["electricite"],
      });
      const result = auMoinsUnSousSecteurParSecteur(
        donneesFormulaireSimulateur,
      );
      expect(result).toBeTruthy();
    });

    it("doit retourner faux pour un champ coché alors qu'il y a 2 catégories", () => {
      const donneesFormulaireSimulateur = fabriqueDonneesFormulaire({
        secteurActivite: ["energie", "transports"],
        sousSecteurActivite: ["electricite"],
      });
      const result = auMoinsUnSousSecteurParSecteur(
        donneesFormulaireSimulateur,
      );
      expect(result).toBeFalsy();
    });

    it("doit retourner faux pour 2 champ coché si l'une des 2 catégorie n'a pas de champs correspondant", () => {
      const donneesFormulaireSimulateur = fabriqueDonneesFormulaire({
        secteurActivite: ["energie", "transports"],
        sousSecteurActivite: ["electricite", "hydrogene"],
      });
      const result = auMoinsUnSousSecteurParSecteur(
        donneesFormulaireSimulateur,
      );
      expect(result).toBeFalsy();
    });

    it("doit valider un seul sous-secteur coché lorsque de nombreux secteurs sont cochés", () => {
      const donneesFormulaireSimulateur = fabriqueDonneesFormulaire({
        secteurActivite: ["fabrication", "eauxUsees", "autreSecteurActivite"],
        sousSecteurActivite: ["autreSousSecteurFabrication"],
      });
      const result = auMoinsUnSousSecteurParSecteur(
        donneesFormulaireSimulateur,
      );
      expect(result).toBeTruthy();
    });
  });
  describe(auMoinsUneActiviteParValeurSectorielleListee, () => {
    it("doit valider une activité cochée pour un seul secteur ", () => {
      const donneesFormulaireSimulateur = fabriqueDonneesFormulaire({
        secteurActivite: ["espace"],
        activites: ["autreActiviteEspace"],
      });
      const result = auMoinsUneActiviteParValeurSectorielleListee(
        donneesFormulaireSimulateur,
      );
      expect(result).toBeTruthy();
    });

    it("doit valider 2 activités cochées pour 2 secteurs", () => {
      const donneesFormulaireSimulateur = fabriqueDonneesFormulaire({
        secteurActivite: ["espace", "sante"],
        activites: ["autreActiviteEspace", "prestataireSoinsSante"],
      });
      const result = auMoinsUneActiviteParValeurSectorielleListee(
        donneesFormulaireSimulateur,
      );
      expect(result).toBeTruthy();
    });

    it("ne doit pas valider 2 activités cochées appartenant au même secteur si 2 sont cochés", () => {
      const donneesFormulaireSimulateur = fabriqueDonneesFormulaire({
        secteurActivite: ["espace", "sante"],
        activites: ["laboratoireReferenceUE", "prestataireSoinsSante"],
      });
      const result = auMoinsUneActiviteParValeurSectorielleListee(
        donneesFormulaireSimulateur,
      );
      expect(result).toBeFalsy();
    });

    it("ne doit pas valider 1 activité cochée pour 1 secteurs et 2 sous-secteur", () => {
      const donneesFormulaireSimulateur = fabriqueDonneesFormulaire({
        secteurActivite: ["energie"],
        sousSecteurActivite: ["electricite", "hydrogene"],
        activites: ["acteurDuMarche"],
      });
      const result = auMoinsUneActiviteParValeurSectorielleListee(
        donneesFormulaireSimulateur,
      );
      expect(result).toBeFalsy();
    });

    it("doit valider 2 activités cochées pour 1 secteur", () => {
      const donneesFormulaireSimulateur = fabriqueDonneesFormulaire({
        secteurActivite: ["sante"],
        activites: ["prestataireSoinsSante", "laboratoireReferenceUE"],
      });
      const result = auMoinsUneActiviteParValeurSectorielleListee(
        donneesFormulaireSimulateur,
      );
      expect(result).toBeTruthy();
    });

    it("doit valider une activité cochée pour un seul secteur listé et aucune sur secteur autre", () => {
      const donneesFormulaireSimulateur = fabriqueDonneesFormulaire({
        secteurActivite: ["espace", "autreSecteurActivite"],
        activites: ["autreActiviteEspace"],
      });
      const result = auMoinsUneActiviteParValeurSectorielleListee(
        donneesFormulaireSimulateur,
      );
      expect(result).toBeTruthy();
    });

    it("doit valider une activité cochée pour un seul sous-secteur listé et aucune sur secteur autre", () => {
      const donneesFormulaireSimulateur = fabriqueDonneesFormulaire({
        secteurActivite: ["energie"],
        sousSecteurActivite: ["electricite", "autreSousSecteurEnergie"],
        activites: ["entrepriseElectriciteRemplissantFonctionFourniture"],
      });
      const result = auMoinsUneActiviteParValeurSectorielleListee(
        donneesFormulaireSimulateur,
      );
      expect(result).toBeTruthy();
    });
  });
  describe(lorsque, () => {
    it("valide lorsque la valeur et le predicat sont vrais", () => {
      const predicat: PredicatDonneesFormulaire = vi
        .fn()
        .mockImplementation(() => true);
      const donnees = fabriqueDonneesFormulaire({
        typeStructure: ["publique"],
      });
      const predicatLorsque = lorsque("typeStructure", "publique", predicat);
      const result = predicatLorsque(donnees);
      expect(predicat).toHaveBeenCalledOnce();
      expect(result).toBeTruthy();
    });
    it("ne valide pas lorsque la valeur est vraie mais pas le predicat", () => {
      const predicat: PredicatDonneesFormulaire = vi
        .fn()
        .mockImplementation(() => false);
      const donnees = fabriqueDonneesFormulaire({
        typeStructure: ["publique"],
      });
      const predicatLorsque = lorsque("typeStructure", "publique", predicat);
      const result = predicatLorsque(donnees);
      expect(predicat).toHaveBeenCalledOnce();
      expect(result).toBeFalsy();
    });
    it("valide lorsque la valeur et le predicat sont faux", () => {
      const predicat: PredicatDonneesFormulaire = vi
        .fn()
        .mockImplementation(() => false);
      const donnees = fabriqueDonneesFormulaire({
        typeStructure: ["publique"],
      });
      const predicatLorsque = lorsque("typeStructure", "privee", predicat);
      const result = predicatLorsque(donnees);
      expect(predicat).not.toHaveBeenCalled();
      expect(result).toBeTruthy();
    });
    it("valide lorsque la valeur est vide mais pas le predicat vrai", () => {
      const predicat: PredicatDonneesFormulaire = vi
        .fn()
        .mockImplementation(() => true);
      const donnees = fabriqueDonneesFormulaire({});
      const predicatLorsque = lorsque("typeStructure", "publique", predicat);
      const result = predicatLorsque(donnees);
      expect(predicat).not.toHaveBeenCalled();
      expect(result).toBeTruthy();
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
