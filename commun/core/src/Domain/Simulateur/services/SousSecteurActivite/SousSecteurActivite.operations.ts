import { DonneesFormulaireSimulateur } from "../DonneesFormulaire/DonneesFormulaire.definitions";
import {
  SecteurActivite,
  SecteurComposite,
} from "../../SecteurActivite.definitions";
import {
  EnrSecteurSousSecteur,
  PeutEtreSousSecteurActivite,
  SousSecteurActivite,
} from "../../SousSecteurActivite.definitions";
import { fabriqueTuplesSecteurSousSecteur } from "../SecteurActivite/SecteurActivite.operations";
import {
  contientSousSecteur,
  estSecteurListe,
  estSecteurNeNecessitantPasLocalisationRepresentant,
  estUnSecteurAvecDesSousSecteurs,
} from "../SecteurActivite/SecteurActivite.predicats";
import {
  estSousSecteur,
  estSousSecteurListe,
} from "./SousSecteurActivite.predicats";

const extraitSousSecteurs = (
  secteur: SecteurComposite,
  sousSecteurActivite: SousSecteurActivite[],
) =>
  sousSecteurActivite.filter((sousSecteur) =>
    contientSousSecteur(secteur, sousSecteur),
  );
const extraitSousSecteursOuListeVide = (
  secteur: string,
  sousSecteurActivite: SousSecteurActivite[],
) =>
  estUnSecteurAvecDesSousSecteurs(secteur)
    ? extraitSousSecteurs(secteur as SecteurComposite, sousSecteurActivite)
    : [];
export const cartographieSousSecteursParSecteur = ({
  secteurActivite,
  sousSecteurActivite,
}: DonneesFormulaireSimulateur) =>
  secteurActivite
    .filter(estSecteurListe)
    .reduce<[SecteurActivite, SousSecteurActivite[]][]>(
      (acc, secteur) => [
        ...acc,
        [
          secteur,
          extraitSousSecteursOuListeVide(
            secteur,
            sousSecteurActivite.filter(estSousSecteurListe),
          ),
        ],
      ],
      [],
    );
export const extraitCouplesAvecSecteurUniques = (
  couplesSecteurSousSecteur: EnrSecteurSousSecteur[],
) =>
  Array.from(
    couplesSecteurSousSecteur.reduce(
      (listeSecteurs, couple) => listeSecteurs.add(couple.secteur),
      new Set<SecteurActivite>(),
    ),
  );
export const extraitSousSecteursDesCouples = (
  couplesSecteurSousSecteur: EnrSecteurSousSecteur[],
) =>
  Array.from(
    couplesSecteurSousSecteur.reduce(
      (listeSousSecteurs, couple) =>
        couple.sousSecteur
          ? listeSousSecteurs.add(couple.sousSecteur)
          : listeSousSecteurs,
      new Set<SousSecteurActivite>(),
    ),
  ).filter((sousSecteur) => sousSecteur !== undefined);
const fabriqueTupleSectoriel = (
  secteur: SecteurActivite,
): [SecteurActivite, PeutEtreSousSecteurActivite][] =>
  estUnSecteurAvecDesSousSecteurs(secteur)
    ? fabriqueTuplesSecteurSousSecteur(secteur)
    : [[secteur, "PasDeSousSecteurActivite"]];
const accumuleTuplesSecteurs = (
  acc: [SecteurActivite, PeutEtreSousSecteurActivite][],
  secteur: SecteurActivite,
): [SecteurActivite, PeutEtreSousSecteurActivite][] => [
  ...acc,
  ...fabriqueTupleSectoriel(secteur),
];
export const filtreValsursSecteursInutiles = (
  listeSecteurs: readonly SecteurActivite[],
) =>
  listeSecteurs
    .filter(estSecteurNeNecessitantPasLocalisationRepresentant)
    .reduce(
      accumuleTuplesSecteurs,
      [] as [SecteurActivite, PeutEtreSousSecteurActivite][],
    )
    .filter(
      ([, ssSecteur]) =>
        estSousSecteur(ssSecteur) && estSousSecteurListe(ssSecteur),
    );
