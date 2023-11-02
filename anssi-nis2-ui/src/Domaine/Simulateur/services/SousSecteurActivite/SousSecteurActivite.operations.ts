import {
  SecteursAvecSousSecteurs,
  SousSecteurActivite,
} from "../../SousSecteurActivite.definition.ts";
import {
  contientSousSecteur,
  estUnSecteurAvecDesSousSecteurs,
} from "../SecteurActivite/SecteurActivite.predicats.ts";
import { IDonneesBrutesFormulaireSimulateur } from "../../DonneesFormulaire.ts";
import { SecteurActivite } from "../../SecteurActivite.definition.ts";

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
}: IDonneesBrutesFormulaireSimulateur) =>
  secteurActivite.reduce<[SecteurActivite, SousSecteurActivite[]][]>(
    (acc, secteur) => [
      ...acc,
      [secteur, extraitSousSecteursOuListeVide(secteur, sousSecteurActivite)],
    ],
    [],
  );
