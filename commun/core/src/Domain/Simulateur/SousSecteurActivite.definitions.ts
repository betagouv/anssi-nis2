import { SecteurActivite } from "./SecteurActivite.definitions";
import {
  ValeursSecteursAvecSousSecteurs,
  ValeursSousSecteurEnergie,
  ValeursSousSecteurFabrication,
  ValeursSousSecteurTransport,
} from "./SousSecteurActivite.valeurs";

export type SecteursAvecSousSecteurs =
  (typeof ValeursSecteursAvecSousSecteurs)[number];
export type SousSecteurEnergie = (typeof ValeursSousSecteurEnergie)[number];
export type SousSecteurTransport = (typeof ValeursSousSecteurTransport)[number];
export type SousSecteurFabrication =
  (typeof ValeursSousSecteurFabrication)[number];
export type SousSecteurActivite =
  | SousSecteurEnergie
  | SousSecteurTransport
  | SousSecteurFabrication;

export type SecteursSansSousSecteur = Exclude<
  SecteurActivite,
  SecteursAvecSousSecteurs
>;
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
export type SousSecteurAutrePour<S extends SecteursAvecSousSecteurs> =
  `autreSousSecteur${Capitalize<S>}`;
