import { NativeInputProps } from "../../../Props.ts";
import React from "react";
import {
  NomsChampsSimulateur,
  DonneesFormulaireSimulateur,
} from "../../Simulateur/donneesFormulaire.ts";

export type TransformeRecordToSelect<ValeursCles extends string> = (
  valeurs: Record<ValeursCles, string>,
  onChange?: React.ChangeEventHandler<HTMLInputElement>,
  formData?: DonneesFormulaireSimulateur,
  group?: string,
) => {
  nativeInputProps: NativeInputProps;
  label: string;
}[];

export const getValueContent = (group: string | undefined, key: string) =>
  group ? `${group}[${key}]` : key;

export type labelGenerator<T extends string> = (
  value: string,
  valeursMetier: Record<T, string>,
) => string;

export const genereTransformateurValeursVersOptions =
  <T extends string>(
    generateurLabel: labelGenerator<T>,
    name: NomsChampsSimulateur,
  ): TransformeRecordToSelect<T> =>
  (valeursMetier, onChange?, formData?, group?) => {
    const selectOptions: Array<{
      nativeInputProps: NativeInputProps;
      label: string;
    }> = [];
    const checkedValue = formData?.[name as NomsChampsSimulateur] || [];
    for (const key in valeursMetier) {
      selectOptions.push();
      selectOptions.push({
        label: generateurLabel(key, valeursMetier),
        nativeInputProps: {
          name: name,
          value: getValueContent(group, key),
          onChange: onChange || (() => {}),
          checked: checkedValue.indexOf(getValueContent(group, key)) !== -1,
        },
      });
    }
    return selectOptions;
  };
