import { SecteurActivite } from "../../SecteurActivite.definitions";
import {
  SecteursAvecSousSecteurs,
  SecteursSansSousSecteur,
  SousSecteurActivite,
} from "../../SousSecteurActivite.definitions";
import { sousSecteursParSecteur } from "../../SousSecteurActivite.valeurs";
import {
  contientSousSecteur,
  estUnSecteurAvecDesSousSecteurs,
  estUnSecteurSansSousSecteur,
} from "./SecteurActivite.predicats";

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
