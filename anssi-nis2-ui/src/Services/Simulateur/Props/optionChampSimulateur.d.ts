import { NativeInputProps } from "../../Props";

import { DescriptionActivite } from "../../../Domaine/Simulateur/Activite.definitions.ts";

export type OptionChampSimulateur = {
  nativeInputProps: NativeInputProps;
  label: string;
  contenuInfobulle?: DescriptionActivite[];
};

export type OptionsChampSimulateur = Array<OptionChampSimulateur>;
export type AttributsEntreeChoixMultiple = {
  legende: string;
  options: OptionChampSimulateur[];
};
