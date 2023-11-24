import { IDonneesBrutesFormulaireSimulateur } from "anssi-nis2-domain/src/Simulateur/DonneesFormulaire";
import { ResultatEligibilite } from "../../Eligibilite.definitions";

export type OperationCalculeEligibilite = (
  donneesFormulaireSimulateur: IDonneesBrutesFormulaireSimulateur,
) => ResultatEligibilite;
