import { causeReguleOSE } from "../Regulation.constantes";
import {
  CausesRegulation,
  Regulation,
  ResultatRegulationPositif,
  TypeEntite,
} from "../Regulation.definitions";

export const fabriqueRegule = (
  causes: CausesRegulation,
  typeEntite: TypeEntite = "EntiteImportante",
): ResultatRegulationPositif => ({
  decision: Regulation.Regule,
  causes,
  typeEntite,
});

export const resultatReguleOSE = fabriqueRegule(
  causeReguleOSE,
  "EntiteEssentielle",
);
