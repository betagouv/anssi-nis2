import { DonneesFormulaireSimulateur } from "../../../Domaine/Simulateur/DonneesFormulaire.ts";

export type EnvoieDonneesFormulaire = (
  formData: DonneesFormulaireSimulateur,
) => Promise<string>;
