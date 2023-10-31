import { DonneesFormulaireSimulateur } from "../../Domaine/Simulateur/DonneesFormulaire.ts";

export type PredicatDonneesSimulateur = (
  formData: DonneesFormulaireSimulateur,
) => boolean;
