import { IDonneesBrutesFormulaireSimulateur } from "../../../Domaine/Simulateur/DonneesFormulaire.definitions.ts";
import { ValeurChampSimulateur } from "../../../Domaine/Simulateur/ChampsSimulateur.valeurs.ts";

export type GestionValeursFormulaire = (
  value: ValeurChampSimulateur,
  donneesFormulaire: IDonneesBrutesFormulaireSimulateur,
) => ValeurChampSimulateur[];
