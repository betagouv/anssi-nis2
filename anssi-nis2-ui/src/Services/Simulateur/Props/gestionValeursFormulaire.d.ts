import { IDonneesBrutesFormulaireSimulateur } from "../../../../../anssi-nis2-domain/src/Simulateur/DonneesFormulaire.ts";
import { ValeurChampSimulateur } from "../../../../../anssi-nis2-domain/src/Simulateur/ChampsSimulateur.valeurs.ts";

export type GestionValeursFormulaire = (
  value: ValeurChampSimulateur,
  donneesFormulaire: IDonneesBrutesFormulaireSimulateur,
) => ValeurChampSimulateur[];
