import { describe, it } from "vitest";
import { donneesFormulaireSimulateurVide } from "../../src/Domain/Simulateur/services/DonneesFormulaire/DonneesFormulaire.constantes";
import { DonneesFormulaireSimulateur } from "../../src/Domain/Simulateur/services/DonneesFormulaire/DonneesFormulaire.definitions";
import { fabriqueDonneesFormulaire } from "../../src/Domain/Simulateur/services/DonneesFormulaire/DonneesFormulaire.fabrique";
import {
  donneesFormulaireSontCompletes,
  verifieCompletudeDonneesCommunes,
  verifieCompletudeDonneesFormulairePrivee,
  verifieCompletudeDonneesFormulairePublique,
  verifieDonneesCommunesPrivee,
  verifieDonneesCommunesPublique,
  verifieDonneesSectorielles,
} from "../../src/Domain/Simulateur/services/DonneesFormulaire/DonneesFormulaire.predicats";
import { ChampsFormulaireFacultatifs } from "../../src/Domain/Simulateur/services/DonneesFormulaire/DonneesFormulaire.valeurs";
import { verifieQue } from "../utilitaires/assure";
import { arbForm } from "./arbitraires/DonneesSimulateur/arbitrairesSimulateur";

describe("Invalide en cas de données absentes", () => {
  const donneesAbsentes = Object.entries(
    arbForm.nonValide.donneeAbsente,
  ).filter(
    ([nom]) =>
      !(ChampsFormulaireFacultatifs as unknown as string[]).includes(nom),
  );

  it.each(donneesAbsentes)("%s", (_, donneeAbsente) => {
    verifieQue(donneesFormulaireSontCompletes)
      .estToujoursFaux()
      .quelqueSoit(donneeAbsente);
  });
});

describe("Validation des données formulaire", () => {
  const donneesTestArbPriveeSansAutre = [
    {
      nom: "nonDesigneOSE.privee.grand.secteursListes.sansBesoinLocalisation",
      arbitraireEligible:
        arbForm.nonDesigneOSE.privee.grand.secteursListes
          .sansBesoinLocalisation,
    },
  ];
  const donneesTestArbAutres = [
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
  ];
  const donneesTestsArbPrivee = [
    ...donneesTestArbPriveeSansAutre,
    ...donneesTestArbAutres,
  ];

  const donneesTestsArbitraires = [
    {
      nom: "nonDesigneOSE.publique",
      arbitraireEligible: arbForm.nonDesigneOSE.publique,
    },
    ...donneesTestsArbPrivee,
  ];

  const formulairePetitInfraNumSansLocalisation = fabriqueDonneesFormulaire({
    designationOperateurServicesEssentiels: ["non"],
    appartenancePaysUnionEuropeenne: ["france"],
    typeStructure: ["privee"],
    secteurActivite: ["infrastructureNumerique"],
    trancheNombreEmployes: ["petit"],
    trancheChiffreAffaire: ["petit"],
    activites: ["fournisseurServicesDNS"],
  });

  describe("Données privées : verifieDonneesCommunesPrivee", () => {
    it.each(donneesTestsArbPrivee)(" $nom", ({ arbitraireEligible }) => {
      verifieQue(verifieDonneesCommunesPrivee)
        .estToujoursVrai()
        .quelqueSoit(arbitraireEligible);
    });
  });

  describe("Données privées : verifieCompletudeDonneesFormulairePrivee", () => {
    it.each(donneesTestsArbPrivee)("$nom", ({ arbitraireEligible }) => {
      verifieQue(verifieCompletudeDonneesFormulairePrivee)
        .estToujoursVrai()
        .quelqueSoit(arbitraireEligible);
    });
  });

  describe("verifieCompletudeDonneesFormulairePublique", () => {
    it.each([
      {
        nom: "nonDesigneOSE.publique.sansBesoinLocalisation",
        arbitraireEligible: arbForm.nonDesigneOSE.publique,
      },
    ])("$nom", ({ arbitraireEligible }) => {
      verifieQue(verifieCompletudeDonneesFormulairePublique)
        .estToujoursVrai()
        .quelqueSoit(arbitraireEligible);
    });
  });

  describe("verifieDonneesCommunesPublique", () => {
    it.each([
      {
        nom: "nonDesigneOSE.publique.sansBesoinLocalisation",
        arbitraireEligible: arbForm.nonDesigneOSE.publique,
      },
    ])(
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
    it.each(donneesTestsArbitraires)("$nom", ({ arbitraireEligible }) => {
      verifieQue(donneesFormulaireSontCompletes)
        .estToujoursVrai()
        .quelqueSoit(arbitraireEligible);
    });
  });

  describe("verifieDonneesSectorielles", () => {
    it.each(donneesTestsArbitraires)("$nom", ({ arbitraireEligible }) => {
      verifieQue(verifieDonneesSectorielles)
        .estToujoursVrai()
        .quelqueSoit(arbitraireEligible);
    });
  });

  describe("Cas étrange de validation", () => {
    describe("activité nulle", () => {
      const donnees: DonneesFormulaireSimulateur = {
        ...donneesFormulaireSimulateurVide,
        designationOperateurServicesEssentiels: ["oui"],
        appartenancePaysUnionEuropeenne: ["france"],
        secteurActivite: ["espace"],
        trancheChiffreAffaire: ["petit"],
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

    describe("publique", () => {
      const donnees = fabriqueDonneesFormulaire({
        designationOperateurServicesEssentiels: ["oui"],
        appartenancePaysUnionEuropeenne: ["france"],
        secteurActivite: ["energie"],
        trancheNombreEmployes: ["petit"],
        typeStructure: ["publique"],
        typeEntitePublique: ["administrationCentrale"],
      });
      it(
        "verifieCompletudeDonneesCommunes",
        verifieQue(verifieCompletudeDonneesCommunes).pour(donnees)
          .estToujoursVrai,
      );
      it(
        "verifieCompletudeDonneesFormulairePublique",
        verifieQue(verifieCompletudeDonneesFormulairePublique).pour(donnees)
          .estToujoursFaux,
      );
    });
    describe("Petite Infrastructure numérique ne fournit pas en UE", () => {
      const donnees: DonneesFormulaireSimulateur = {
        ...formulairePetitInfraNumSansLocalisation,
        fournitServicesUnionEuropeenne: ["non"],
      };
      it(
        "verifieCompletudeDonneesFormulairePrivee",
        verifieQue(verifieCompletudeDonneesFormulairePrivee).pour(donnees)
          .estToujoursVrai,
      );
    });
  });
});
