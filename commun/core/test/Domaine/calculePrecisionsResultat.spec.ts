import { describe, it } from "vitest";
import { donneesFormulaireSimulateurVide } from "../../src/Domain/Simulateur/DonneesFormulaire.constantes";
import { fabriqueDonneesFormulaire } from "../../src/Domain/Simulateur/fabriques/DonneesFormulaire.fabrique";

import { Regulation } from "../../src/Domain/Simulateur/Regulation.definitions";
import { PrecisionsResultat } from "../../src/Domain/Simulateur/Resultat.constantes";
import { calculePrecisionResultat } from "../../src/Domain/Simulateur/Resultat.operations";
import { verifieQue } from "../utilitaires/assure";

describe(calculePrecisionResultat, () => {
  describe(Regulation.Incertain, () => {
    const calculePrecisionsResultatIncertain = calculePrecisionResultat(
      Regulation.Incertain,
    );
    it("Renvoie une précision Incertain un résultat Incertain", () => {
      verifieQue(calculePrecisionsResultatIncertain)
        .pour(donneesFormulaireSimulateurVide)
        .renvoieToujours(PrecisionsResultat.Standard);
    });
    it("Renvoie une précision Hors UE pour un résultat Incertain", () => {
      verifieQue(calculePrecisionsResultatIncertain)
        .pour(
          fabriqueDonneesFormulaire({
            appartenancePaysUnionEurpopeenne: ["autre"],
          }),
        )
        .renvoieToujours(PrecisionsResultat.AutrePaysUnionEuropeenne);
    });
  });

  describe(Regulation.Regule, () => {
    const calculePrecisionsResultatRegule = calculePrecisionResultat(
      Regulation.Regule,
    );
    it("Renvoie une précision Regulé Standard par défaut pour un résultat Regulé", () => {
      verifieQue(calculePrecisionsResultatRegule)
        .pour(donneesFormulaireSimulateurVide)
        .renvoieToujours(PrecisionsResultat.Standard);
    });
    it("Precise un résultat DORA", () => {
      const donneesFormulaireSimulateur = fabriqueDonneesFormulaire({
        secteurActivite: ["banqueSecteurBancaire"],
      });
      verifieQue(calculePrecisionsResultatRegule)
        .pour(donneesFormulaireSimulateur)
        .renvoieToujours(PrecisionsResultat.DORA);
    });
    it("Precise un résultat enregistrement nom de domaine", () => {
      const donneesFormulaireSimulateur = fabriqueDonneesFormulaire({
        secteurActivite: ["fournisseursNumeriques"],
        activites: ["registresNomsDomainesPremierNiveau"],
      });
      verifieQue(calculePrecisionsResultatRegule)
        .pour(donneesFormulaireSimulateur)
        .renvoieToujours(PrecisionsResultat.EnregistrementDeNomsDeDomaine);
    });
  });

  describe(Regulation.NonRegule, () => {
    const calculePrecisionsResultatNonRegule = calculePrecisionResultat(
      Regulation.NonRegule,
    );
    it("Precise un résultat enregistrement nom de domaine", () => {
      verifieQue(calculePrecisionsResultatNonRegule)
        .pour(donneesFormulaireSimulateurVide)
        .renvoieToujours(PrecisionsResultat.Standard);
    });
    it("Precise un résultat enregistrement nom de domaine", () => {
      const donneesFormulaireSimulateur = fabriqueDonneesFormulaire({
        appartenancePaysUnionEurpopeenne: ["horsue"],
      });
      verifieQue(calculePrecisionsResultatNonRegule)
        .pour(donneesFormulaireSimulateur)
        .renvoieToujours(PrecisionsResultat.HorsUnionEuropeenne);
    });
  });
});
