import { IDonneesBrutesFormulaireSimulateur } from "../../DonneesFormulaire";
import { ResultatEligibilite } from "../../Eligibilite.definitions";

export type OperationCalculeEligibilite = (
  donneesFormulaireSimulateur: IDonneesBrutesFormulaireSimulateur,
) => ResultatEligibilite;
