import { DefaultProps, NativeInputProps } from "../Props.ts";
import { Dispatch } from "react";
import {
  DonneesFormulaireSimulateur,
  NomsChampsSimulateur,
} from "../../Domaine/Simulateur/DonneesFormulaire.ts";
import { BoutonsNavigation } from "./boutonsNavigation.ts";
import { EtatEtapes } from "./EtatEtapes.ts";
import { DescriptionActivite } from "../../Domaine/Simulateur/DescriptionActivite.ts";

export interface SimulateurContenuEtapeProps extends DefaultProps {
  propageActionSimulateur: Dispatch<SimulateurDonneesFormulaireActions>;
  formData: DonneesFormulaireSimulateur;
}

export interface SimulateurEtapeProps extends DefaultProps {}

export interface SimulateurEtapeRenderedProps extends SimulateurEtapeProps {
  propageActionSimulateur: Dispatch<SimulateurDonneesFormulaireActions>;
  informationsBoutonsNavigation: BoutonsNavigation;
  donneesFormulaireSimulateur: DonneesFormulaireSimulateur;
  etatEtapes: EtatEtapes;
}

export interface SimulateurEtapeSwitcherProps extends SimulateurEtapeProps {}

type SimulateurDonneesFormulaireActionType = "checkSingle" | "checkMulti";
export type SimulateurDonneesFormulaireActions = {
  type: SimulateurDonneesFormulaireActionType;
  name: NomsChampsSimulateur;
  newValue: string;
};
export type OptionChampSimulateur = {
  nativeInputProps: NativeInputProps;
  label: string;
  contenuInfobulle?: DescriptionActivite[];
};

// TODO: dupliccate with SelectOptions (SelectFrontService)
export type ListeOptionsChampFormulaire = OptionChampSimulateur[];
