import { IDonneesBrutesFormulaireSimulateur } from "../../../../commun/core/src/Domain/Simulateur/DonneesFormulaire";

export type PredicatDonneesSimulateurDefinitions = (
  formData: IDonneesBrutesFormulaireSimulateur,
) => boolean;
