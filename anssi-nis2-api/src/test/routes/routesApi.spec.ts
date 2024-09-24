import {
  ImplementationDuServeur,
  ServeurMonEspaceNIS2,
} from "../../serveur.types";
import { creeServeur } from "../../serveur";
import { AdaptateurPersistanceMemoire } from "../../adaptateurs/adaptateurPersistance.memoire";
import { DonneesFormulaireSimulateur } from "~core/src/Domain/Simulateur/services/DonneesFormulaire/DonneesFormulaire.definitions";
import { donneesFormulaireSimulateurVide } from "~core/src/Domain/Simulateur/services/DonneesFormulaire/DonneesFormulaire.constantes";
import { AdaptateurJournalMemoire } from "../../adaptateurs/adaptateurJournal.memoire";
import {
  EvenementJournal,
  TypeEvenement,
} from "../../adaptateurs/adaptateurJournal";
import { POST } from "../utilitaires/http";

describe("Le routeur '/api/", () => {
  let serveur: ServeurMonEspaceNIS2;
  let adaptateurPersistance: AdaptateurPersistanceMemoire;
  let adaptateurJournal: AdaptateurJournalMemoire;

  beforeEach(async () => {
    jest.useFakeTimers();
    adaptateurPersistance = new AdaptateurPersistanceMemoire();
    adaptateurJournal = new AdaptateurJournalMemoire();
    serveur = await creeServeur(1234, ImplementationDuServeur.Express, {
      adaptateurPersistance,
      adaptateurJournal,
    });
    serveur.ecoute();
  });

  afterEach(() => {
    jest.useRealTimers();
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

      const reponse = await POST(
        "/api/simulateur-reponse",
        donneesFormulaireSimulateurVide,
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
      const aujourdhui = new Date("2024-09-24");

      jest.useFakeTimers().setSystemTime(aujourdhui);

      let evenementRecu: EvenementJournal<TypeEvenement.ReponseSimulateurRecue>;
      adaptateurJournal.consigneEvenement = async (
        evenement: EvenementJournal<TypeEvenement.ReponseSimulateurRecue>,
      ) => {
        evenementRecu = evenement;
      };

      await POST(`/api/simulateur-reponse`, donneesFormulaireSimulateurVide);

      expect(evenementRecu.type).toBe("REPONSE_SIMULATEUR_RECUE");
      expect(evenementRecu.date).toEqual(aujourdhui);
      expect(evenementRecu.donnees).toStrictEqual({
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
