import { DonneesFormulaireSimulateur } from "../../DonneesFormulaire.definitions";
import { ResultatRegulationEntite } from "../../Regulation.definitions";

export type CalculeRegulationOperation = (
  donneesFormulaireSimulateur: DonneesFormulaireSimulateur,
) => ResultatRegulationEntite;
