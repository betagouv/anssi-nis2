import { DonneesFormulaireSimulateur } from "../../DonneesFormulaire.definitions";
import { ResultatEligibilite } from "../../Eligibilite.definitions";

export type OperationCalculeEligibilite = (
  donneesFormulaireSimulateur: DonneesFormulaireSimulateur,
) => ResultatEligibilite;
