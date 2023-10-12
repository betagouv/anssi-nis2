import { ValeurChampSimulateur } from "../../../Domaine/Simulateur/ValeursChampsSimulateur.ts";
import { DonneesFormulaireSimulateur } from "../../../Domaine/Simulateur/DonneesFormulaire.ts";

export type GestionValeursFormulaire = (
  value: ValeurChampSimulateur,
  donneesFormulaire: DonneesFormulaireSimulateur,
) => ValeurChampSimulateur[];
