import { IDonneesBrutesFormulaireSimulateur } from "../../../Domaine/Simulateur/DonneesFormulaire.ts";
import { ValeurChampSimulateur } from "../../../Domaine/Simulateur/ValeursChampsSimulateur";

export type GestionValeursFormulaire = (
  value: ValeurChampSimulateur,
  donneesFormulaire: IDonneesBrutesFormulaireSimulateur,
) => ValeurChampSimulateur[];
