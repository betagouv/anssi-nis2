import { describe, it } from "vitest";
import { verifieCompletudeDonneesFormulaire } from "../../src/Domaine/Simulateur/services/DonneesFormulaire/DonneesFormulaire.predicats";
import { arbForm } from "./arbitraires/arbitrairesSimulateur";
import { verifieQue } from "../utilitaires/assure";

describe(verifieCompletudeDonneesFormulaire, () => {
  it("Doit accepter des données toutes remplies", () => {
    verifieQue(verifieCompletudeDonneesFormulaire)
      .quelqueSoit(arbForm.nonValide.donneeAbsente.typeStructure)
      .renvoieToujours(false);
  });
  it.each([arbForm.designeOSE.moyenGrand])(
    "Doit accepter des données toutes remplies",
    (arbitraireEligible) => {
      verifieQue(verifieCompletudeDonneesFormulaire)
        .quelqueSoit(arbitraireEligible)
        .renvoieToujours(true);
    },
  );
});
