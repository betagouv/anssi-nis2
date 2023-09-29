import { NativeInputProps } from "../Props.ts";
import React from "react";
import {
  NomsChampsSimulateur,
  DonneesFormulaireSimulateur,
} from "./donneesFormulaire.ts";

export type SelectOptions = Array<{
  nativeInputProps: NativeInputProps;
  label: string;
}>;

export type TransformeRecordToSelect<
  ValeursCles extends string,
  Contenu = string,
> = (
  valeurs: Partial<Record<ValeursCles, Contenu>>,
  onChange?: React.ChangeEventHandler<HTMLInputElement>,
  formData?: DonneesFormulaireSimulateur,
  group?: string,
) => SelectOptions;

export const getValueContent = (group: string | undefined, key: string) =>
  group ? `${group}[${key}]` : key;

export type GenerateurLibelle<T extends string, P = string> = (
  value: string,
  valeursMetier: Partial<Record<T, P>>,
) => string;

export const genereTransformateurValeursVersOptions: <
  T extends string,
  P = string,
>(
  generateurLabel: GenerateurLibelle<T, P>,
  name: NomsChampsSimulateur,
) => TransformeRecordToSelect<T, P> =
  (generateurLabel, name) => (valeursMetier, onChange?, formData?, group?) => {
    const selectOptions: SelectOptions = [];
    const checkedValue = formData?.[name as NomsChampsSimulateur] || [];
    for (const key in valeursMetier) {
      const valueContent = getValueContent(group, key);
      const nativeInputProps = {
        name: name,
        value: valueContent,
        onChange: onChange || (() => {}),
        checked: checkedValue.indexOf(valueContent) !== -1,
      };
      selectOptions.push({
        label: generateurLabel(key, valeursMetier),
        nativeInputProps: nativeInputProps,
      });
    }
    return selectOptions;
  };
