import { IDonneesBrutesFormulaireSimulateur } from "../../DonneesFormulaire.ts";
import { ResultatEligibilite } from "../../Eligibilite.definitions.ts";

export type OperationCalculeEligibilite = (
  donneesFormulaireSimulateur: IDonneesBrutesFormulaireSimulateur,
) => ResultatEligibilite;
