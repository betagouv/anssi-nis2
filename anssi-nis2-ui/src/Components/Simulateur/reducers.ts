import React, { Reducer } from "react";
import {
  NomsChampsSimulateur,
  DonneesFormulaireSimulateur,
} from "../../Services/Simulateur/donneesFormulaire.ts";
import {
  BoutonsNavigation,
  SimulateurDonneesFormulaireActions,
} from "./props.ts";
import { fieldHandlers } from "./gestionnaires.ts";

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
  console.log(
    `VVV reducerBoutons params = [state=${JSON.stringify(
      state,
    )}, bouton=${bouton}, newHandler=${newHandler}`,
  );
  if (newHandler === undefined) {
    console.log("undef");
    return state;
  }
  console.log("def");
  return { ...state, [bouton]: newHandler };
};
