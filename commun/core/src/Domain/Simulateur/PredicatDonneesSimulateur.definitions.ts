import { DonneesFormulaireSimulateur } from "./services/DonneesFormulaire/DonneesFormulaire.definitions";

export type PredicatDonneesSimulateurDefinitions = (
  formData: DonneesFormulaireSimulateur,
) => boolean;
