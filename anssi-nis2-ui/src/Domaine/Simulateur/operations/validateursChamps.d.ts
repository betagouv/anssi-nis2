import { IDonneesBrutesFormulaireSimulateur } from "../DonneesFormulaire.ts";

export type Validateur = (
  donnees: IDonneesBrutesFormulaireSimulateur,
) => boolean;
export type ValidationReponses = {
  message: string;
  validateur: Validateur;
};
