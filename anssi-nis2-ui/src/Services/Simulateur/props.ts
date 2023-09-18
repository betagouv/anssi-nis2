import { DefaultProps, NativeInputProps } from "../Props.ts";
import { Dispatch } from "react";
import {
  DonneesFormulaireSimulateur,
  NomsChampsSimulateur,
} from "./donneesFormulaire.ts";
import { CollectionInformationsEtapes } from "./CollectionInformationsEtapes.ts";
import { BoutonsNavigation } from "./boutonsNavigation.ts";
import { SimulateurEtapeNodeComponent } from "./component.ts";
import { EtatEtapes } from "./EtatEtapes.ts";

export interface SimulateurContenuEtapeProps extends DefaultProps {
  propageActionSimulateur: Dispatch<SimulateurDonneesFormulaireActions>;
  formData: DonneesFormulaireSimulateur;
}

export interface SimulateurEtapeProps extends DefaultProps {
  etatEtapes: EtatEtapes;
}

export interface SimulateurEtapeRenderedProps extends SimulateurEtapeProps {
  propageActionSimulateur: Dispatch<SimulateurDonneesFormulaireActions>;
  informationsBoutonsNavigation: BoutonsNavigation;
  formData: DonneesFormulaireSimulateur;
  numeroEtapeCourante: number;
  sousEtape?: SimulateurEtapeNodeComponent;
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
