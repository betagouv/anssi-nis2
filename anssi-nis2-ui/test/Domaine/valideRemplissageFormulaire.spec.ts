import { describe, it } from "vitest";
import {
  verifieCompletudeDonneesCommunes,
  donneesFormulaireSontCompletes,
  verifieCompletudeDonneesFormulairePrivee,
  verifieCompletudeDonneesFormulairePublique,
} from "../../src/Domaine/Simulateur/services/DonneesFormulaire/DonneesFormulaire.predicats";
import { arbForm } from "./arbitraires/arbitrairesSimulateur";
import { verifieQue } from "../utilitaires/assure";
import {
  IDonneesBrutesFormulaireSimulateur,
  donneesFormulaireSimulateurVide,
} from "../../src/Domaine/Simulateur/DonneesFormulaire";
import { ChampsFormulaireFacultatifs } from "../../src/Domaine/Simulateur/DonneesFormulaire.valeurs";

const donneesAbsentes = Object.entries(arbForm.nonValide.donneeAbsente).filter(
  ([nom]) => !ChampsFormulaireFacultatifs.includes(nom),
);

const donneesTestsArbitraires = [
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
    nom: "nonDesigneOSE.publique",
    arbitraireEligible: arbForm.nonDesigneOSE.publique,
  },
];
const testsActiviteNulle = [
  {
    actionTestee: verifieCompletudeDonneesCommunes,
    attendu: true,
  },
  {
    actionTestee: verifieCompletudeDonneesFormulairePrivee,
    attendu: false,
  },
  {
    actionTestee: verifieCompletudeDonneesFormulairePublique,
    attendu: false,
  },
  {
    actionTestee: donneesFormulaireSontCompletes,
    attendu: false,
  },
];
const donneesNonValides: {
  description: string;
  donnees: IDonneesBrutesFormulaireSimulateur;
  tests: {
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
        actionTestee: verifieCompletudeDonneesCommunes,
        attendu: true,
      },
      {
        actionTestee: verifieCompletudeDonneesFormulairePublique,
        attendu: false,
      },
    ],
  },
];

describe.each([
  { actionTestee: verifieCompletudeDonneesCommunes },
  { actionTestee: donneesFormulaireSontCompletes },
])("$actionTestee.name", ({ actionTestee }) => {
  it.each(donneesAbsentes)(
    "Doit rejeter les données non valides %s",
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

describe.each(donneesNonValides)(
  "Cas etranges $description",
  ({ donnees, tests }) => {
    it.each(tests)(
      "doit répondre $attendu pour $actionTestee.name",
      ({ actionTestee, attendu }) => {
        verifieQue(actionTestee).pour(donnees).renvoieToujours(attendu);
      },
    );
  },
);
