import { IDonneesBrutesFormulaireSimulateur } from "./DonneesFormulaire.ts";
import { SecteurActivite } from "./SecteursActivite";
import { SecteursAvecSousSecteurs, SousSecteurActivite } from "./SousSecteurs";
import {
  contientSousSecteur,
  estUnSecteurAvecDesSousSecteurs,
} from "./operations/operationsSecteurs.ts";

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
