import React, { Reducer } from "react";
import {
  DonneesFormulaireSimulateur,
  NomsChampsSimulateur,
} from "./donneesFormulaire.ts";
import { SimulateurDonneesFormulaireActions } from "./props.ts";
import { fieldHandlers } from "./gestionnaires.ts";
import { BoutonsNavigation } from "./boutonsNavigation.ts";

const generateNewStateFrom = (
  state: DonneesFormulaireSimulateur,
  fieldName: NomsChampsSimulateur,
  newFieldValue: string[],
) => ({ ...state, [fieldName]: newFieldValue });
export const reducerFormData: Reducer<
  DonneesFormulaireSimulateur,
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
  if (newHandler === undefined) {
    return state;
  }
  return { ...state, [bouton]: newHandler };
};
export const changeInfobulleOuverte: Reducer<
  {
    id: string;
  },
  string
> = ({ id }, nouvelId) => {
  if (id === nouvelId) return { id: "" };
  return { id: nouvelId };
};
