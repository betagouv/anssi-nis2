import {
  ActionPrecisionsResultat,
  EtatPrecisionsResultat,
} from "./PrecisionsResultat.declarations.ts";

export const changePropriete = (
  state: EtatPrecisionsResultat,
  action: ActionPrecisionsResultat,
) => ({ ...state, [action.type]: action.value });
