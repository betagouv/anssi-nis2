import { describe, expect, it } from "vitest";
import { donneesFormulaireSimulateurVide } from "../../src/Domain/Simulateur/DonneesFormulaire.constantes";
import { fabriqueDonneesFormulaire } from "../../src/Domain/Simulateur/fabriques/DonneesFormulaire.fabrique";
import { Regulation } from "../../src/Domain/Simulateur/Regulation.constantes";
import { PrecisionsResultat } from "../../src/Domain/Simulateur/Resultat.constantes";
import { calculePrecisionsResultat } from "../../src/Domain/Simulateur/Resultat.operations";

describe(calculePrecisionsResultat, () => {
  describe(Regulation.Incertain, () => {
    it("Renvoie une précision Incertain un résultat Incertain", () => {
      expect(
        calculePrecisionsResultat(Regulation.Incertain)(
          donneesFormulaireSimulateurVide,
        ),
      ).toEqual(PrecisionsResultat.Incertain);
    });
  });
  describe(Regulation.Regule, () => {
    it("Renvoie une précision Regulé Standard par défaut pour un résultat Regulé", () => {
      expect(
        calculePrecisionsResultat(Regulation.Regule)(
          donneesFormulaireSimulateurVide,
        ),
      ).toEqual(PrecisionsResultat.ReguleStandard);
    });
    it("Precise un résultat DORA", () => {
      expect(
        calculePrecisionsResultat(Regulation.Regule)(
          fabriqueDonneesFormulaire({
            secteurActivite: ["banqueSecteurBancaire"],
          }),
        ),
      ).toEqual(PrecisionsResultat.ReguleDORA);
    });
    it("Precise un résultat enregistrement nom de domaine", () => {
      expect(
        calculePrecisionsResultat(Regulation.Regule)(
          fabriqueDonneesFormulaire({
            secteurActivite: ["fournisseursNumeriques"],
            activites: ["registresNomsDomainesPremierNiveau"],
          }),
        ),
      ).toEqual(PrecisionsResultat.ReguleEnregistrementNomsDeDomaine);
    });
  });
  describe(Regulation.NonRegule, () => {
    it("Precise un résultat enregistrement nom de domaine", () => {
      expect(
        calculePrecisionsResultat(Regulation.NonRegule)(
          fabriqueDonneesFormulaire(donneesFormulaireSimulateurVide),
        ),
      ).toEqual(PrecisionsResultat.NonReguleStandard);
    });
    it("Precise un résultat enregistrement nom de domaine", () => {
      expect(
        calculePrecisionsResultat(Regulation.NonRegule)(
          fabriqueDonneesFormulaire({ etatMembre: ["horsue"] }),
        ),
      ).toEqual(PrecisionsResultat.NonReguleHorsUnionEuropeenne);
    });
  });
});
