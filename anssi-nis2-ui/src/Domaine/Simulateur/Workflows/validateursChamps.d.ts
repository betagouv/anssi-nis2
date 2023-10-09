import { DonneesFormulaireSimulateur } from "../DonneesFormulaire.ts";

export type Validateur = (donnees: DonneesFormulaireSimulateur) => boolean;
export type ValidationReponses = {
  message: string;
  validateur: Validateur;
};