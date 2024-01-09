import { DonneesFormulaireSimulateur } from "../../DonneesFormulaire";
import { ResultatRegulationEntite } from "../../Regulation.definitions";

export type CalculeRegulationOperation = (
  donneesFormulaireSimulateur: DonneesFormulaireSimulateur,
) => ResultatRegulationEntite;