import { DonneesFormulaireSimulateur } from "../../DonneesFormulaire";

export type PredicatChamp = (donnees: DonneesFormulaireSimulateur) => boolean;
export type ValidationReponses = {
  message: string;
  validateur: PredicatChamp;
};
