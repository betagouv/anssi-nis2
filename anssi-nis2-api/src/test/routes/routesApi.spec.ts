import {
  ImplementationDuServeur,
  ServeurMonEspaceNIS2,
} from "../../serveur.types";
import { creeServeur } from "../../serveur";
import { AdaptateurPersistanceMemoire } from "../../adaptateurs/adaptateurPersistance.memoire";
import { DonneesFormulaireSimulateur } from "~core/src/Domain/Simulateur/services/DonneesFormulaire/DonneesFormulaire.definitions";
import { donneesFormulaireSimulateurVide } from "~core/src/Domain/Simulateur/services/DonneesFormulaire/DonneesFormulaire.constantes";
import { AdaptateurJournalMemoire } from "../../adaptateurs/adaptateurJournal.memoire";

describe("Le routeur '/api/", () => {
  let serveur: ServeurMonEspaceNIS2;
  let adaptateurPersistance: AdaptateurPersistanceMemoire;
  let adaptateurJournal: AdaptateurJournalMemoire;

  beforeEach(async () => {
    adaptateurPersistance = new AdaptateurPersistanceMemoire();
    adaptateurJournal = new AdaptateurJournalMemoire();
    serveur = await creeServeur(1234, ImplementationDuServeur.Express, {
      adaptateurPersistance,
      adaptateurJournal,
    });
    serveur.ecoute();
  });

  afterEach(() => {
    serveur.arrete();
  });

  describe("sur la route POST '/api/simulateur-reponse'", () => {
    it("délègue à l'adaptateur de persistance la sauvegarde des données", async () => {
      let donneesRecues: DonneesFormulaireSimulateur;
      adaptateurPersistance.sauvegardeReponseFormulaire = async (
        donnees: DonneesFormulaireSimulateur,
      ) => {
        donneesRecues = donnees;
      };

      const reponse = await fetch(
        "http://localhost:1234/api/simulateur-reponse",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(donneesFormulaireSimulateurVide),
        },
      );

      expect(reponse.status).toBe(201);
      expect(donneesRecues).toStrictEqual({
        designationOperateurServicesEssentiels: [],
        appartenancePaysUnionEuropeenne: [],
        secteurActivite: [],
        sousSecteurActivite: [],
        trancheChiffreAffaire: [],
        trancheNombreEmployes: [],
        typeStructure: [],
        typeEntitePublique: [],
        activites: [],
        localisationFournitureServicesNumeriques: [],
        paysDecisionsCyber: [],
        paysOperationsCyber: [],
        paysPlusGrandNombreSalaries: [],
      });
    });

    it("délègue à l'adaptateur Journal la consigne d'un événement de réponse reçue", async () => {
      let donneesRecues: DonneesFormulaireSimulateur;
      adaptateurJournal.consigneReponseSimulateur = async (
        donnees: DonneesFormulaireSimulateur,
      ) => {
        donneesRecues = donnees;
      };

      await fetch("http://localhost:1234/api/simulateur-reponse", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(donneesFormulaireSimulateurVide),
      });

      expect(donneesRecues).toStrictEqual({
        designationOperateurServicesEssentiels: [],
        appartenancePaysUnionEuropeenne: [],
        secteurActivite: [],
        sousSecteurActivite: [],
        trancheChiffreAffaire: [],
        trancheNombreEmployes: [],
        typeStructure: [],
        typeEntitePublique: [],
        activites: [],
        localisationFournitureServicesNumeriques: [],
        paysDecisionsCyber: [],
        paysOperationsCyber: [],
        paysPlusGrandNombreSalaries: [],
      });
    });
  });
});
