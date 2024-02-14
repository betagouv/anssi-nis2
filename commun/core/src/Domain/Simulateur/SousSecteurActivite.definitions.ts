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

export type SousSecteurAutre = Extract<
  SousSecteurActivite,
  | "autreSousSecteurEnergie"
  | "autreSousSecteurFabrication"
  | "autreSousSecteurTransports"
>;
export type LibellesSousSecteurs = Partial<Record<SousSecteurActivite, string>>;
export type DescriptionSecteur = readonly SousSecteurActivite[];
export type DetailsSousSecteurUnique<
  T extends SousSecteurEnergie | SousSecteurFabrication | SousSecteurTransport,
> = Record<T, string>;
export type EnrSecteurSousSecteur = {
  secteur: SecteurActivite;
  sousSecteur?: SousSecteurActivite;
};
