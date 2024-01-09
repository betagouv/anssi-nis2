import { describe, it } from "vitest";
import { donneesFormulaireSimulateurVide } from "../../src/Domain/Simulateur/DonneesFormulaire.constantes";
import { fabriqueDonneesFormulaire } from "../../src/Domain/Simulateur/fabriques/DonneesFormulaire.fabrique";
import { Regulation } from "../../src/Domain/Simulateur/Regulation.constantes";
import { PrecisionsResultat } from "../../src/Domain/Simulateur/Resultat.constantes";
import { calculePrecisionsResultat } from "../../src/Domain/Simulateur/Resultat.operations";
import { verifieQue } from "../utilitaires/assure";

describe(calculePrecisionsResultat, () => {
  describe(Regulation.Incertain, () => {
    const calculePrecisionsResultatIncertain = calculePrecisionsResultat(
      Regulation.Incertain,
    );
    it("Renvoie une précision Incertain un résultat Incertain", () => {
      verifieQue(calculePrecisionsResultatIncertain)
        .pour(donneesFormulaireSimulateurVide)
        .renvoieToujours(PrecisionsResultat.Incertain);
    });
  });
  
  describe(Regulation.Regule, () => {
    const calculePrecisionsResultatRegule = calculePrecisionsResultat(
      Regulation.Regule,
    );
    it("Renvoie une précision Regulé Standard par défaut pour un résultat Regulé", () => {
      verifieQue(calculePrecisionsResultatRegule)
        .pour(donneesFormulaireSimulateurVide)
        .renvoieToujours(PrecisionsResultat.ReguleStandard);
    });
    it("Precise un résultat DORA", () => {
      const donneesFormulaireSimulateur = fabriqueDonneesFormulaire({
        secteurActivite: ["banqueSecteurBancaire"],
      });
      verifieQue(calculePrecisionsResultatRegule)
        .pour(donneesFormulaireSimulateur)
        .renvoieToujours(PrecisionsResultat.ReguleDORA);
    });
    it("Precise un résultat enregistrement nom de domaine", () => {
      const donneesFormulaireSimulateur = fabriqueDonneesFormulaire({
        secteurActivite: ["fournisseursNumeriques"],
        activites: ["registresNomsDomainesPremierNiveau"],
      });
      verifieQue(calculePrecisionsResultatRegule)
        .pour(donneesFormulaireSimulateur)
        .renvoieToujours(PrecisionsResultat.ReguleEnregistrementNomsDeDomaine);
    });
  });

  describe(Regulation.NonRegule, () => {
    const calculePrecisionsResultatNonRegule = calculePrecisionsResultat(
      Regulation.NonRegule,
    );
    it("Precise un résultat enregistrement nom de domaine", () => {
      verifieQue(calculePrecisionsResultatNonRegule)
        .pour(donneesFormulaireSimulateurVide)
        .renvoieToujours(PrecisionsResultat.NonReguleStandard);
    });
    it("Precise un résultat enregistrement nom de domaine", () => {
      const donneesFormulaireSimulateur = fabriqueDonneesFormulaire({
        etatMembre: ["horsue"],
      });
      verifieQue(calculePrecisionsResultatNonRegule)
        .pour(donneesFormulaireSimulateur)
        .renvoieToujours(PrecisionsResultat.NonReguleHorsUnionEuropeenne);
    });
  });
});
