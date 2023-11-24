import {
  SecteursAvecSousSecteurs,
  SousSecteurActivite,
} from "../../SousSecteurActivite.definitions.ts";
import {
  contientSousSecteur,
  estSecteurListe,
  estUnSecteurAvecDesSousSecteurs,
} from "../SecteurActivite/SecteurActivite.predicats.ts";
import { IDonneesBrutesFormulaireSimulateur } from "anssi-nis2-domain/src/Simulateur/DonneesFormulaire.ts";
import { SecteurActivite } from "../../SecteurActivite.definitions.ts";
import { estSousSecteurListe } from "./SousSecteurActivite.predicats.ts";

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
