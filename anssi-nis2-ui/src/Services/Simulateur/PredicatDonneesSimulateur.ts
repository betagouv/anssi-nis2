import { IDonneesBrutesFormulaireSimulateur } from "../../../../commun/core/src/Domain/Simulateur/DonneesFormulaire.ts";

export type PredicatDonneesSimulateur = (
  formData: IDonneesBrutesFormulaireSimulateur,
) => boolean;
