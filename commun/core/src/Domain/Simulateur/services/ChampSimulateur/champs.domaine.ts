import { IDonneesBrutesFormulaireSimulateur } from "../../DonneesFormulaire";

export type PredicatChamp = (
  donnees: IDonneesBrutesFormulaireSimulateur
) => boolean;
export type ValidationReponses = {
  message: string;
  validateur: PredicatChamp;
};
