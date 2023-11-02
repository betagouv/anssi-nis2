import { IDonneesBrutesFormulaireSimulateur } from "../../DonneesFormulaire.ts";
import {
  SecteursAvecSousSecteurs,
  SousSecteurActivite,
} from "../../SousSecteurs";
import { groupementsSecteursParSousSecteurs } from "../../ValeursSousSecteursActivites.ts";

export const estSousSecteurListe = (sousSecteur?: SousSecteurActivite) =>
  !sousSecteur?.startsWith("autre");
export const estSousSecteurAutre = (sousSecteur?: SousSecteurActivite) =>
  sousSecteur?.startsWith("autre");

export const sousSecteurAppartientASecteur =
  (valeurGroupement: SecteursAvecSousSecteurs) =>
  (donneesFormulaireSimulateur: IDonneesBrutesFormulaireSimulateur) => {
    const donneesSecteursActivite = donneesFormulaireSimulateur[
      "sousSecteurActivite"
    ] as SousSecteurActivite[];
    return donneesSecteursActivite.some((sousSecteur) =>
      groupementsSecteursParSousSecteurs[valeurGroupement].includes(
        sousSecteur,
      ),
    );
  };
