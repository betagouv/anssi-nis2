import { describe, it } from "vitest";
import { verifieCompletudeDonneesFormulaire } from "../../src/Domaine/Simulateur/services/DonneesFormulaire/DonneesFormulaire.predicats";
import { arbForm } from "./arbitraires/arbitrairesSimulateur";
import { verifieQue } from "../utilitaires/assure";

const donneesAbsentes = Object.entries(arbForm.nonValide.donneeAbsente).filter(
  ([nom]) =>
    ![
      "activites",
      "sousSecteurActivite",
      "typeEntitePublique",
      "trancheCA",
    ].includes(nom),
);
describe(verifieCompletudeDonneesFormulaire, () => {
  it.each(donneesAbsentes)(
    "Doit rejeter les données non valides %s",
    (nom, arbitraireDonneeAbsente) => {
      verifieQue(verifieCompletudeDonneesFormulaire)
        .quelqueSoit(arbitraireDonneeAbsente)
        .renvoieToujours(false);
    },
  );
  it.each([
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
  ])("Doit accepter des données éligibles: $nom", ({ arbitraireEligible }) => {
    verifieQue(verifieCompletudeDonneesFormulaire)
      .quelqueSoit(arbitraireEligible)
      .renvoieToujours(true);
  });
});
