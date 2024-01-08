import { IDonneesBrutesFormulaireSimulateur } from "../DonneesFormulaire";
import { donneesFormulaireSimulateurVide } from "../DonneesFormulaire.constantes";

export const fabriqueDonneesFormulaire = (
  d: Partial<IDonneesBrutesFormulaireSimulateur>
): IDonneesBrutesFormulaireSimulateur => ({
  ...donneesFormulaireSimulateurVide,
  ...d,
});
