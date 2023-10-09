import { DonneesFormulaireSimulateur } from "../../../Domaine/Simulateur/DonneesFormulaire.ts";

export type SendFormData = (
  formData: DonneesFormulaireSimulateur,
) => Promise<string>;
