import { SecteurActivite } from "./SecteurActivite.definitions";
import {
  ValeursSousSecteurEnergie,
  ValeursSousSecteurFabrication,
  ValeursSousSecteurTransport,
} from "./SousSecteurActivite.valeurs";

export type SousSecteurEnergie = (typeof ValeursSousSecteurEnergie)[number];
export type SousSecteurTransport = (typeof ValeursSousSecteurTransport)[number];
export type SousSecteurFabrication =
  (typeof ValeursSousSecteurFabrication)[number];
export type SousSecteurActivite =
  | SousSecteurEnergie
  | SousSecteurTransport
  | SousSecteurFabrication;

export type PeutEtreSousSecteurActivite =
  | SousSecteurActivite
  | "PasDeSousSecteurActivite";

export type SousSecteurAutre = Extract<
  SousSecteurActivite,
  | "autreSousSecteurEnergie"
  | "autreSousSecteurFabrication"
  | "autreSousSecteurTransports"
>;
export type SousSecteurListes = Exclude<
  SousSecteurActivite,
  | "autreSousSecteurEnergie"
  | "autreSousSecteurFabrication"
  | "autreSousSecteurTransports"
>;
export type DescriptionSecteur = readonly SousSecteurActivite[];
export type DetailsSousSecteurUnique<
  T extends SousSecteurEnergie | SousSecteurFabrication | SousSecteurTransport,
> = Record<T, string>;
export type EnrSecteurSousSecteur = {
  secteur: SecteurActivite;
  sousSecteur?: SousSecteurActivite;
};
