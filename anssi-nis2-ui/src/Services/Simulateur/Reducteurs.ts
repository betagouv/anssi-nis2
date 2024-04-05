import {
  DonneesFormulaireSimulateur,
  NomsChampsSimulateur,
} from "../../../../commun/core/src/Domain/Simulateur/services/DonneesFormulaire/DonneesFormulaire.definitions.ts";
import React, { Reducer } from "react";
import { ValeurChampSimulateur } from "../../../../commun/core/src/Domain/Simulateur/ChampsSimulateur.definitions.ts";
import { fabriqueDonneesFormulaire } from "../../../../commun/core/src/Domain/Simulateur/services/DonneesFormulaire/DonneesFormulaire.fabrique.ts";
import { gestionnairesPourChamps } from "./gestionnaires.ts";
import { BoutonsNavigation } from "./Props/boutonsNavigation";

import {
  SimulateurDonneesFormulaireActions,
  SimulateurDonneesFormulaireActionType,
} from "./Props/donneesFormulaire";

const fabriqueDonneesFormulaireSimulateurSimple = (
  state: DonneesFormulaireSimulateur,
  name: NomsChampsSimulateur,
  newValue: ValeurChampSimulateur,
) =>
  fabriqueDonneesFormulaire({
    ...state,
    [name]: [newValue],
  });

const fabriqueDonneesFormulaireSimulateurMulti = (
  state: DonneesFormulaireSimulateur,
  name: NomsChampsSimulateur,
  newValue: ValeurChampSimulateur,
) =>
  fabriqueDonneesFormulaire({
    ...state,
    [name]: gestionnairesPourChamps(name)(newValue, state),
  });

const actionsFabriqueDonneesFormulaire: Record<
  SimulateurDonneesFormulaireActionType,
  (
    state: DonneesFormulaireSimulateur,
    name: NomsChampsSimulateur,
    newValue: ValeurChampSimulateur,
  ) => DonneesFormulaireSimulateur
> = {
  checkMulti: fabriqueDonneesFormulaireSimulateurMulti,
  checkSingle: fabriqueDonneesFormulaireSimulateurSimple,
};

export const reduitDonneesFormulaire: Reducer<
  DonneesFormulaireSimulateur,
  SimulateurDonneesFormulaireActions
> = (state, { name, newValue, type }) =>
  actionsFabriqueDonneesFormulaire[type](state, name, newValue);

export type ActionsBoutonNavigation = {
  readonly bouton: "precedent" | "suivant";
  readonly newHandler: React.MouseEventHandler;
};

export const reducerBoutons: Reducer<
  BoutonsNavigation,
  ActionsBoutonNavigation
> = (state, { bouton, newHandler }: ActionsBoutonNavigation) => {
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
