import { DonneesFormulaireSimulateur } from "../../DonneesFormulaire.definitions";
import { SecteurActivite } from "../../SecteurActivite.definitions";
import {
  SecteursAvecSousSecteurs,
  SousSecteurActivite,
} from "../../SousSecteurActivite.definitions";
import { groupementsSecteursParSousSecteurs } from "../../SousSecteurActivite.valeurs";
import { estUnSecteurAvecDesSousSecteurs } from "../SecteurActivite/SecteurActivite.predicats";

export const estSousSecteurListe = (sousSecteur?: SousSecteurActivite) =>
  !sousSecteur?.startsWith("autre");
export const estSousSecteurAutre = (sousSecteur?: SousSecteurActivite) =>
  sousSecteur?.startsWith("autre");

export const auMoinsUnSousSecteurListe = (sousSecteur: SousSecteurActivite[]) =>
  sousSecteur.length > 0 && sousSecteur?.some(estSousSecteurListe);
export const uniquementDesSousSecteursAutres = (
  sousSecteur: SousSecteurActivite[],
): sousSecteur is SousSecteurActivite[] =>
  sousSecteur.length > 0 && sousSecteur?.every(estSousSecteurAutre);

export const sousSecteurAppartientASecteur =
  (valeurGroupement: SecteursAvecSousSecteurs) =>
  (donneesFormulaireSimulateur: DonneesFormulaireSimulateur) => {
    const donneesSecteursActivite = donneesFormulaireSimulateur[
      "sousSecteurActivite"
    ] as SousSecteurActivite[];
    return donneesSecteursActivite.some((sousSecteur) =>
      groupementsSecteursParSousSecteurs[valeurGroupement].includes(
        sousSecteur,
      ),
    );
  };
export const estDansSecteur =
  (secteur: SecteurActivite) => (sousSecteur: SousSecteurActivite) => {
    return (
      estUnSecteurAvecDesSousSecteurs(secteur) &&
      groupementsSecteursParSousSecteurs[
        secteur as SecteursAvecSousSecteurs
      ].includes(sousSecteur)
    );
  };
