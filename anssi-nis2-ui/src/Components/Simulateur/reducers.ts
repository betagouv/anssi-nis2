import React, { Reducer } from "react";
import {
  SimulateurFieldNames,
  SimulateurFormData,
} from "../../Services/Simulateur/FormData.ts";
import {
  BoutonsNavigation,
  SimulateurDonneesFormulaireActions,
} from "./simulateurProps.ts";
import { fieldHandlers } from "./HandleValue.ts";

const generateNewStateFrom = (
  state: SimulateurFormData,
  fieldName: SimulateurFieldNames,
  newFieldValue: string[],
) => ({ ...state, [fieldName]: newFieldValue });
export const reducerFormData: Reducer<
  SimulateurFormData,
  SimulateurDonneesFormulaireActions
> = (state, { name, newValue, type }) => {
  switch (type) {
    case "checkSingle":
      return generateNewStateFrom(state, name, [newValue]);
    case "checkMulti":
      return generateNewStateFrom(
        state,
        name,
        fieldHandlers[name](newValue, state),
      );
    default:
      throw Error(`Unknown action: ${type}`);
  }
};

export class ActionsBoutonNavigation {
  public readonly action?: "set" | "addBefore";

  constructor(
    public readonly bouton: "precedent" | "suivant",
    public readonly newHandler: React.MouseEventHandler,
    action?: "set" | "addBefore",
  ) {
    this.action = action || "set";
  }
}

export const reducerBoutons: Reducer<
  BoutonsNavigation,
  ActionsBoutonNavigation
> = (state, { bouton, newHandler }) => {
  if (newHandler === undefined)
    throw Error(`Handler can't be undefined for button "${bouton}"`);
  return { ...state, [bouton]: newHandler };
};
