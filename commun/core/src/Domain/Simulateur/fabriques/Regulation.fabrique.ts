import { causeReguleOSE } from "../Regulation.constantes";
import { CausesRegulation, Regulation } from "../Regulation.definitions";

export const fabriqueRegule = (causes: CausesRegulation) => ({
  decision: Regulation.Regule,
  causes,
});

export const resultatReguleOSE = fabriqueRegule(causeReguleOSE);
