import {
  SecteursActivites,
  SousSecteursActivites,
  ValeursSousSecteurEnergie,
  ValeursSousSecteurFabrication,
  ValeursSousSecteurTransport,
} from "./ValeursCles.ts";
import { DescriptionSecteur } from "./Secteurs";
import { DonneesFormulaireSimulateur } from "./DonneesFormulaire.ts";

export const ValeursSecteursAvecSousSecteurs = [
  "energie",
  "transports",
  "fabrication",
] as const;
export type SecteursAvecSousSecteurs =
  (typeof ValeursSecteursAvecSousSecteurs)[number];

export type LibellesSousSecteurs = Partial<
  Record<SousSecteursActivites, string>
>;

export const sousSecteursParSecteur: Record<
  Extract<SecteursActivites, SecteursAvecSousSecteurs>,
  DescriptionSecteur
> = {
  energie: ValeursSousSecteurEnergie,
  transports: ValeursSousSecteurTransport,
  fabrication: ValeursSousSecteurFabrication,
};
export const estUnSecteurAvecDesSousSecteurs = (secteur: string) =>
  ValeursSecteursAvecSousSecteurs.includes(secteur as SecteursAvecSousSecteurs);
export const contientSousSecteur = (secteur: string, sousSecteur: string) =>
  sousSecteursParSecteur[secteur as SecteursAvecSousSecteurs].includes(
    sousSecteur,
  );
export const fabriqueSecteurContientLeSousSecteur =
  (secteur: SecteursAvecSousSecteurs) =>
  ([sousSecteur]: [SousSecteursActivites, string]) =>
    estUnSecteurAvecDesSousSecteurs(secteur) &&
    contientSousSecteur(secteur, sousSecteur);
const groupementsSecteursParSousSecteurs: Record<
  SecteursAvecSousSecteurs,
  readonly SousSecteursActivites[]
> = {
  energie: ValeursSousSecteurEnergie,
  transports: ValeursSousSecteurTransport,
  fabrication: ValeursSousSecteurFabrication,
};
export const fabriqueListeChampsPourValeur = (
  valeurGroupement: SecteursAvecSousSecteurs,
) => groupementsSecteursParSousSecteurs[valeurGroupement];
export const sousSecteurAppartientASecteur =
  (valeurGroupement: SecteursAvecSousSecteurs) =>
  (donneesFormulaireSimulateur: DonneesFormulaireSimulateur) => {
    const donneesSecteursActivite = donneesFormulaireSimulateur[
      "sousSecteurActivite"
    ] as SousSecteursActivites[];
    return donneesSecteursActivite.some(
      (sousSecteur) =>
        fabriqueListeChampsPourValeur(valeurGroupement)?.includes(sousSecteur),
    );
  };
