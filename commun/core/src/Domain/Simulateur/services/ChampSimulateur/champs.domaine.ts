import { DonneesFormulaireSimulateur } from "../../DonneesFormulaire.definitions";

export type PredicatDonneesFormulaire<
  T extends DonneesFormulaireSimulateur = DonneesFormulaireSimulateur,
> = (donnees: T) => boolean;

export type ValidationReponses = {
  message: string;
  validateur: PredicatDonneesFormulaire;
};
