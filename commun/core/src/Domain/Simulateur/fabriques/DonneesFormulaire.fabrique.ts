import { DonneesFormulaireSimulateur } from "../DonneesFormulaire.definitions";
import { donneesFormulaireSimulateurVide } from "../DonneesFormulaire.constantes";

export const fabriqueDonneesFormulaire = (
  d: Partial<DonneesFormulaireSimulateur>
): DonneesFormulaireSimulateur => ({
  ...donneesFormulaireSimulateurVide,
  ...d,
});
