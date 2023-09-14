import { DefaultProps, NativeInputProps } from "../../Props.ts";
import React, { Dispatch } from "react";
import {
  NomsChampsSimulateur,
  DonneesFormulaireSimulateur,
} from "../../Services/Simulateur/donneesFormulaire.ts";
import { CollectionInformationsEtapes } from "./collectionInformationsEtapes.ts";

export interface SimulateurContenuEtapeProps extends DefaultProps {
  propageActionSimulateur: Dispatch<SimulateurDonneesFormulaireActions>;
  formData: DonneesFormulaireSimulateur;
}

export type BoutonsNavigation = {
  precedent: React.MouseEventHandler;
  suivant: React.MouseEventHandler;
};

export interface SimulateurEtapeProps extends DefaultProps {
  listeEtapes: CollectionInformationsEtapes;
}

export interface SimulateurEtapeRenderedProps extends SimulateurEtapeProps {
  propageActionSimulateur: Dispatch<SimulateurDonneesFormulaireActions>;
  gereClickBouton: BoutonsNavigation;
  formData: DonneesFormulaireSimulateur;
  numeroEtapeCourante: number;
}

export interface SimulateurEtapeSwitcherProps extends SimulateurEtapeProps {}

type SimulateurDonneesFormulaireActionType = "checkSingle" | "checkMulti";
export type SimulateurDonneesFormulaireActions = {
  type: SimulateurDonneesFormulaireActionType;
  name: NomsChampsSimulateur;
  newValue: string;
};
export type ListeOptionsChampFormulaire = {
  nativeInputProps: NativeInputProps;
  label: string;
}[];
