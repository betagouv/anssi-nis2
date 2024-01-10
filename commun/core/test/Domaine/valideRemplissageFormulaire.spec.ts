import { describe, it } from "vitest";
import { DonneesFormulaireSimulateur } from "../../src/Domain/Simulateur/DonneesFormulaire.definitions";
import { donneesFormulaireSimulateurVide } from "../../src/Domain/Simulateur/DonneesFormulaire.constantes";
import { ChampsFormulaireFacultatifs } from "../../src/Domain/Simulateur/DonneesFormulaire.valeurs";
import { non } from "../../src/Domain/Simulateur/services/ChampSimulateur/champs.predicats";
import {
  contientSecteursLocalisesValides,
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

describe("Invalide en cas de données absentes", () => {
  const donneesAbsentes = Object.entries(
    arbForm.nonValide.donneeAbsente,
  ).filter(([nom]) => !ChampsFormulaireFacultatifs.includes(nom));

  it.each(donneesAbsentes)("%s", (nom, donneeAbsente) => {
    verifieQue(donneesFormulaireSontCompletes)
      .estToujoursFaux()
      .quelqueSoit(donneeAbsente);
  });
});

describe("Validation des données formulaire", () => {
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

  const formulairePetitInfraNumSansLocalisation: DonneesFormulaireSimulateur = {
    ...donneesFormulaireSimulateurVide,
    designeOperateurServicesEssentiels: ["non"],
    appartenancePaysUnionEurpopeenne: ["france"],
    typeStructure: ["privee"],
    secteurActivite: ["infrastructureNumerique"],
    trancheNombreEmployes: ["petit"],
    trancheCA: ["petit"],
    activites: ["fournisseurServicesDNS"],
  };

  describe("Données privées : verifieDonneesCommunesPrivee", () => {
    it.each(donneesTestsArbPrivee)(
      "Doit accepter des données éligibles: $nom",
      ({ arbitraireEligible }) => {
        verifieQue(verifieDonneesCommunesPrivee)
          .estToujoursVrai()
          .quelqueSoit(arbitraireEligible);
      },
    );
  });

  describe("Données privées : verifieCompletudeDonneesFormulairePrivee", () => {
    it.each(donneesTestsArbPrivee)(
      "Doit accepter des données éligibles: $nom",
      ({ arbitraireEligible }) => {
        verifieQue(verifieCompletudeDonneesFormulairePrivee)
          .estToujoursVrai()
          .quelqueSoit(arbitraireEligible);
      },
    );
  });

  describe("verifieCompletudeDonneesFormulairePublique", () => {
    it.each(donneesTestsArbPublique)(
      "Doit accepter des données éligibles: $nom",
      ({ arbitraireEligible }) => {
        verifieQue(verifieCompletudeDonneesFormulairePublique)
          .estToujoursVrai()
          .quelqueSoit(arbitraireEligible);
      },
    );
  });

  describe("verifieDonneesCommunesPublique", () => {
    it.each(donneesTestsArbPublique)(
      "Doit accepter des données éligibles: $nom",
      ({ arbitraireEligible }) => {
        verifieQue(verifieDonneesCommunesPublique)
          .estToujoursVrai()
          .quelqueSoit(arbitraireEligible);
      },
    );
  });

  describe("verifieCompletudeDonneesCommunes", () => {
    it.each(donneesTestsArbitraires)(
      "Doit accepter des données éligibles: $nom",
      ({ arbitraireEligible }) => {
        verifieQue(verifieCompletudeDonneesCommunes)
          .estToujoursVrai()
          .quelqueSoit(arbitraireEligible);
      },
    );
  });

  describe("verifieCompletudeDonneesCommunes", () => {
    it.each(donneesTestsArbitraires)(
      "Doit accepter des données éligibles: $nom",
      ({ arbitraireEligible }) => {
        verifieQue(verifieCompletudeDonneesCommunes)
          .estToujoursVrai()
          .quelqueSoit(arbitraireEligible);
      },
    );
  });

  describe("donneesFormulaireSontCompletes", () => {
    it.each(donneesTestsArbitraires)(
      "Doit accepter des données éligibles: $nom",
      ({ arbitraireEligible }) => {
        verifieQue(donneesFormulaireSontCompletes)
          .estToujoursVrai()
          .quelqueSoit(arbitraireEligible);
      },
    );
  });

  describe("verifieDonneesSectorielles", () => {
    it.each(donneesTestsArbitraires)(
      "Doit accepter des données éligibles: $nom",
      ({ arbitraireEligible }) => {
        verifieQue(verifieDonneesSectorielles)
          .estToujoursVrai()
          .quelqueSoit(arbitraireEligible);
      },
    );
  });

  describe("Cas étrange de validation", () => {
    describe("activité nulle", () => {
      const donnees: DonneesFormulaireSimulateur = {
        ...donneesFormulaireSimulateurVide,
        designeOperateurServicesEssentiels: ["oui"],
        appartenancePaysUnionEurpopeenne: ["france"],
        secteurActivite: ["espace"],
        trancheCA: ["petit"],
        trancheNombreEmployes: ["petit"],
        typeStructure: ["privee"],
      };
      it(
        "vérifie données communes complètes",
        verifieQue(verifieCompletudeDonneesCommunes).pour(donnees)
          .estToujoursVrai,
      );
      it(
        "ne vérifie pas données sectorielles",
        verifieQue(verifieDonneesSectorielles).pour(donnees).estToujoursFaux,
      );
      it(
        "ne vérifie pas données form privé complètes",
        verifieQue(verifieCompletudeDonneesFormulairePrivee).pour(donnees)
          .estToujoursFaux,
      );
      it(
        "ne vérifie pas données form publiques sont complètes",
        verifieQue(verifieCompletudeDonneesFormulairePublique).pour(donnees)
          .estToujoursFaux,
      );
      it(
        "ne vérifie pas données form complètes",
        verifieQue(donneesFormulaireSontCompletes).pour(donnees)
          .estToujoursFaux,
      );
    });

    const donneesNonValides: {
      description: string;
      donnees: DonneesFormulaireSimulateur;
      tests: {
        name: string;
        actionTestee: (donnees: DonneesFormulaireSimulateur) => boolean;
      }[];
    }[] = [
      {
        description: "publique",
        donnees: {
          ...donneesFormulaireSimulateurVide,
          designeOperateurServicesEssentiels: ["oui"],
          appartenancePaysUnionEurpopeenne: ["france"],
          secteurActivite: ["energie"],
          trancheNombreEmployes: ["petit"],
          typeStructure: ["publique"],
          typeEntitePublique: ["administrationCentrale"],
        },
        tests: [
          {
            name: "verifieCompletudeDonneesCommunes",
            actionTestee: verifieCompletudeDonneesCommunes,
          },
          {
            name: "non(verifieCompletudeDonneesFormulairePublique)",
            actionTestee: non(verifieCompletudeDonneesFormulairePublique),
          },
        ],
      },
      {
        description: "Petite Infrastructure numérique non localisée",
        donnees: formulairePetitInfraNumSansLocalisation,
        tests: [
          {
            name: "non(contientSecteursLocalisesValides)",
            actionTestee: non(contientSecteursLocalisesValides),
          },
          {
            name: "non(verifieDonneesSectorielles)",
            actionTestee: non(verifieDonneesSectorielles),
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
            name: "non(verifieCompletudeDonneesFormulairePrivee)",
            actionTestee: non(verifieCompletudeDonneesFormulairePrivee),
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
          },
        ],
      },
    ];

    describe.each(donneesNonValides)(
      "--> $description",
      ({ donnees, tests }) => {
        it.each(tests)("$name doit être $attendu", ({ actionTestee }) => {
          verifieQue(actionTestee).pour(donnees).estToujoursVrai();
        });
      },
    );
  });
});
