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
export type DetailsSousSecteurs = Record<
  TValeursSousSecteursActivites,
  DescriptionSousSecteur
>;
export type DetailsSousSecteurUnique<
  T extends
    | TValeursSousSecteurEnergie
    | TValeursSousSecteurFabrication
    | TValeursSousSecteurTransport,
> = Record<T, DescriptionSousSecteur>;

export type DescriptionSecteur = {
  activites: ListeActivites;
  sousSecteurs?:
    | DetailsSousSecteurUnique<TValeursSousSecteurEnergie>
    | DetailsSousSecteurUnique<TValeursSousSecteurFabrication>
    | DetailsSousSecteurUnique<TValeursSousSecteurTransport>;
};
