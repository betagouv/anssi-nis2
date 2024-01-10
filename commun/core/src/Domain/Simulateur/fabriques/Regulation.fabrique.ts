import { DonneesFormulaireSimulateur } from "../DonneesFormulaire.definitions";
import { causeReguleOSE } from "../Regulation.constantes";
import { CausesRegulation, Regulation } from "../Regulation.definitions";

export const fabriqueRegule =
  (causes: CausesRegulation) => (donnees: DonneesFormulaireSimulateur) => ({
    decision: Regulation.Regule,
    causes,
    donnees,
  });

export const fabriqueReguleOSE = fabriqueRegule(causeReguleOSE);
