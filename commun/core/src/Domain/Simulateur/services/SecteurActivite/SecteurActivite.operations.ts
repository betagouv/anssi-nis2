import {
  SecteurActivite,
  SecteurComposite,
  SecteurSimple,
} from "../../SecteurActivite.definitions";
import { SousSecteurActivite } from "../../SousSecteurActivite.definitions";
import { sousSecteursParSecteur } from "../../SousSecteurActivite.valeurs";
import {
  contientSousSecteur,
  estUnSecteurAvecDesSousSecteurs,
  estUnSecteurSansSousSecteur,
} from "./SecteurActivite.predicats";

export const fabriqueSecteurContientLeSousSecteur =
  (secteur: SecteurComposite) =>
  ([sousSecteur]: [SousSecteurActivite, string]) =>
    estUnSecteurAvecDesSousSecteurs(secteur) &&
    contientSousSecteur(secteur, sousSecteur);
export const fabriqueTupleSecteurSousSecteurs: (
  secteur: SecteurComposite,
) => [SecteurActivite, Readonly<SousSecteurActivite[]>] = (secteur) => [
  secteur,
  sousSecteursParSecteur[secteur],
];
export const fabriqueTuplesSecteurSousSecteur: (
  secteur: SecteurComposite,
) => [SecteurComposite, SousSecteurActivite][] = (secteur) =>
  sousSecteursParSecteur[secteur].map((sousSecteur) => [secteur, sousSecteur]);
export const fabriqueListePartielleSecteursAvecSousSecteurs = (
  listeSousSecteurs: readonly SousSecteurActivite[],
  secteur: SecteurComposite,
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
) => SecteurSimple[] = (secteursActivite) => {
  if (!secteursActivite || secteursActivite.length === 0) return [];
  return secteursActivite.filter(
    estUnSecteurSansSousSecteur,
  ) as SecteurSimple[];
};
