import { describe, expect, it } from "vitest";
import { fabriqueDonneesFormulaire } from "../../src/Domain/Simulateur/fabriques/DonneesFormulaire.fabrique";
import { ReponseEtat } from "../../src/Domain/Simulateur/services/Eligibilite/EtatDonneesSimulateur.fabrique";
import { UnionReponseEtat } from "../../src/Domain/Simulateur/services/Eligibilite/Reponse.definitions";

describe("operations resultats", () => {
  describe("construit designe OSE", () => {
    it("Construit un designe OSE a partir de donnees simples", () => {
      const donnees = fabriqueDonneesFormulaire({
        designationOperateurServicesEssentiels: ["oui"],
      });
      const resultatAttendu: UnionReponseEtat = {
        _tag: "DesignationOperateurServicesEssentiels",
        DesignationOperateurServicesEssentiels: {
          designationOperateurServicesEssentiels: "oui",
        },
      };
      const resultatObtenu =
        ReponseEtat.depuisDonneesFormulaireSimulateur(donnees);
      expect(resultatObtenu).toStrictEqual(resultatAttendu);
    });
    it("Construit un designe OSE, variante", () => {
      const donnees = fabriqueDonneesFormulaire({
        designationOperateurServicesEssentiels: ["non"],
      });
      const resultatAttendu: UnionReponseEtat = {
        _tag: "DesignationOperateurServicesEssentiels",
        DesignationOperateurServicesEssentiels: {
          designationOperateurServicesEssentiels: "non",
        },
      };
      const resultatObtenu =
        ReponseEtat.depuisDonneesFormulaireSimulateur(donnees);
      expect(resultatObtenu).toStrictEqual(resultatAttendu);
    });
    it("Enchaine les données OSE puis UE a partir de donnees simples", () => {
      const donnees = fabriqueDonneesFormulaire({
        designationOperateurServicesEssentiels: ["oui"],
        appartenancePaysUnionEuropeenne: ["france"],
      });
      const resultatAttendu: UnionReponseEtat = {
        _tag: "AppartenancePaysUnionEuropeenne",
        DesignationOperateurServicesEssentiels: {
          designationOperateurServicesEssentiels: "oui",
        },
        AppartenancePaysUnionEuropeenne: {
          appartenancePaysUnionEuropeenne: "france",
        },
      };
      const resultatObtenu =
        ReponseEtat.depuisDonneesFormulaireSimulateur(donnees);
      expect(resultatObtenu).toStrictEqual(resultatAttendu);
    });

    it("Enchaine les données jusqu'à la structure privée complète", () => {
      const donnees = fabriqueDonneesFormulaire({
        designationOperateurServicesEssentiels: ["oui"],
        // secteurActivite: ["eauPotable"],
        typeStructure: ["privee"],
        trancheChiffreAffaire: ["moyen"],
        trancheNombreEmployes: ["petit"],
        appartenancePaysUnionEuropeenne: ["france"],
      });
      const resultatAttendu: UnionReponseEtat = {
        _tag: "Structure",
        DesignationOperateurServicesEssentiels: {
          designationOperateurServicesEssentiels: "oui",
        },
        AppartenancePaysUnionEuropeenne: {
          appartenancePaysUnionEuropeenne: "france",
        },
        Structure: {
          typeStructure: "privee",
          trancheChiffreAffaire: "moyen",
          trancheNombreEmployes: "petit",
        },
      };
      const resultatObtenu =
        ReponseEtat.depuisDonneesFormulaireSimulateur(donnees);
      expect(resultatObtenu).toStrictEqual(resultatAttendu);
    });
    it("Enchaine les données jusqu'à la structure publique complète", () => {
      const donnees = fabriqueDonneesFormulaire({
        designationOperateurServicesEssentiels: ["oui"],
        typeStructure: ["publique"],
        typeEntitePublique: ["administrationCentrale"],
        trancheNombreEmployes: ["moyen"],
        appartenancePaysUnionEuropeenne: ["france"],
      });
      const resultatAttendu: UnionReponseEtat = {
        _tag: "Structure",
        DesignationOperateurServicesEssentiels: {
          designationOperateurServicesEssentiels: "oui",
        },
        AppartenancePaysUnionEuropeenne: {
          appartenancePaysUnionEuropeenne: "france",
        },
        Structure: {
          typeStructure: "publique",
          typeEntitePublique: "administrationCentrale",
          trancheNombreEmployes: "moyen",
        },
      };
      const resultatObtenu =
        ReponseEtat.depuisDonneesFormulaireSimulateur(donnees);
      expect(resultatObtenu).toStrictEqual(resultatAttendu);
    });
  });
});
