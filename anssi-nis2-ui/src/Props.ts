import React from "react";
import { SimulateurFormData } from "./Services/simulateurFrontServices.ts";

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
export type FormValueHandler = (
  value: string,
  donneesFormulaire: SimulateurFormData,
) => string[];
