import { DonneesFormulaireSimulateur } from "../../DonneesFormulaire.definitions";
import {
  SecteurActivite,
  SecteurComposite,
} from "../../SecteurActivite.definitions";
import {
  PeutEtreSousSecteurActivite,
  SousSecteurActivite,
  SousSecteurAutre,
} from "../../SousSecteurActivite.definitions";
import { groupementsSecteursParSousSecteurs } from "../../SousSecteurActivite.valeurs";
import { estUnSecteurAvecDesSousSecteurs } from "../SecteurActivite/SecteurActivite.predicats";

export const estSousSecteur = (
  sousSecteur: PeutEtreSousSecteurActivite,
): sousSecteur is SousSecteurActivite =>
  sousSecteur !== "PasDeSousSecteurActivite";
export const estSousSecteurListe = (sousSecteur?: SousSecteurActivite) =>
  !sousSecteur?.startsWith("autre");
export const estSousSecteurAutre = (
  sousSecteur?: SousSecteurActivite,
): sousSecteur is SousSecteurAutre => !!sousSecteur?.startsWith("autre");

export const auMoinsUnSousSecteurListe = (sousSecteur: SousSecteurActivite[]) =>
  !!sousSecteur &&
  sousSecteur.length > 0 &&
  sousSecteur?.some(estSousSecteurListe);
export const uniquementDesSousSecteursAutres = (
  sousSecteur: SousSecteurActivite[],
): sousSecteur is SousSecteurActivite[] =>
  sousSecteur.length > 0 && sousSecteur?.every(estSousSecteurAutre);

export const sousSecteurAppartientASecteur =
  (valeurGroupement: SecteurComposite) =>
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
      groupementsSecteursParSousSecteurs[secteur as SecteurComposite].includes(
        sousSecteur,
      )
    );
  };
