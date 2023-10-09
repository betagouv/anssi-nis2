import {
  TValeursSousSecteurEnergie,
  TValeursSousSecteurFabrication,
  TValeursSousSecteurTransport,
} from "./ValeursCles.ts";

export type DetailsSousSecteurUnique<
  T extends
    | TValeursSousSecteurEnergie
    | TValeursSousSecteurFabrication
    | TValeursSousSecteurTransport,
> = Record<T, string>;

export type DescriptionSecteur =
  | ValeursSousSecteurEnergie
  | ValeursSousSecteurFabrication
  | ValeursSousSecteurTransport;
