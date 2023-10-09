import {
  TValeursSecteursActivites,
  TValeursSousSecteursActivites,
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
export type TValeursSecteursAvecSousSecteurs =
  (typeof ValeursSecteursAvecSousSecteurs)[number];

export type LibellesSousSecteurs = Partial<
  Record<TValeursSousSecteursActivites, string>
>;

export const sousSecteursParSecteur: Record<
  Extract<TValeursSecteursActivites, TValeursSecteursAvecSousSecteurs>,
  DescriptionSecteur
> = {
  energie: ValeursSousSecteurEnergie,
  transports: ValeursSousSecteurTransport,
  fabrication: ValeursSousSecteurFabrication,
};
export const estUnSecteurAvecDesSousSecteurs = (secteur: string) =>
  ValeursSecteursAvecSousSecteurs.includes(
    secteur as TValeursSecteursAvecSousSecteurs,
  );
export const contientSousSecteur = (secteur: string, sousSecteur: string) =>
  sousSecteursParSecteur[secteur as TValeursSecteursAvecSousSecteurs].includes(
    sousSecteur,
  );
export const fabriqueSecteurContientLeSousSecteur =
  (secteur: TValeursSecteursAvecSousSecteurs) =>
  ([sousSecteur]: [TValeursSousSecteursActivites, string]) =>
    estUnSecteurAvecDesSousSecteurs(secteur) &&
    contientSousSecteur(secteur, sousSecteur);
const groupementsSecteursParSousSecteurs: Record<
  TValeursSecteursAvecSousSecteurs,
  readonly TValeursSousSecteursActivites[]
> = {
  energie: ValeursSousSecteurEnergie,
  transports: ValeursSousSecteurTransport,
  fabrication: ValeursSousSecteurFabrication,
};
export const fabriqueListeChampsPourValeur = (
  valeurGroupement: TValeursSecteursAvecSousSecteurs,
) => groupementsSecteursParSousSecteurs[valeurGroupement];
export const sousSecteurAppartientASecteur =
  (valeurGroupement: TValeursSecteursAvecSousSecteurs) =>
  (donneesFormulaireSimulateur: DonneesFormulaireSimulateur) => {
    const donneesSecteursActivite = donneesFormulaireSimulateur[
      "sousSecteurActivite"
    ] as TValeursSousSecteursActivites[];
    return donneesSecteursActivite.some(
      (sousSecteur) =>
        fabriqueListeChampsPourValeur(valeurGroupement)?.includes(sousSecteur),
    );
  };
