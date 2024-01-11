import { DonneesFormulaireSimulateur } from "../../DonneesFormulaire.definitions";

export type PredicatChamp = (donnees: DonneesFormulaireSimulateur) => boolean;
export type ValidationReponses = {
  message: string;
  validateur: PredicatChamp;
};
