import { IDonneesBrutesFormulaireSimulateur } from "../DonneesFormulaire.ts";
import { SecteursAvecSousSecteurs, SousSecteurActivite } from "../SousSecteurs";
import {
  groupementsSecteursParSousSecteurs,
  sousSecteursParSecteur,
  ValeursSecteursAvecSousSecteurs,
} from "../ValeursSousSecteursActivites.ts";
import { SecteurActivite } from "../SecteursActivite";
import { ValeursSecteursActivites } from "../ValeursSecteursActivites.ts";

export const estUnSecteurAvecDesSousSecteurs = (secteur: string) =>
  ValeursSecteursAvecSousSecteurs.includes(secteur as SecteursAvecSousSecteurs);
export const estUnSecteurSansDesSousSecteurs = (secteur: string) => {
  return !ValeursSecteursAvecSousSecteurs?.includes(
    secteur as SecteursAvecSousSecteurs,
  );
};

export const estSecteurListe = (secteur: SecteurActivite) =>
  !secteur.startsWith("autre");

export const estSousSecteurListe = (sousSecteur?: SousSecteurActivite) =>
  !sousSecteur?.startsWith("autre");
export const estSousSecteurAutre = (sousSecteur?: SousSecteurActivite) =>
  sousSecteur?.startsWith("autre");

export const ValeursSecteursSansSousSecteur: SecteurActivite[] =
  ValeursSecteursActivites.filter(estUnSecteurSansDesSousSecteurs);
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
export const fabriqueTupleSecteurSousSecteurs: (
  secteur: SecteursAvecSousSecteurs,
) => [SecteurActivite, Readonly<SousSecteurActivite[]>] = (secteur) => [
  secteur,
  sousSecteursParSecteur[secteur],
];

export function listePartielleSecteursAvecSousSecteurs(
  listeSousSecteurs: readonly SousSecteurActivite[],
  secteur: SecteursAvecSousSecteurs,
): {
  secteur: SecteurActivite;
  sousSecteur: SousSecteurActivite;
}[] {
  return listeSousSecteurs.map((sousSecteur) => ({
    secteur: secteur,
    sousSecteur: sousSecteur,
  }));
}
