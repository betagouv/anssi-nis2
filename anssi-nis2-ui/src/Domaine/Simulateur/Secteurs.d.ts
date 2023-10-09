import {
  SousSecteurEnergie,
  SousSecteurFabrication,
  SousSecteurTransport,
} from "./ValeursCles.ts";

export type DetailsSousSecteurUnique<
  T extends SousSecteurEnergie | SousSecteurFabrication | SousSecteurTransport,
> = Record<T, string>;

export type DescriptionSecteur =
  | ValeursSousSecteurEnergie
  | ValeursSousSecteurFabrication
  | ValeursSousSecteurTransport;
