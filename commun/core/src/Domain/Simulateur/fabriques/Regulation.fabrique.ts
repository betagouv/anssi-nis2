import { DonneesFormulaireSimulateur } from "../DonneesFormulaire";
import { causeReguleOSE, Regulation } from "../Regulation.constantes";
import { CausesRegulation } from "../Regulation.definitions";

export const fabriqueRegule =
  (causes: CausesRegulation) => (donnees: DonneesFormulaireSimulateur) => ({
    decision: Regulation.Regule,
    causes,
    donnees,
  });

export const fabriqueReguleOSE = fabriqueRegule(causeReguleOSE);
