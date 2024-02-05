import { describe, it } from "vitest";
import { DonneesFormulaireSimulateur } from "../../src/Domain/Simulateur/DonneesFormulaire.definitions";
import { donneesFormulaireSimulateurVide } from "../../src/Domain/Simulateur/DonneesFormulaire.constantes";
import { ChampsFormulaireFacultatifs } from "../../src/Domain/Simulateur/DonneesFormulaire.valeurs";
import { fabriqueDonneesFormulaire } from "../../src/Domain/Simulateur/fabriques/DonneesFormulaire.fabrique";
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
    arbForm.nonValide.donneeAbsente
  ).filter(([nom]) => !ChampsFormulaireFacultatifs.includes(nom));

  it.each(donneesAbsentes)("%s", (nom, donneeAbsente) => {
    verifieQue(donneesFormulaireSontCompletes)
      .estToujoursFaux()
      .quelqueSoit(donneeAbsente);
  });
});

describe("Validation des données formulaire", () => {
  const donneesTestArbPriveeSansAutre = [
    {
      nom: "designeOSE.petit.sansBesoinLocalisation",
      arbitraireEligible: arbForm.designeOSE.petit.sansBesoinLocalisation,
    },
    {
      nom: "designeOSE.petit.avecLocalisation",
      arbitraireEligible: arbForm.designeOSE.petit.avecLocalisationRepresentant,
    },
    {
      nom: "designeOSE.moyenGrand.sansBesoinLocalisation",
      arbitraireEligible: arbForm.designeOSE.moyenGrand.sansBesoinLocalisation,
    },
    {
      nom: "designeOSE.moyenGrand.avecLocalisationRepresentant",
      arbitraireEligible:
        arbForm.designeOSE.moyenGrand.avecLocalisationRepresentant,
    },
    {
      nom: "nonDesigneOSE.privee.grand.secteursListes.sansBesoinLocalisation",
      arbitraireEligible:
        arbForm.nonDesigneOSE.privee.grand.secteursListes
          .sansBesoinLocalisation,
    },
    {
      nom: "nonDesigneOSE.privee.grand.secteursListes.avecFournitServiceUE",
      arbitraireEligible:
        arbForm.nonDesigneOSE.privee.grand.secteursListes.neFournitPasServiceUe,
    },
    {
      nom: "nonDesigneOSE.privee.grand.secteursListes.avecLocalisationRepresentant",
      arbitraireEligible:
        arbForm.nonDesigneOSE.privee.grand.secteursListes
          .avecLocalisationRepresentant,
    },
    {
      nom: "nonDesigneOSE.privee.petit.fournisseursInfraNum.petitInfraNum.activitesConcernes",
      arbitraireEligible:
        arbForm.nonDesigneOSE.privee.petit.fournisseursInfraNum.petitInfraNum
          .activitesConcernes,
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

  const donneesTestsArbPublique = [
    {
      nom: "nonDesigneOSE.publique.sansBesoinLocalisation",
      arbitraireEligible: arbForm.nonDesigneOSE.publique.sansBesoinLocalisation,
    },
    {
      nom: "nonDesigneOSE.publique.avecLocalisationRepresentant",
      arbitraireEligible:
        arbForm.nonDesigneOSE.publique.avecLocalisationRepresentant,
    },
    {
      nom: "nonDesigneOSE.publique.avecLocalisationRepresentantFrance",
      arbitraireEligible:
        arbForm.nonDesigneOSE.publique.avecLocalisationRepresentantFrance,
    },
    {
      nom: "nonDesigneOSE.publique.neFournitPasServiceUe",
      arbitraireEligible: arbForm.nonDesigneOSE.publique.neFournitPasServiceUe,
    },
  ];

  const donneesTestsArbitraires = [
    ...donneesTestsArbPublique,
    ...donneesTestsArbPrivee,
  ];

  const formulairePetitInfraNumSansLocalisation = fabriqueDonneesFormulaire({
    designeOperateurServicesEssentiels: ["non"],
    appartenancePaysUnionEurpopeenne: ["france"],
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
  describe("Données privées : contientSecteursLocalisesValides", () => {
    it.each(donneesTestArbPriveeSansAutre)("$nom", ({ arbitraireEligible }) => {
      verifieQue(contientSecteursLocalisesValides)
        .estToujoursVrai()
        .quelqueSoit(arbitraireEligible);
    });
  });

  describe("verifieCompletudeDonneesFormulairePublique", () => {
    it.each(donneesTestsArbPublique)("$nom", ({ arbitraireEligible }) => {
      verifieQue(verifieCompletudeDonneesFormulairePublique)
        .estToujoursVrai()
        .quelqueSoit(arbitraireEligible);
    });
  });

  describe("verifieDonneesCommunesPublique", () => {
    it.each(donneesTestsArbPublique)(
      "Doit accepter des données éligibles: $nom",
      ({ arbitraireEligible }) => {
        verifieQue(verifieDonneesCommunesPublique)
          .estToujoursVrai()
          .quelqueSoit(arbitraireEligible);
      }
    );
  });

  describe("verifieCompletudeDonneesCommunes", () => {
    it.each(donneesTestsArbitraires)(
      "Doit accepter des données éligibles: $nom",
      ({ arbitraireEligible }) => {
        verifieQue(verifieCompletudeDonneesCommunes)
          .estToujoursVrai()
          .quelqueSoit(arbitraireEligible);
      }
    );
  });

  describe("verifieCompletudeDonneesCommunes", () => {
    it.each(donneesTestsArbitraires)(
      "Doit accepter des données éligibles: $nom",
      ({ arbitraireEligible }) => {
        verifieQue(verifieCompletudeDonneesCommunes)
          .estToujoursVrai()
          .quelqueSoit(arbitraireEligible);
      }
    );
  });

  /*
  Error: Property failed after 54 tests
{ seed: -1306139177, path: "53", endOnFailure: true }
Counterexample: [{"typeEntitePublique":["administrationCentrale"],"fournitServicesUnionEuropeenne":[],"localisationRepresentant":[],"secteurActivite":["infrastructureNumerique"],"sousSecteurActivite":[],"designeOperateurServicesEssentiels":["non"],"typeStructure":["publique"],"trancheChiffreAffaire":["moyen"],"appartenancePaysUnionEurpopeenne":["france"],"trancheNombreEmployes":["grand"],"activites":["registresNomsDomainesPremierNiveau"]}]
   */
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
        designeOperateurServicesEssentiels: ["oui"],
        appartenancePaysUnionEurpopeenne: ["france"],
        secteurActivite: ["espace"],
        trancheChiffreAffaire: ["petit"],
        trancheNombreEmployes: ["petit"],
        typeStructure: ["privee"],
      };
      it(
        "vérifie données communes complètes",
        verifieQue(verifieCompletudeDonneesCommunes).pour(donnees)
          .estToujoursVrai
      );
      it(
        "ne vérifie pas données sectorielles",
        verifieQue(verifieDonneesSectorielles).pour(donnees).estToujoursFaux
      );
      it(
        "ne vérifie pas données form privé complètes",
        verifieQue(verifieCompletudeDonneesFormulairePrivee).pour(donnees)
          .estToujoursFaux
      );
      it(
        "ne vérifie pas données form publiques sont complètes",
        verifieQue(verifieCompletudeDonneesFormulairePublique).pour(donnees)
          .estToujoursFaux
      );
      it(
        "ne vérifie pas données form complètes",
        verifieQue(donneesFormulaireSontCompletes).pour(donnees).estToujoursFaux
      );
    });

    describe("publique", () => {
      const donnees = fabriqueDonneesFormulaire({
        designeOperateurServicesEssentiels: ["oui"],
        appartenancePaysUnionEurpopeenne: ["france"],
        secteurActivite: ["energie"],
        trancheNombreEmployes: ["petit"],
        typeStructure: ["publique"],
        typeEntitePublique: ["administrationCentrale"],
      });
      it(
        "verifieCompletudeDonneesCommunes",
        verifieQue(verifieCompletudeDonneesCommunes).pour(donnees)
          .estToujoursVrai
      );
      it(
        "verifieCompletudeDonneesFormulairePublique",
        verifieQue(verifieCompletudeDonneesFormulairePublique).pour(donnees)
          .estToujoursFaux
      );
    });
    describe("Petite Infrastructure numérique non localisée", () => {
      it(
        "contientSecteursLocalisesValides",
        verifieQue(contientSecteursLocalisesValides).pour(
          formulairePetitInfraNumSansLocalisation
        ).estToujoursFaux
      );
      it(
        "verifieDonneesSectorielles",
        verifieQue(verifieDonneesSectorielles).pour(
          formulairePetitInfraNumSansLocalisation
        ).estToujoursFaux
      );
      it(
        "contientSecteursLocalisesValides",
        verifieQue(contientSecteursLocalisesValides).pour({
          ...formulairePetitInfraNumSansLocalisation,
          secteurActivite: ["gestionServicesTic"],
          activites: ["fournisseurServicesSecuriteGeres"],
        }).estToujoursVrai
      );
      it(
        "verifieDonneesSectorielles",
        verifieQue(verifieDonneesSectorielles).pour(
          formulairePetitInfraNumSansLocalisation
        ).estToujoursFaux
      );
    });
    describe("Petite Infrastructure numérique sans représentant", () => {
      const donnees: DonneesFormulaireSimulateur = {
        ...formulairePetitInfraNumSansLocalisation,
        fournitServicesUnionEuropeenne: ["oui"],
      };
      it(
        "verifieCompletudeDonneesFormulairePrivee",
        verifieQue(verifieCompletudeDonneesFormulairePrivee).pour(donnees)
          .estToujoursFaux
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
          .estToujoursVrai
      );
    });
  });
});
