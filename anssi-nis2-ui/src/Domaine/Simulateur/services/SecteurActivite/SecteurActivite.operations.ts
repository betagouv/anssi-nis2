import {
  SecteursAvecSousSecteurs,
  SecteursSansSousSecteur,
  SousSecteurActivite,
} from "../../SousSecteurActivite.definition.ts";
import {
  contientSousSecteur,
  estUnSecteurAvecDesSousSecteurs,
  estUnSecteurSansSousSecteur,
} from "./SecteurActivite.predicats.ts";
import { SecteurActivite } from "../../SecteurActivite.definition.ts";
import { sousSecteursParSecteur } from "../../SousSecteurActivite.valeurs.ts";

export const fabriqueSecteurContientLeSousSecteur =
  (secteur: SecteursAvecSousSecteurs) =>
  ([sousSecteur]: [SousSecteurActivite, string]) =>
    estUnSecteurAvecDesSousSecteurs(secteur) &&
    contientSousSecteur(secteur, sousSecteur);
export const fabriqueTupleSecteurSousSecteurs: (
  secteur: SecteursAvecSousSecteurs,
) => [SecteurActivite, Readonly<SousSecteurActivite[]>] = (secteur) => [
  secteur,
  sousSecteursParSecteur[secteur],
];
export const fabriqueListePartielleSecteursAvecSousSecteurs = (
  listeSousSecteurs: readonly SousSecteurActivite[],
  secteur: SecteursAvecSousSecteurs,
): {
  secteur: SecteurActivite;
  sousSecteur: SousSecteurActivite;
}[] =>
  listeSousSecteurs.map((sousSecteur) => ({
    secteur: secteur,
    sousSecteur: sousSecteur,
  }));
export const filtreSecteursSansSousSecteurs: (
  secteursActivite: SecteurActivite[],
) => SecteursSansSousSecteur[] = (secteursActivite) => {
  if (!secteursActivite || secteursActivite.length === 0) return [];
  return secteursActivite.filter(
    estUnSecteurSansSousSecteur,
  ) as SecteursSansSousSecteur[];
};
