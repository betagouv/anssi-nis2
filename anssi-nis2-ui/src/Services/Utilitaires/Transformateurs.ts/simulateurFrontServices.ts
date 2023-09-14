import { NativeInputProps } from "../../../Props.ts";
import React from "react";
import {
  NomsChampsSimulateur,
  DonneesFormulaireSimulateur,
} from "../../Simulateur/donneesFormulaire.ts";

export type SelectOptions = Array<{
  nativeInputProps: NativeInputProps;
  label: string;
}>;

export type TransformeRecordToSelect<ValeursCles extends string> = (
  valeurs: Record<ValeursCles, string>,
  onChange?: React.ChangeEventHandler<HTMLInputElement>,
  formData?: DonneesFormulaireSimulateur,
  group?: string,
) => SelectOptions;

export const getValueContent = (group: string | undefined, key: string) =>
  group ? `${group}[${key}]` : key;

export type labelGenerator<T extends string> = (
  value: string,
  valeursMetier: Record<T, string>,
) => string;

export const genereTransformateurValeursVersOptions: <T extends string>(
  generateurLabel: labelGenerator<T>,
  name: NomsChampsSimulateur,
) => TransformeRecordToSelect<T> =
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
