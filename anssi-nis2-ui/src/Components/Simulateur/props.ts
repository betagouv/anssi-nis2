import {
  DefaultComponentExtensible,
  DefaultProps,
  NativeInputProps,
} from "../../Props.ts";
import { SimulateurEtapeResult } from "./SimulateurEtapeResult.tsx";
import { SimulateurEtapeForm } from "./SimulateurEtapeForm.tsx";
import React, { Dispatch } from "react";
import {
  SimulateurFieldNames,
  SimulateurFormData,
} from "../../Services/Simulateur/FormData.ts";

export interface SimulateurContenuEtapeProps extends DefaultProps {
  propageActionSimulateur: Dispatch<SimulateurDonneesFormulaireActions>;
  formData: SimulateurFormData;
}

export type SimulateurEtapeNodeComponent =
  DefaultComponentExtensible<SimulateurContenuEtapeProps>;

export type BoutonsNavigation = {
  precedent: React.MouseEventHandler;
  suivant: React.MouseEventHandler;
};

export interface SimulateurEtapeProps extends DefaultProps {
  listeEtapes: InformationsEtape[];
}

export interface SimulateurEtapeRenderedProps extends SimulateurEtapeProps {
  propageActionSimulateur: Dispatch<SimulateurDonneesFormulaireActions>;
  gereClickBouton: BoutonsNavigation;
  formData: SimulateurFormData;
  numeroEtapeCourante: number;
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

export type GenerateurSoumissionEtape = (
  limiteConditions: (i: number) => boolean,
  nouvelleEtape: (etape: number) => number,
) => (e: React.MouseEvent) => void;

export interface SimulateurEtapeSwitcherProps extends SimulateurEtapeProps {}

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
