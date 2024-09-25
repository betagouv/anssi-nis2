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
import { CreeInformationsEmailDto } from "../../informations-emails/dto/cree-informations-email.dto";
import { AdaptateurCrmMemoire } from "../../adaptateurs/adaptateurCrm.memoire";
import { AdaptateurGestionErreurMemoire } from "../../adaptateurs/adaptateurGestionErreur.memoire";
import { AdaptateurProtectionMemoire } from "../../adaptateurs/adaptateurProtection.memoire";

describe("Le routeur '/api/", () => {
  let serveur: ServeurMonEspaceNIS2;
  let adaptateurPersistance: AdaptateurPersistanceMemoire;
  let adaptateurJournal: AdaptateurJournalMemoire;
  let adaptateurCrm: AdaptateurCrmMemoire;

  beforeEach(async () => {
    jest.useFakeTimers();
    adaptateurPersistance = new AdaptateurPersistanceMemoire();
    adaptateurJournal = new AdaptateurJournalMemoire();
    adaptateurCrm = new AdaptateurCrmMemoire();
    serveur = await creeServeur(1234, ImplementationDuServeur.Express, {
      adaptateurPersistance,
      adaptateurJournal,
      adaptateurCrm,
      adaptateurGestionErreur: new AdaptateurGestionErreurMemoire(),
      adaptateurProtection: new AdaptateurProtectionMemoire(),
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

  describe("sur la route POST '/api/informations-emails'", () => {
    it("délègue à l'adaptateur de persistance la sauvegarde des données", async () => {
      let donneesRecues: CreeInformationsEmailDto;
      adaptateurPersistance.sauvegardeInformationsEmail = async (
        donnees: CreeInformationsEmailDto,
      ) => {
        donneesRecues = donnees;
      };

      const reponse = await POST("/api/informations-emails", {
        email: "jean@mail.com",
        nomOrganisation: "Entreprise",
        accepteInfolettreNis2: true,
        accepteInfolettreServicesDedies: false,
      });

      expect(reponse.status).toBe(201);
      expect(donneesRecues).toStrictEqual({
        email: "jean@mail.com",
        nomOrganisation: "Entreprise",
        accepteInfolettreNis2: true,
        accepteInfolettreServicesDedies: false,
      });
    });

    it("délègue à l'adaptateur CRM l'inscription de l'utilisateur", async () => {
      let inscription: CreeInformationsEmailDto;
      adaptateurCrm.inscrisUtilisateur = async (
        donnees: CreeInformationsEmailDto,
      ) => {
        inscription = donnees;
      };

      await POST("/api/informations-emails", {
        email: "jean@mail.com",
        nomOrganisation: "Entreprise",
        accepteInfolettreNis2: true,
        accepteInfolettreServicesDedies: false,
      });

      expect(inscription).toStrictEqual({
        email: "jean@mail.com",
        nomOrganisation: "Entreprise",
        accepteInfolettreNis2: true,
        accepteInfolettreServicesDedies: false,
      });
    });
  });
});