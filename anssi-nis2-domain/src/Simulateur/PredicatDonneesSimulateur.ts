import { IDonneesBrutesFormulaireSimulateur } from "./DonneesFormulaire";

export type PredicatDonneesSimulateur = (
  formData: IDonneesBrutesFormulaireSimulateur,
) => boolean;
