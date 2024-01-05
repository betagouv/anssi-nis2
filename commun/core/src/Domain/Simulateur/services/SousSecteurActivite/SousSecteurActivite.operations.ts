import { IDonneesBrutesFormulaireSimulateur } from "../../DonneesFormulaire";
import { SecteurActivite } from "../../SecteurActivite.definitions";
import {
  SecteursAvecSousSecteurs,
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
  sousSecteurActivite: SousSecteurActivite[]
) =>
  sousSecteurActivite.filter((sousSecteur) =>
    contientSousSecteur(secteur, sousSecteur)
  );
const extraitSousSecteursOuListeVide = (
  secteur: string,
  sousSecteurActivite: SousSecteurActivite[]
) =>
  estUnSecteurAvecDesSousSecteurs(secteur)
    ? extraitSousSecteurs(
        secteur as SecteursAvecSousSecteurs,
        sousSecteurActivite
      )
    : [];
export const cartographieSousSecteursParSecteur = ({
  secteurActivite,
  sousSecteurActivite,
}: IDonneesBrutesFormulaireSimulateur) =>
  secteurActivite
    .filter(estSecteurListe)
    .reduce<[SecteurActivite, SousSecteurActivite[]][]>(
      (acc, secteur) => [
        ...acc,
        [
          secteur,
          extraitSousSecteursOuListeVide(
            secteur,
            sousSecteurActivite.filter(estSousSecteurListe)
          ),
        ],
      ],
      []
    );
