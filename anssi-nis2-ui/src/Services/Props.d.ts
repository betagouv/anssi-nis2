import React from "react";
import { EtatRegulationDefinitif } from "../../../commun/core/src/Domain/Simulateur/services/Eligibilite/EtatRegulation.definitions.ts";

export type Props = {
  className?: string;
};

export type DefaultProps = {
  children?: React.ReactNode;
  className?: string;
  page?: string;
};

export type DefaultComponentExtensible<AdditionalProps extends DefaultProps> = (
  props: AdditionalProps,
) => React.ReactNode;

export type DefaultComponent = DefaultComponentExtensible<DefaultProps>;

export type NativeInputProps = {
  name: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  checked: boolean;
};
export type MatomoProps = DefaultProps & {
  SiteId: number;
  JavascriptContainerHash: string;
  GestionBalises?: boolean;
};
export type PageEditoProps = {
  titre?: string;
} & DefaultProps;
export type RestezInformesProps = DefaultProps & {
  mode?: "complet" | "simple";
};
export type FormulaireRestezInformesProps = RestezInformesProps & {
  setEmailEnregistre: React.Dispatch<boolean>;
};

export type LigneResultatProps = {
  etatRegulation: EtatRegulationDefinitif;
};
