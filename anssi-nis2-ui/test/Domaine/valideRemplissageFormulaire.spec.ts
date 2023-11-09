import { describe, it } from "vitest";
import {
  verifieCompletudeDonneesCommunes,
  verifieCompletudeDonneesFormulaire,
  verifieCompletudeDonneesFormulairePublique,
} from "../../src/Domaine/Simulateur/services/DonneesFormulaire/DonneesFormulaire.predicats";
import { arbForm } from "./arbitraires/arbitrairesSimulateur";
import { verifieQue } from "../utilitaires/assure";
import { IDonneesBrutesFormulaireSimulateur } from "../../src/Domaine/Simulateur/DonneesFormulaire";
import {
  auMoinsUnSecteurListe,
  uniquementDesSecteursAutres,
} from "../../src/Domaine/Simulateur/services/SecteurActivite/SecteurActivite.predicats";
import { uniquementDesSousSecteursAutres } from "../../src/Domaine/Simulateur/services/SousSecteurActivite/SousSecteurActivite.predicats";

import { isMatching, P } from "ts-pattern";

const donneesAbsentes = Object.entries(arbForm.nonValide.donneeAbsente).filter(
  ([nom]) =>
    ![
      "activites",
      "sousSecteurActivite",
      "typeEntitePublique",
      "trancheCA",
    ].includes(nom),
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
const tableauNonVide = <T>(tableau: T[]) => tableau.length > 0;
const donneesNonValides: {
  nom: string;
  donnees: IDonneesBrutesFormulaireSimulateur;
}[] = [
  {
    nom: "Cas étrange avec activités nulles mais vrai",
    donnees: {
      activites: [],
      designeOperateurServicesEssentiels: ["oui"],
      etatMembre: ["france"],
      secteurActivite: ["espace"],
      sousSecteurActivite: [],
      trancheCA: ["petit"],
      trancheNombreEmployes: ["petit"],
      typeStructure: ["privee"],
      typeEntitePublique: [],
    },
  },
];
describe.each([
  { actionTestee: verifieCompletudeDonneesCommunes },
  { actionTestee: verifieCompletudeDonneesFormulaire },
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
describe.each([
  { actionTestee: verifieCompletudeDonneesCommunes, attendu: true },
  // { actionTestee: verifieCompletudeDonneesFormulairePrivee, attendu: false },
  { actionTestee: verifieCompletudeDonneesFormulairePublique, attendu: false },
  // { actionTestee: verifieCompletudeDonneesFormulaire, attendu: false },
  {
    actionTestee: {
      ["condition 1"]: (donnees) =>
        isMatching({
          trancheCA: [P._],
          typeStructure: ["privee"],
          secteurActivite: P.when(uniquementDesSecteursAutres),
          sousSecteurActivite: P.array(),
          activites: P.array(),
        })(donnees),
    }["condition 1"],
    attendu: false,
  },
  {
    actionTestee: {
      ["condition 2"]: (donnees) =>
        isMatching({
          trancheCA: [P._],
          typeStructure: ["privee"],
          secteurActivite: P.when(auMoinsUnSecteurListe),
          sousSecteurActivite: P.when(uniquementDesSousSecteursAutres),
          activites: P.array(),
        })(donnees),
    }["condition 2"],
    attendu: false,
  },
  {
    actionTestee: {
      ["condition 3"]: (donnees) =>
        isMatching({
          trancheCA: [P._],
          typeStructure: ["privee"],
          secteurActivite: P.when(auMoinsUnSecteurListe),
          sousSecteurActivite: P.array(),
          activites: P.when(tableauNonVide),
        })(donnees),
    }["condition 3"],
    attendu: false,
  },
])("Cas etranges avec $actionTestee.name", ({ actionTestee, attendu }) => {
  it.each(donneesNonValides)("ne doit pas valider $nom", ({ donnees }) => {
    verifieQue(actionTestee).pour(donnees).renvoieToujours(attendu);
  });
});
