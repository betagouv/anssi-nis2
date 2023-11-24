import { IDonneesBrutesFormulaireSimulateur } from "anssi-nis2-domain/src/Simulateur/DonneesFormulaire.ts";
import {
  SecteursAvecSousSecteurs,
  SousSecteurActivite,
} from "../../SousSecteurActivite.definitions.ts";
import { groupementsSecteursParSousSecteurs } from "../../SousSecteurActivite.valeurs.ts";

export const estSousSecteurListe = (sousSecteur?: SousSecteurActivite) =>
  !sousSecteur?.startsWith("autre");
export const estSousSecteurAutre = (sousSecteur?: SousSecteurActivite) =>
  sousSecteur?.startsWith("autre");

export const auMoinsUnSousSecteurListe = (sousSecteur: SousSecteurActivite[]) =>
  sousSecteur.length > 0 && sousSecteur?.some(estSousSecteurListe);
export const uniquementDesSousSecteursAutres = (
  sousSecteur: SousSecteurActivite[]
) => sousSecteur.length > 0 && sousSecteur?.every(estSousSecteurAutre);

export const sousSecteurAppartientASecteur =
  (valeurGroupement: SecteursAvecSousSecteurs) =>
  (donneesFormulaireSimulateur: IDonneesBrutesFormulaireSimulateur) => {
    const donneesSecteursActivite = donneesFormulaireSimulateur[
      "sousSecteurActivite"
    ] as SousSecteurActivite[];
    return donneesSecteursActivite.some((sousSecteur) =>
      groupementsSecteursParSousSecteurs[valeurGroupement].includes(sousSecteur)
    );
  };
