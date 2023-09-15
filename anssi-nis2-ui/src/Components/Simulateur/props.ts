import { DefaultProps, NativeInputProps } from "../../Props.ts";
import { Dispatch } from "react";
import {
  DonneesFormulaireSimulateur,
  NomsChampsSimulateur,
} from "../../Services/Simulateur/donneesFormulaire.ts";
import { CollectionInformationsEtapes } from "./collectionInformationsEtapes.ts";
import { BoutonsNavigation } from "./boutonsNavigation.ts";
import { SimulateurEtapeNodeComponent } from "./component.ts";

export interface SimulateurContenuEtapeProps extends DefaultProps {
  propageActionSimulateur: Dispatch<SimulateurDonneesFormulaireActions>;
  formData: DonneesFormulaireSimulateur;
}

export interface SimulateurEtapeProps extends DefaultProps {
  listeEtapes: CollectionInformationsEtapes;
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
