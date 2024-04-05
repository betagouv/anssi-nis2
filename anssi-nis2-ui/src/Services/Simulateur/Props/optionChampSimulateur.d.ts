import { NativeInputProps } from "../../Props";

import { DescriptionActivite } from "../../../Domaine/Simulateur/Activite.definitions.ts";
import { ValeurChampSimulateur } from "../../../Domaine/Simulateur/ChampsSimulateur.definitions.ts";

export type OptionChampSimulateur = {
  nativeInputProps: NativeInputProps;
  label: string | ValeurChampSimulateur;
  contenuInfobulle?: DescriptionActivite[];
};

export type OptionsChampSimulateur = Array<OptionChampSimulateur>;
