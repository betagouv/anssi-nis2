import { NativeInputProps } from "../../Props.ts";
import { DescriptionActivite } from "../../../Domaine/Simulateur/DescriptionActivite.ts";

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
