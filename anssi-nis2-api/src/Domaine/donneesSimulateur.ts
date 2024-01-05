import { IDonneesBrutesFormulaireSimulateur } from "anssi-nis2-core/src/Domain/Simulateur/DonneesFormulaire";
import { donneesFormulaireSimulateurVide } from "anssi-nis2-core/src/Domain/Simulateur/DonneesFormulaire.constantes";

export type SimulateurFormData = IDonneesBrutesFormulaireSimulateur;
export const donneesSimulateurVide: IDonneesBrutesFormulaireSimulateur =
  donneesFormulaireSimulateurVide;
