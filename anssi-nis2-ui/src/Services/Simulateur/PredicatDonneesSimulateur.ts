import { IDonneesBrutesFormulaireSimulateur } from "../../../../anssi-nis2-domain/src/Simulateur/DonneesFormulaire.ts";

export type PredicatDonneesSimulateur = (
  formData: IDonneesBrutesFormulaireSimulateur,
) => boolean;
