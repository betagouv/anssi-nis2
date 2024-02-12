import { describe, expect, it } from "vitest";
import { fabriqueDonneesFormulaire } from "../../src/Domain/Simulateur/fabriques/DonneesFormulaire.fabrique";
import {
  cons,
  definitivementRegule,
  fabriqueAiguillageDonneesEvaluation,
  fin,
  qualifieDesignationOse,
} from "../../src/Domain/Simulateur/services/Eligibilite/EtatRegulation.definition";
import {
  depuisDonneesFormulaireSimulateur,
  nomChampDepuisDonneesCompletes,
} from "../../src/Domain/Simulateur/services/Eligibilite/Reponse.definitions";

describe("qualifieEtatRegulation", () => {
  describe("qualifieDesignationOse", () => {
    it("qualifieDesignationOse = oui renvoie définitivement régulé", () => {
      const resultatAttendu = definitivementRegule();
      const donneesInitiales = fabriqueAiguillageDonneesEvaluation(
        "DesignationOperateurServicesEssentiels",
        {
          designationOperateurServicesEssentiels: "oui",
        },
      );
      const resultatObtenu = qualifieDesignationOse(donneesInitiales);
      expect(resultatObtenu).toStrictEqual(resultatAttendu);
    });
    it("qualifieDesignationOse = oui renvoie des données à qualifier pour appartenance UE", () => {
      const resultatAttendu = fabriqueAiguillageDonneesEvaluation(
        "AppartenancePaysUnionEuropeenne",
        { appartenancePaysUnionEuropeenne: "france" },
      );
      const donneesInitiales = fabriqueAiguillageDonneesEvaluation(
        "DesignationOperateurServicesEssentiels",
        {
          designationOperateurServicesEssentiels: "non",
        },
      );
      const resultatObtenu = qualifieDesignationOse(donneesInitiales);
      expect(resultatObtenu).toStrictEqual(resultatAttendu);
    });
  });
});

describe("operations resultats", () => {
  describe("construit designe OSE", () => {
    it("Construit un designe OSE a partir de donnees simples", () => {
      const donnees = fabriqueDonneesFormulaire({
        designationOperateurServicesEssentiels: ["oui"],
      });
      const resultatAttendu = cons(
        {
          donnees: {
            designationOperateurServicesEssentiels: "oui",
          },
          etat: "DesignationOperateurServicesEssentiels",
        },
        fin(),
      );
      const resultatObtenu = depuisDonneesFormulaireSimulateur(donnees);
      expect(resultatObtenu).toStrictEqual(resultatAttendu);
    });
    it("Construit un designe OSE, variante", () => {
      const donnees = fabriqueDonneesFormulaire({
        designationOperateurServicesEssentiels: ["non"],
      });
      const resultatAttendu = cons(
        {
          donnees: {
            designationOperateurServicesEssentiels: "non",
          },
          etat: "DesignationOperateurServicesEssentiels",
        },
        fin(),
      );
      const resultatObtenu = depuisDonneesFormulaireSimulateur(donnees);
      expect(resultatObtenu).toStrictEqual(resultatAttendu);
    });
    it("Enchaine les données OSE puis UE a partir de donnees simples", () => {
      const donnees = fabriqueDonneesFormulaire({
        designationOperateurServicesEssentiels: ["oui"],
        // secteurActivite: ["eauPotable"],
        // typeStructure: ["privee"],
        // trancheChiffreAffaire: ["moyen"],
        // trancheNombreEmployes: ["petit"],
        appartenancePaysUnionEuropeenne: ["france"],
      });

      const resultatAttendu = cons(
        {
          donnees: {
            designationOperateurServicesEssentiels: "oui",
          },
          etat: "DesignationOperateurServicesEssentiels",
        },
        cons(
          {
            donnees: { appartenancePaysUnionEuropeenne: "france" },
            etat: "AppartenancePaysUnionEuropeenne",
          },
          fin(),
        ),
      );
      const resultatObtenu = depuisDonneesFormulaireSimulateur(donnees);
      expect(resultatObtenu).toStrictEqual(resultatAttendu);
    });
    it(nomChampDepuisDonneesCompletes, () => {
      const nomDonneeEvaluee = "DesignationOperateurServicesEssentiels";
      const nomChampAttendu = "designationOperateurServicesEssentiels";
      const nomChamp = nomChampDepuisDonneesCompletes(nomDonneeEvaluee);
      expect(nomChamp).toEqual(nomChampAttendu);
    });
  });
});
