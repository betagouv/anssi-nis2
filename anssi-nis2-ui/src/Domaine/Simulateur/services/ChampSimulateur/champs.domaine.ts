import { IDonneesBrutesFormulaireSimulateur } from "../../DonneesFormulaire.ts";

export type PredicatChamp = (
  donnees: IDonneesBrutesFormulaireSimulateur,
) => boolean;
export type ValidationReponses = {
  message: string;
  validateur: PredicatChamp;
};
