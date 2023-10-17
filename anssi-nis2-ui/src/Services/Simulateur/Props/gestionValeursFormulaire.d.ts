import { DonneesFormulaireSimulateur } from "../../../Domaine/Simulateur/DonneesFormulaire.ts";
import { ValeurChampSimulateur } from "../../../Domaine/Simulateur/ValeursChampsSimulateur";

export type GestionValeursFormulaire = (
  value: ValeurChampSimulateur,
  donneesFormulaire: DonneesFormulaireSimulateur,
) => ValeurChampSimulateur[];
