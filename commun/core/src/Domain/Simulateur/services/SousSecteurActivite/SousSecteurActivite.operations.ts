import { SecteurActivite } from "../../SecteurActivite.definitions";
import {
  EnrSecteurSousSecteur,
  PeutEtreSousSecteurActivite,
  SousSecteurActivite,
} from "../../SousSecteurActivite.definitions";
import { fabriqueTuplesSecteurSousSecteur } from "../SecteurActivite/SecteurActivite.operations";
import {
  estSecteurNeNecessitantPasLocalisationRepresentant,
  estUnSecteurAvecDesSousSecteurs,
} from "../SecteurActivite/SecteurActivite.predicats";
import {
  estSousSecteur,
  estSousSecteurListe,
} from "./SousSecteurActivite.predicats";
import { sousSecteursParSecteur } from "../../SousSecteurActivite.valeurs";

export const extraitCouplesAvecSecteurUniques = (
  couplesSecteurSousSecteur: EnrSecteurSousSecteur[]
) =>
  Array.from(
    couplesSecteurSousSecteur.reduce(
      (listeSecteurs, couple) => listeSecteurs.add(couple.secteur),
      new Set<SecteurActivite>()
    )
  );
export const extraitSousSecteursDesCouples = (
  couplesSecteurSousSecteur: EnrSecteurSousSecteur[]
) =>
  Array.from(
    couplesSecteurSousSecteur.reduce(
      (listeSousSecteurs, couple) =>
        couple.sousSecteur
          ? listeSousSecteurs.add(couple.sousSecteur)
          : listeSousSecteurs,
      new Set<SousSecteurActivite>()
    )
  ).filter((sousSecteur) => sousSecteur !== undefined);
const fabriqueTupleSectoriel = (
  secteur: SecteurActivite
): [SecteurActivite, PeutEtreSousSecteurActivite][] =>
  estUnSecteurAvecDesSousSecteurs(secteur)
    ? fabriqueTuplesSecteurSousSecteur(secteur)
    : [[secteur, "PasDeSousSecteurActivite"]];
const accumuleTuplesSecteurs = (
  acc: [SecteurActivite, PeutEtreSousSecteurActivite][],
  secteur: SecteurActivite
): [SecteurActivite, PeutEtreSousSecteurActivite][] => [
  ...acc,
  ...fabriqueTupleSectoriel(secteur),
];
export const filtreValsursSecteursInutiles = (
  listeSecteurs: readonly SecteurActivite[]
) =>
  listeSecteurs
    .filter(estSecteurNeNecessitantPasLocalisationRepresentant)
    .reduce(
      accumuleTuplesSecteurs,
      [] as [SecteurActivite, PeutEtreSousSecteurActivite][]
    )
    .filter(
      ([, ssSecteur]) =>
        estSousSecteur(ssSecteur) && estSousSecteurListe(ssSecteur)
    );

export const secteurDe = (recherche: SousSecteurActivite): SecteurActivite => {
  const tupleDuSecteur = Object.entries(sousSecteursParSecteur).find(
    ([, sousSecteurs]) => sousSecteurs.includes(recherche)
  );

  return tupleDuSecteur![0] as SecteurActivite;
};
