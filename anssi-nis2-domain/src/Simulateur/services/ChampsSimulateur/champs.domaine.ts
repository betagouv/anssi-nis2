import { IDonneesBrutesFormulaireSimulateur } from "anssi-nis2-domain/src/Simulateur/DonneesFormulaire.ts";

export type PredicatChamp = (
  donnees: IDonneesBrutesFormulaireSimulateur
) => boolean;
export type ValidationReponses = {
  message: string;
  validateur: PredicatChamp;
};
