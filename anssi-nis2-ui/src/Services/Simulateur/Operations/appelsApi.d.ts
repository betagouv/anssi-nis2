import { IDonneesBrutesFormulaireSimulateur } from "../../../Domaine/Simulateur/DonneesFormulaire.ts";

export type EnvoieDonneesFormulaire = (
  formData: IDonneesBrutesFormulaireSimulateur,
) => Promise<string>;
