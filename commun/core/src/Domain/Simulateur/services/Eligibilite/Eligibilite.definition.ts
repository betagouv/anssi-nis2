import { DonneesFormulaireSimulateur } from "../../DonneesFormulaire";
import { ResultatEligibilite } from "../../Eligibilite.definitions";

export type OperationCalculeEligibilite = (
  donneesFormulaireSimulateur: DonneesFormulaireSimulateur,
) => ResultatEligibilite;
