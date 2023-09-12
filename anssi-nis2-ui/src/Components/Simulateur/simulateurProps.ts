import {
  DefaultComponentExtensible,
  DefaultProps,
  NativeInputProps,
} from "../../Props.ts";
import { SimulateurEtapeResult } from "./SimulateurEtapeResult.tsx";
import { SimulateurEtapeForm } from "./SimulateurEtapeForm.tsx";
import {
  SimulateurFieldNames,
  SimulateurFormData,
} from "../../Services/simulateurFrontServices.ts";
import React, { Dispatch } from "react";

export interface SimulateurContenuEtapeProps extends DefaultProps {
  handleChange?: React.ChangeEventHandler<HTMLInputElement>;
  propageActionSimulateur: Dispatch<SimulateurDonneesFormulaireActions>;
  formData: SimulateurFormData;
}

export type SimulateurEtapeNodeComponent =
  DefaultComponentExtensible<SimulateurContenuEtapeProps>;

export type BoutonsNavigation = {
  precedent: React.MouseEventHandler;
  suivant: React.MouseEventHandler;
};

export interface SimulateurEtapeRenderedProps extends SimulateurEtapeProps {
  handleChange: React.ChangeEventHandler<HTMLInputElement>;
  propageActionSimulateur: Dispatch<SimulateurDonneesFormulaireActions>;
  gereClickBouton: BoutonsNavigation;
  formData?: SimulateurFormData;
}

export type SimulateurEtapeRenderedComponent =
  DefaultComponentExtensible<SimulateurEtapeRenderedProps>;

export type InformationsEtape = {
  titre: string;
  elementToRender: SimulateurEtapeRenderedComponent;
};

export class SousEtapeConditionnelle {
  constructor(
    public readonly condition: (formData: SimulateurFormData) => boolean,
    public readonly sousEtape: SimulateurEtapeNodeComponent,
  ) {}
}

export class InformationEtapeForm implements InformationsEtape {
  public readonly elementToRender: SimulateurEtapeRenderedComponent =
    SimulateurEtapeForm;

  public constructor(
    public readonly titre: string,
    public readonly indicationReponses: string,
    public readonly contenu: SimulateurEtapeNodeComponent,
    public readonly sousEtapeConditionnelle?: SousEtapeConditionnelle,
  ) {}
}

export class InformationEtapeResult implements InformationsEtape {
  public readonly elementToRender: SimulateurEtapeRenderedComponent =
    SimulateurEtapeResult;

  public constructor(public readonly titre: string) {}
}

export interface SimulateurEtapeProps extends DefaultProps {
  etapeCourante: number;
  listeEtapes: InformationsEtape[];
}

export type GenerateurSoumissionEtape = (
  limiteConditions: (i: number) => boolean,
  nouvelleEtape: (etape: number) => number,
) => (e: React.MouseEvent) => void;

export interface SimulateurEtapeSwitcherProps extends SimulateurEtapeProps {
  soumissionEtape: GenerateurSoumissionEtape;
}

type SimulateurDonneesFormulaireActionType = "checkSingle" | "checkMulti";
export type SimulateurDonneesFormulaireActions = {
  type: SimulateurDonneesFormulaireActionType;
  name: SimulateurFieldNames;
  newValue: string;
};
export type InputPropsList = {
  nativeInputProps: NativeInputProps;
  label: string;
}[];
