import { causeReguleOSE } from "../Regulation.constantes";
import {
  CausesIncertitude,
  CausesRegulation,
  Regulation,
  ResultatRegulationIncertain,
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

export const fabriqueIncertain = (
  cause: CausesIncertitude,
): ResultatRegulationIncertain => ({
  decision: Regulation.Incertain,
  causes: cause,
});

export const resultatReguleOSE = fabriqueRegule(
  causeReguleOSE,
  "EntiteEssentielle",
);
