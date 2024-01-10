import { describe, it } from "vitest";
import { donneesFormulaireSimulateurVide } from "../../src/Domain/Simulateur/DonneesFormulaire.constantes";
import { fabriqueDonneesFormulaire } from "../../src/Domain/Simulateur/fabriques/DonneesFormulaire.fabrique";

import { Regulation } from "../../src/Domain/Simulateur/Regulation.definitions";
import { PrecisionsResultatRegulation } from "../../src/Domain/Simulateur/Resultat.constantes";
import { calculePrecisionResultatRegulation } from "../../src/Domain/Simulateur/Resultat.operations";
import { verifieQue } from "../utilitaires/assure";

describe(calculePrecisionResultatRegulation, () => {
  describe(Regulation.Incertain, () => {
    const calculePrecisionsResultatIncertain =
      calculePrecisionResultatRegulation(Regulation.Incertain);
    it("Renvoie une précision Incertain un résultat Incertain", () => {
      verifieQue(calculePrecisionsResultatIncertain)
        .pour(donneesFormulaireSimulateurVide)
        .renvoieToujours(PrecisionsResultatRegulation.IncertainStandard);
    });
  });

  describe(Regulation.Regule, () => {
    const calculePrecisionsResultatRegule = calculePrecisionResultatRegulation(
      Regulation.Regule
    );
    it("Renvoie une précision Regulé Standard par défaut pour un résultat Regulé", () => {
      verifieQue(calculePrecisionsResultatRegule)
        .pour(donneesFormulaireSimulateurVide)
        .renvoieToujours(PrecisionsResultatRegulation.ReguleStandard);
    });
    it("Precise un résultat DORA", () => {
      const donneesFormulaireSimulateur = fabriqueDonneesFormulaire({
        secteurActivite: ["banqueSecteurBancaire"],
      });
      verifieQue(calculePrecisionsResultatRegule)
        .pour(donneesFormulaireSimulateur)
        .renvoieToujours(PrecisionsResultatRegulation.ReguleDORA);
    });
    it("Precise un résultat enregistrement nom de domaine", () => {
      const donneesFormulaireSimulateur = fabriqueDonneesFormulaire({
        secteurActivite: ["fournisseursNumeriques"],
        activites: ["registresNomsDomainesPremierNiveau"],
      });
      verifieQue(calculePrecisionsResultatRegule)
        .pour(donneesFormulaireSimulateur)
        .renvoieToujours(
          PrecisionsResultatRegulation.ReguleEnregistrementDeNomsDeDomaine
        );
    });
  });

  describe(Regulation.NonRegule, () => {
    const calculePrecisionsResultatNonRegule =
      calculePrecisionResultatRegulation(Regulation.NonRegule);
    it("Precise un résultat enregistrement nom de domaine", () => {
      verifieQue(calculePrecisionsResultatNonRegule)
        .pour(donneesFormulaireSimulateurVide)
        .renvoieToujours(PrecisionsResultatRegulation.NonReguleStandard);
    });
    it("Precise un résultat enregistrement nom de domaine", () => {
      const donneesFormulaireSimulateur = fabriqueDonneesFormulaire({
        etatMembre: ["horsue"],
      });
      verifieQue(calculePrecisionsResultatNonRegule)
        .pour(donneesFormulaireSimulateur)
        .renvoieToujours(
          PrecisionsResultatRegulation.NonReguleHorsUnionEuropeenne
        );
    });
  });
});
