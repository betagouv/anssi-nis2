import { DonneesFormulaireSimulateur } from "../../DonneesFormulaire.definitions";
import {
  SecteurActivite,
  SecteursAvecSousSecteurs,
} from "../../SecteurActivite.definitions";
import {
  EnrSecteurSousSecteur,
  SousSecteurActivite,
} from "../../SousSecteurActivite.definitions";
import {
  contientSousSecteur,
  estSecteurListe,
  estUnSecteurAvecDesSousSecteurs,
} from "../SecteurActivite/SecteurActivite.predicats";
import { estSousSecteurListe } from "./SousSecteurActivite.predicats";

const extraitSousSecteurs = (
  secteur: SecteursAvecSousSecteurs,
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
    ? extraitSousSecteurs(
        secteur as SecteursAvecSousSecteurs,
        sousSecteurActivite,
      )
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
