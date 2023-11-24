import { IDonneesBrutesFormulaireSimulateur } from "anssi-nis2-domain/src/Simulateur/DonneesFormulaire.ts";
import { ResultatEligibilite } from "../../Eligibilite.definitions.ts";

export type OperationCalculeEligibilite = (
  donneesFormulaireSimulateur: IDonneesBrutesFormulaireSimulateur
) => ResultatEligibilite;
