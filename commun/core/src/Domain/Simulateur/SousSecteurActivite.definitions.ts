import {
  SecteurActivite,
  SecteursAvecSousSecteurs,
} from "./SecteurActivite.definitions";
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

export type SousSecteurDe<S extends SecteursAvecSousSecteurs> =
  S extends "energie"
    ? SousSecteurEnergie
    : S extends "fabrication"
      ? SousSecteurFabrication
      : S extends "transports"
        ? SousSecteurTransport
        : never;

export type SousSecteurAutre = Extract<
  SousSecteurActivite,
  | "autreSousSecteurEnergie"
  | "autreSousSecteurFabrication"
  | "autreSousSecteurTransports"
>;
export type SousSecteurListe = Omit<
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
