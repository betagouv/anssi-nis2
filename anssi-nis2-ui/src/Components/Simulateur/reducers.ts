import React, { Reducer } from "react";
import {
  SimulateurFieldNames,
  SimulateurFormData,
} from "../../Services/Simulateur/FormData.ts";
import {
  BoutonsNavigation,
  SimulateurDonneesFormulaireActions,
} from "./props.ts";
import { fieldHandlers } from "./gestionnaires.ts";

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
  constructor(
    public readonly bouton: "precedent" | "suivant",
    public readonly newHandler: React.MouseEventHandler,
  ) {}
}

export const reducerBoutons: Reducer<
  BoutonsNavigation,
  ActionsBoutonNavigation
> = (state, { bouton, newHandler }) => {
  if (newHandler === undefined) return state;
  return { ...state, [bouton]: newHandler };
};
