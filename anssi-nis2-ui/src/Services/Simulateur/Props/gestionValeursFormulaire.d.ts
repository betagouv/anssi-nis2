import { IDonneesBrutesFormulaireSimulateur } from "../../../Domaine/Simulateur/DonneesFormulaire.ts";
import { ValeurChampSimulateur } from "../../../Domaine/Simulateur/ChampsSimulateur.valeurs.ts";

export type GestionValeursFormulaire = (
  value: ValeurChampSimulateur,
  donneesFormulaire: IDonneesBrutesFormulaireSimulateur,
) => ValeurChampSimulateur[];
