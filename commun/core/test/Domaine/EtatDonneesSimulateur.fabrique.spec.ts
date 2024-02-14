import { describe, expect, it } from "vitest";
import { ens } from "../../../utils/services/sets.operations";
import { fabriqueDonneesFormulaire } from "../../src/Domain/Simulateur/fabriques/DonneesFormulaire.fabrique";
import { FabriqueEtatDonneesSimulateur } from "../../src/Domain/Simulateur/services/Eligibilite/EtatDonneesSimulateur.fabrique";
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
          FabriqueEtatDonneesSimulateur.depuisDonneesFormulaireSimulateur(
            donnees,
          );
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
          FabriqueEtatDonneesSimulateur.depuisDonneesFormulaireSimulateur(
            donnees,
          );
        expect(resultatObtenu).toStrictEqual(resultatAttendu);
      });
    });
    describe("AppartenancePaysUnionEuropeenne", () => {
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
          FabriqueEtatDonneesSimulateur.depuisDonneesFormulaireSimulateur(
            donnees,
          );
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
          FabriqueEtatDonneesSimulateur.depuisDonneesFormulaireSimulateur(
            donnees,
          );
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
          FabriqueEtatDonneesSimulateur.depuisDonneesFormulaireSimulateur(
            donnees,
          );
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
            secteurs: ens({
              secteurActivite: "autreSecteurActivite",
            }),
          },
        };
        const resultatObtenu =
          FabriqueEtatDonneesSimulateur.depuisDonneesFormulaireSimulateur(
            donnees,
          );
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
            secteurs: ens({
              secteurActivite: "eauPotable",
              activites: ens("fournisseursDistributeursEauxConsommation"),
            }),
          },
        };
        const resultatObtenu =
          FabriqueEtatDonneesSimulateur.depuisDonneesFormulaireSimulateur(
            donnees,
          );
        expect(resultatObtenu).toStrictEqual(resultatAttendu);
      });
      it("Enchaine les données jusqu'au secteur/sous-secteur et son activité", () => {
        const donnees = fabriqueDonneesFormulaire({
          designationOperateurServicesEssentiels: ["oui"],
          typeStructure: ["privee"],
          trancheNombreEmployes: ["moyen"],
          trancheChiffreAffaire: ["grand"],
          appartenancePaysUnionEuropeenne: ["france"],
          secteurActivite: ["transports"],
          sousSecteurActivite: ["transportsFerroviaires"],
          activites: ["entrepriseFerroviaire"],
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
            typeStructure: "privee",
            trancheNombreEmployes: "moyen",
            trancheChiffreAffaire: "grand",
          },
          SecteurActiviteComplet: {
            secteurs: ens({
              secteurActivite: "transports",
              sousSecteurActivite: "transportsFerroviaires",
              activites: ens("entrepriseFerroviaire"),
            }),
          },
        };
        const resultatObtenu =
          FabriqueEtatDonneesSimulateur.depuisDonneesFormulaireSimulateur(
            donnees,
          );
        expect(resultatObtenu).toStrictEqual(resultatAttendu);
      });
      it("Enchaine les données jusqu'à plusieurs secteurs et leurs activités", () => {
        const donnees = fabriqueDonneesFormulaire({
          designationOperateurServicesEssentiels: ["oui"],
          typeStructure: ["publique"],
          typeEntitePublique: ["administrationCentrale"],
          trancheNombreEmployes: ["moyen"],
          appartenancePaysUnionEuropeenne: ["france"],
          secteurActivite: ["eauPotable", "sante"],
          activites: [
            "fournisseursDistributeursEauxConsommation",
            "rechercheDeveloppementMedicament",
          ],
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
            secteurs: ens(
              {
                secteurActivite: "eauPotable",
                activites: ens("fournisseursDistributeursEauxConsommation"),
              },
              {
                secteurActivite: "sante",
                activites: ens("rechercheDeveloppementMedicament"),
              },
            ),
          },
        };
        const resultatObtenu =
          FabriqueEtatDonneesSimulateur.depuisDonneesFormulaireSimulateur(
            donnees,
          );
        expect(resultatObtenu).toStrictEqual(resultatAttendu);
      });
      it("Enchaine les données jusqu'à plusieurs secteurs composites et leurs activités", () => {
        const donnees = fabriqueDonneesFormulaire({
          designationOperateurServicesEssentiels: ["oui"],
          typeStructure: ["publique"],
          typeEntitePublique: ["administrationCentrale"],
          trancheNombreEmployes: ["moyen"],
          appartenancePaysUnionEuropeenne: ["france"],
          secteurActivite: ["eauPotable", "sante", "fabrication"],
          sousSecteurActivite: ["fabricationEquipementsElectroniques"],
          activites: [
            "fournisseursDistributeursEauxConsommation",
            "rechercheDeveloppementMedicament",
            "laboratoireReferenceUE",
            "fabriquantPilesAccumulateursElectriques",
            "fabriquantAppareilEclairage",
          ],
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
            secteurs: ens(
              {
                secteurActivite: "eauPotable",
                activites: ens("fournisseursDistributeursEauxConsommation"),
              },
              {
                secteurActivite: "sante",
                activites: ens(
                  "rechercheDeveloppementMedicament",
                  "laboratoireReferenceUE",
                ),
              },
              {
                secteurActivite: "fabrication",
                sousSecteurActivite: "fabricationEquipementsElectroniques",
                activites: ens(
                  "fabriquantPilesAccumulateursElectriques",
                  "fabriquantAppareilEclairage",
                ),
              },
            ),
          },
        };
        const resultatObtenu =
          FabriqueEtatDonneesSimulateur.depuisDonneesFormulaireSimulateur(
            donnees,
          );
        expect(resultatObtenu).toStrictEqual(resultatAttendu);
      });
    });
  });
});
