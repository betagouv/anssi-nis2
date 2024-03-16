import { DonneesFormulaireSimulateur } from "../../../../commun/core/src/Domain/Simulateur/services/DonneesFormulaire/DonneesFormulaire.definitions.ts";

export type PredicatDonneesSimulateurDefinitions = (
  formData: DonneesFormulaireSimulateur,
) => boolean;
