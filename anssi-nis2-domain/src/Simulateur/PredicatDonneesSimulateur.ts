import { IDonneesBrutesFormulaireSimulateur } from "./DonneesFormulaire.ts";

export type PredicatDonneesSimulateur = (
  formData: IDonneesBrutesFormulaireSimulateur
) => boolean;
