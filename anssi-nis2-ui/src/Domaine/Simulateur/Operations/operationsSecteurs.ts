import { DonneesFormulaireSimulateur } from "../DonneesFormulaire.ts";
import {
  SecteursAvecSousSecteurs,
  SousSecteurActivite,
} from "../SousSecteurs.ts";
import {
  groupementsSecteursParSousSecteurs,
  sousSecteursParSecteur,
  ValeursSecteursAvecSousSecteurs,
} from "../ValeursSousSecteursActivites.ts";

export const estUnSecteurAvecDesSousSecteurs = (secteur: string) =>
  ValeursSecteursAvecSousSecteurs.includes(secteur as SecteursAvecSousSecteurs);
export const contientSousSecteur = (
  secteur: string,
  sousSecteur: SousSecteurActivite,
) =>
  sousSecteursParSecteur[secteur as SecteursAvecSousSecteurs].includes(
    sousSecteur,
  );
export const fabriqueSecteurContientLeSousSecteur =
  (secteur: SecteursAvecSousSecteurs) =>
  ([sousSecteur]: [SousSecteurActivite, string]) =>
    estUnSecteurAvecDesSousSecteurs(secteur) &&
    contientSousSecteur(secteur, sousSecteur);
export const fabriqueListeChampsPourValeur = (
  valeurGroupement: SecteursAvecSousSecteurs,
) => groupementsSecteursParSousSecteurs[valeurGroupement];
export const sousSecteurAppartientASecteur =
  (valeurGroupement: SecteursAvecSousSecteurs) =>
  (donneesFormulaireSimulateur: DonneesFormulaireSimulateur) => {
    const donneesSecteursActivite = donneesFormulaireSimulateur[
      "sousSecteurActivite"
    ] as SousSecteurActivite[];
    return donneesSecteursActivite.some(
      (sousSecteur) =>
        fabriqueListeChampsPourValeur(valeurGroupement)?.includes(sousSecteur),
    );
  };
