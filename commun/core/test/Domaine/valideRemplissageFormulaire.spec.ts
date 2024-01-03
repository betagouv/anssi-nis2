import { describe, it } from "vitest";
import { IDonneesBrutesFormulaireSimulateur } from "../../src/Domain/Simulateur/DonneesFormulaire";
import { donneesFormulaireSimulateurVide } from "../../src/Domain/Simulateur/DonneesFormulaire.constantes";
import { ChampsFormulaireFacultatifs } from "../../src/Domain/Simulateur/DonneesFormulaire.valeurs";
import {
  donneesFormulaireSontCompletes,
  verifieCompletudeDonneesCommunes,
  verifieCompletudeDonneesFormulairePrivee,
  verifieCompletudeDonneesFormulairePublique,
  verifieDonneesCommunesPrivee,
  verifieDonneesCommunesPublique,
  verifieDonneesSectorielles,
} from "../../src/Domain/Simulateur/services/DonneesFormulaire/DonneesFormulaire.predicats";
import { verifieQue } from "../utilitaires/assure";
import { arbForm } from "./arbitraires/arbitrairesSimulateur";

describe("Validation des données formulaire", () => {
  const donneesAbsentes = Object.entries(
    arbForm.nonValide.donneeAbsente,
  ).filter(([nom]) => !ChampsFormulaireFacultatifs.includes(nom));

  const donneesTestsArbPrivee = [
    {
      nom: "designeOSE.petit",
      arbitraireEligible: arbForm.designeOSE.petit,
    },
    {
      nom: "designeOSE.moyenGrand",
      arbitraireEligible: arbForm.designeOSE.moyenGrand,
    },
    {
      nom: "nonDesigneOSE.privee.petit.fournisseursInfrastructureNumerique",
      arbitraireEligible:
        arbForm.nonDesigneOSE.privee.petit.fournisseursInfrastructureNumerique,
    },
    {
      nom: "nonDesigneOSE.privee.grand.secteursListes",
      arbitraireEligible: arbForm.nonDesigneOSE.privee.grand.secteursListes,
    },
    {
      nom: "nonDesigneOSE.privee.grand.secteursAutres",
      arbitraireEligible: arbForm.nonDesigneOSE.privee.grand.secteursAutres,
    },
    {
      nom: "nonDesigneOSE.privee.grand.activitesAutres",
      arbitraireEligible: arbForm.nonDesigneOSE.privee.grand.activitesAutres,
    },
    {
      nom: "nonDesigneOSE.privee.activitesAutres",
      arbitraireEligible: arbForm.nonDesigneOSE.privee.activitesAutres,
    },
    {
      nom: "nonDesigneOSE.privee.petit.fournisseursInfraNum.petitInfraNum.activitesConcernes",
      arbitraireEligible:
        arbForm.nonDesigneOSE.privee.petit.fournisseursInfraNum.petitInfraNum
          .activitesConcernes,
    },
  ];
  const donneesTestsArbPublique = [
    {
      nom: "nonDesigneOSE.publique",
      arbitraireEligible: arbForm.nonDesigneOSE.publique,
    },
  ];

  const donneesTestsArbitraires = [
    ...donneesTestsArbPublique,
    ...donneesTestsArbPrivee,
  ];
  const testsActiviteNulle = [
    {
      name: "verifieCompletudeDonneesCommunes",
      actionTestee: verifieCompletudeDonneesCommunes,
      attendu: true,
    },
    {
      name: "verifieCompletudeDonneesFormulairePrivee",
      actionTestee: verifieCompletudeDonneesFormulairePrivee,
      attendu: false,
    },
    {
      name: "verifieCompletudeDonneesFormulairePublique",
      actionTestee: verifieCompletudeDonneesFormulairePublique,
      attendu: false,
    },
    {
      name: "donneesFormulaireSontCompletes",
      actionTestee: donneesFormulaireSontCompletes,
      attendu: false,
    },
  ];
  const formulairePetitInfraNumSansLocalisation: IDonneesBrutesFormulaireSimulateur =
    {
      ...donneesFormulaireSimulateurVide,
      designeOperateurServicesEssentiels: ["non"],
      etatMembre: ["france"],
      typeStructure: ["privee"],
      secteurActivite: ["infrastructureNumerique"],
      trancheNombreEmployes: ["petit"],
      trancheCA: ["petit"],
      activites: ["fournisseurServicesDNS"],
    };

  describe.each([
    {
      nom: "verifieCompletudeDonneesCommunes",
      actionTestee: verifieCompletudeDonneesCommunes,
    },
    {
      nom: "donneesFormulaireSontCompletes",
      actionTestee: donneesFormulaireSontCompletes,
    },
    {
      nom: "verifieDonneesSectorielles",
      actionTestee: verifieDonneesSectorielles,
    },
  ])("$nom", ({ actionTestee }) => {
    it.each(donneesAbsentes)(
      "Doit rejeter les données non valides $nom",
      (nom, arbitraireDonneeAbsente) => {
        verifieQue<IDonneesBrutesFormulaireSimulateur, boolean>(actionTestee)
          .quelqueSoit(arbitraireDonneeAbsente)
          .renvoieToujours(false);
      },
    );
    it.each(donneesTestsArbitraires)(
      "Doit accepter des données éligibles: $nom",
      ({ arbitraireEligible }) => {
        verifieQue(actionTestee)
          .quelqueSoit(arbitraireEligible)
          .renvoieToujours(true);
      },
    );
  });

  describe.each([
    {
      nom: "verifieDonneesCommunesPrivee",
      actionTestee: verifieDonneesCommunesPrivee,
    },
    {
      nom: "verifieCompletudeDonneesFormulairePrivee",
      actionTestee: verifieCompletudeDonneesFormulairePrivee,
    },
  ])("Données privées : $nom", ({ actionTestee }) => {
    it.each(donneesAbsentes)(
      "Doit rejeter les données non valides $nom",
      (nom, arbitraireDonneeAbsente) => {
        verifieQue<IDonneesBrutesFormulaireSimulateur, boolean>(actionTestee)
          .quelqueSoit(arbitraireDonneeAbsente)
          .renvoieToujours(false);
      },
    );
    it.each(donneesTestsArbPrivee)(
      "Doit accepter des données éligibles: $nom",
      ({ arbitraireEligible }) => {
        verifieQue(actionTestee)
          .quelqueSoit(arbitraireEligible)
          .renvoieToujours(true);
      },
    );
  });

  describe.each([
    {
      nom: "verifieCompletudeDonneesFormulairePublique",
      actionTestee: verifieCompletudeDonneesFormulairePublique,
    },
    {
      nom: "verifieDonneesCommunesPublique",
      actionTestee: verifieDonneesCommunesPublique,
    },
  ])("Données publiques : $nom", ({ actionTestee }) => {
    it.each(donneesAbsentes)(
      "Doit rejeter les données non valides $nom",
      (nom, arbitraireDonneeAbsente) => {
        verifieQue<IDonneesBrutesFormulaireSimulateur, boolean>(actionTestee)
          .quelqueSoit(arbitraireDonneeAbsente)
          .renvoieToujours(false);
      },
    );
    it.each(donneesTestsArbPublique)(
      "Doit accepter des données éligibles: $nom",
      ({ arbitraireEligible }) => {
        verifieQue(actionTestee)
          .quelqueSoit(arbitraireEligible)
          .renvoieToujours(true);
      },
    );
  });

  describe("Cas étrange de validation", () => {
    const donneesNonValides: {
      description: string;
      donnees: IDonneesBrutesFormulaireSimulateur;
      tests: {
        name: string;
        actionTestee: (donnees: IDonneesBrutesFormulaireSimulateur) => boolean;
        attendu: boolean;
      }[];
    }[] = [
      {
        description: "activiteNulle",
        donnees: {
          ...donneesFormulaireSimulateurVide,
          designeOperateurServicesEssentiels: ["oui"],
          etatMembre: ["france"],
          secteurActivite: ["espace"],
          trancheCA: ["petit"],
          trancheNombreEmployes: ["petit"],
          typeStructure: ["privee"],
        },
        tests: testsActiviteNulle,
      },
      {
        description: "publique",
        donnees: {
          ...donneesFormulaireSimulateurVide,
          designeOperateurServicesEssentiels: ["oui"],
          etatMembre: ["france"],
          secteurActivite: ["energie"],
          trancheNombreEmployes: ["petit"],
          typeStructure: ["publique"],
          typeEntitePublique: ["administrationCentrale"],
        },
        tests: [
          {
            name: "verifieCompletudeDonneesCommunes",
            actionTestee: verifieCompletudeDonneesCommunes,
            attendu: true,
          },
          {
            name: "verifieCompletudeDonneesFormulairePublique",
            actionTestee: verifieCompletudeDonneesFormulairePublique,
            attendu: false,
          },
        ],
      },
      {
        description: "Petite Infrastructure numérique non localisée",
        donnees: formulairePetitInfraNumSansLocalisation,
        tests: [
          {
            name: "verifieDonneesSectorielles",
            actionTestee: verifieDonneesSectorielles,
            attendu: false,
          },
        ],
      },
      {
        description: "Petite Infrastructure numérique sans représentant",
        donnees: {
          ...formulairePetitInfraNumSansLocalisation,
          fournitServicesUnionEuropeenne: ["oui"],
        },
        tests: [
          {
            name: "verifieCompletudeDonneesFormulairePrivee",
            actionTestee: verifieCompletudeDonneesFormulairePrivee,
            attendu: false,
          },
        ],
      },
      {
        description: "Petite Infrastructure numérique ne fournit pas en UE",
        donnees: {
          ...formulairePetitInfraNumSansLocalisation,
          fournitServicesUnionEuropeenne: ["non"],
        },
        tests: [
          {
            name: "verifieCompletudeDonneesFormulairePrivee",
            actionTestee: verifieCompletudeDonneesFormulairePrivee,
            attendu: true,
          },
        ],
      },
    ];

    describe.each(donneesNonValides)(
      "--> $description",
      ({ donnees, tests }) => {
        it.each(tests)(
          "$name doit être $attendu",
          ({ actionTestee, attendu }) => {
            verifieQue(actionTestee).pour(donnees).renvoieToujours(attendu);
          },
        );
      },
    );
  });
});
