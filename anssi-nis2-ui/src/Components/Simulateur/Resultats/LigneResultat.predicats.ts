import {
  Regulation,
  RegulationEntite,
} from "../../../../../commun/core/src/Domain/Simulateur/Regulation.definitions.ts";
import { PrecisionsResultat } from "../../../../../commun/core/src/Domain/Simulateur/Resultat.constantes.ts";
import { PrecisionResultat } from "../../../../../commun/core/src/Domain/Simulateur/Resultat.declarations.ts";

export const estIncertainStandard = (
  regulation: RegulationEntite,
  precision: PrecisionResultat,
) =>
  regulation === Regulation.Incertain &&
  precision === PrecisionsResultat.Standard;
