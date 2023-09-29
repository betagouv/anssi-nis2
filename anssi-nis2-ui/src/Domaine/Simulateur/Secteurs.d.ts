import {
  TValeursActivites,
  TValeursSousSecteurEnergie,
  TValeursSousSecteurFabrication,
  TValeursSousSecteursActivites,
  TValeursSousSecteurTransport,
} from "./ValeursCles.ts";

export type ListeActivites<T extends TValeursActivites> = Record<T, string>;
export type DescriptionSousSecteur = {
  libelle: string;
  activites: ListeActivites;
};
export type DetailsSousSecteurs = Record<TValeursSousSecteursActivites, string>;
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
