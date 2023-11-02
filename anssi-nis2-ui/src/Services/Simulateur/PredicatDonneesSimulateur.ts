import { IDonneesBrutesFormulaireSimulateur } from "../../Domaine/Simulateur/DonneesFormulaire.ts";

export type PredicatDonneesSimulateur = (
  formData: IDonneesBrutesFormulaireSimulateur,
) => boolean;
