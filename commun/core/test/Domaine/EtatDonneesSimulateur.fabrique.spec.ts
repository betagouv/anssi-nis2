import { describe, expect, it } from "vitest";
import { fabriqueDonneesFormulaire } from "../../src/Domain/Simulateur/fabriques/DonneesFormulaire.fabrique";
import { ReponseEtat } from "../../src/Domain/Simulateur/services/Eligibilite/EtatDonneesSimulateur.fabrique";
import { UnionReponseEtat } from "../../src/Domain/Simulateur/services/Eligibilite/Reponse.definitions";

describe("fabrique ReponseEtat", () => {
  describe("depuisDonneesFormulaireSimulateur", () => {
    describe("DesignationOperateurServicesEssentiels", () => {
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
    });
    describe("appartenancePaysUnionEuropeenne", () => {
      it("Enchaine les données OSE puis UE a partir de donnees simples", () => {
        const donnees = fabriqueDonneesFormulaire({
          designationOperateurServicesEssentiels: ["oui"],
          appartenancePaysUnionEuropeenne: ["france"],
        });
        const resultatAttendu: UnionReponseEtat = {
          _tag: "appartenancePaysUnionEuropeenne",
          DesignationOperateurServicesEssentiels: {
            designationOperateurServicesEssentiels: "oui",
          },
          appartenancePaysUnionEuropeenne: {
            appartenancePaysUnionEuropeenne: "france",
          },
        };
        const resultatObtenu =
          ReponseEtat.depuisDonneesFormulaireSimulateur(donnees);
        expect(resultatObtenu).toStrictEqual(resultatAttendu);
      });
    });
    describe("Structure", () => {
      it("Enchaine les données jusqu'à la structure privée complète", () => {
        const donnees = fabriqueDonneesFormulaire({
          designationOperateurServicesEssentiels: ["oui"],
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
          appartenancePaysUnionEuropeenne: {
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
          appartenancePaysUnionEuropeenne: {
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
    describe("Informations de Secteurs", () => {
      it("Enchaine les données jusqu'au secteur autre", () => {
        const donnees = fabriqueDonneesFormulaire({
          designationOperateurServicesEssentiels: ["oui"],
          typeStructure: ["publique"],
          typeEntitePublique: ["administrationCentrale"],
          trancheNombreEmployes: ["moyen"],
          appartenancePaysUnionEuropeenne: ["france"],
          secteurActivite: ["autreSecteurActivite"],
        });
        const resultatAttendu: UnionReponseEtat = {
          _tag: "SecteurActiviteComplet",
          DesignationOperateurServicesEssentiels: {
            designationOperateurServicesEssentiels: "oui",
          },
          appartenancePaysUnionEuropeenne: {
            appartenancePaysUnionEuropeenne: "france",
          },
          Structure: {
            typeStructure: "publique",
            typeEntitePublique: "administrationCentrale",
            trancheNombreEmployes: "moyen",
          },
          SecteurActiviteComplet: {
            secteurs: [
              {
                secteurActivite: "autreSecteurActivite",
              },
            ],
          },
        };
        const resultatObtenu =
          ReponseEtat.depuisDonneesFormulaireSimulateur(donnees);
        expect(resultatObtenu).toStrictEqual(resultatAttendu);
      });
      it("Enchaine les données jusqu'au secteur simple et son activité", () => {
        const donnees = fabriqueDonneesFormulaire({
          designationOperateurServicesEssentiels: ["oui"],
          typeStructure: ["publique"],
          typeEntitePublique: ["administrationCentrale"],
          trancheNombreEmployes: ["moyen"],
          appartenancePaysUnionEuropeenne: ["france"],
          secteurActivite: ["eauPotable"],
          activites: ["fournisseursDistributeursEauxConsommation"],
        });
        const resultatAttendu: UnionReponseEtat = {
          _tag: "SecteurActiviteComplet",
          DesignationOperateurServicesEssentiels: {
            designationOperateurServicesEssentiels: "oui",
          },
          appartenancePaysUnionEuropeenne: {
            appartenancePaysUnionEuropeenne: "france",
          },
          Structure: {
            typeStructure: "publique",
            typeEntitePublique: "administrationCentrale",
            trancheNombreEmployes: "moyen",
          },
          SecteurActiviteComplet: {
            secteurs: [
              {
                secteurActivite: "eauPotable",
                activites: ["fournisseursDistributeursEauxConsommation"],
              },
            ],
          },
        };
        const resultatObtenu =
          ReponseEtat.depuisDonneesFormulaireSimulateur(donnees);
        expect(resultatObtenu).toStrictEqual(resultatAttendu);
      });
    });
  });
});
