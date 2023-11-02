import { SecteurActivite } from "./SecteurActivite.definitions.ts";
import {
  ValeursSecteursAvecSousSecteurs,
  ValeursSousSecteurEnergie,
  ValeursSousSecteurFabrication,
  ValeursSousSecteurTransport,
} from "./SousSecteurActivite.valeurs.ts";

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
export type LibellesSousSecteurs = Partial<Record<SousSecteurActivite, string>>;
export type DescriptionSecteur = readonly SousSecteurActivite[];
export type DetailsSousSecteurUnique<
  T extends SousSecteurEnergie | SousSecteurFabrication | SousSecteurTransport,
> = Record<T, string>;
export type EnrSecteurSousSecteur = {
  secteur: SecteurActivite;
  sousSecteur?: SousSecteurActivite;
};
