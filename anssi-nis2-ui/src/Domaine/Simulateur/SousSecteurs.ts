import {
  TValeursSecteursActivites,
  TValeursSousSecteursActivites,
  ValeursSousSecteurEnergie,
  ValeursSousSecteurFabrication,
  ValeursSousSecteurTransport,
} from "./ValeursCles.ts";
import { DescriptionSecteur } from "./Secteurs";

export const ValeursSecteursAvecSousSecteurs = [
  "energie",
  "transports",
  "fabrication",
] as const;
export type TValeursSecteursAvecSousSecteurs =
  (typeof ValeursSecteursAvecSousSecteurs)[number];

export type LibellesSousSecteurs = Partial<
  Record<TValeursSousSecteursActivites, string>
>;

export const sousSecteursParSecteur: Record<
  Extract<TValeursSecteursActivites, TValeursSecteursAvecSousSecteurs>,
  DescriptionSecteur
> = {
  energie: ValeursSousSecteurEnergie,
  transports: ValeursSousSecteurTransport,
  fabrication: ValeursSousSecteurFabrication,
};
export const estUnSecteurAvecDesSousSecteurs = (secteur: string) =>
  ValeursSecteursAvecSousSecteurs.includes(
    secteur as TValeursSecteursAvecSousSecteurs,
  );
export const contientSousSecteur = (secteur: string, sousSecteur: string) =>
  sousSecteursParSecteur[secteur as TValeursSecteursAvecSousSecteurs].includes(
    sousSecteur,
  );
export const fabriqueSecteurContientLeSousSecteur =
  (secteur: TValeursSecteursAvecSousSecteurs) =>
  ([sousSecteur]: [TValeursSousSecteursActivites, string]) =>
    estUnSecteurAvecDesSousSecteurs(secteur) &&
    contientSousSecteur(secteur, sousSecteur);
