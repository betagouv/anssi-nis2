import { IDonneesBrutesFormulaireSimulateur } from "../../DonneesFormulaire.ts";
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
  sousSecteur?.some(estSousSecteurListe);
export const aucunSousSecteurListe = (sousSecteur: SousSecteurActivite[]) =>
  !auMoinsUnSousSecteurListe(sousSecteur);

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
