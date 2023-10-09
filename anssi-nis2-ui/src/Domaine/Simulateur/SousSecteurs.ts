import { DonneesFormulaireSimulateur } from "./DonneesFormulaire.ts";
import { SecteursActivites } from "./SecteursActivite";

export const ValeursSecteursAvecSousSecteurs = [
  "energie",
  "transports",
  "fabrication",
] as const;
export type SecteursAvecSousSecteurs =
  (typeof ValeursSecteursAvecSousSecteurs)[number];
export const ValeursSousSecteurEnergie = [
  "electricite",
  "gaz",
  "hydrogene",
  "petrole",
  "reseauxChaleurFroid",
  "autreSousSecteurEnergie",
] as const;
export type SousSecteurEnergie = (typeof ValeursSousSecteurEnergie)[number];
export const ValeursSousSecteurTransport = [
  "transportsAeriens",
  "transportsFerroviaires",
  "transportsParEau",
  "transportsRoutiers",
  "autreSousSecteurTransport",
] as const;
export type SousSecteurTransport = (typeof ValeursSousSecteurTransport)[number];
export const ValeursSousSecteurFabrication = [
  "fabricationDispositifsMedicaux",
  "fabricationEquipementsElectroniques",
  "fabricationFabricationProduitsInformatiquesElectroniquesOptiques",
  "fabricationMachinesEquipements",
  "constructionVehiculesAutomobiles",
  "fabricationAutresMaterielTransports",
  "autreSousSecteurFabrication",
] as const;
export type SousSecteurFabrication =
  (typeof ValeursSousSecteurFabrication)[number];
export type SousSecteursActivites =
  | SousSecteurEnergie
  | SousSecteurTransport
  | SousSecteurFabrication;
export type SecteursSansSousSecteur = Exclude<
  SecteursActivites,
  SecteursAvecSousSecteurs
>;
export type LibellesSousSecteurs = Partial<
  Record<SousSecteursActivites, string>
>;
export type DescriptionSecteur = readonly SousSecteursActivites[];
export const sousSecteursParSecteur: Record<
  Extract<SecteursActivites, SecteursAvecSousSecteurs>,
  DescriptionSecteur
> = {
  energie: ValeursSousSecteurEnergie,
  transports: ValeursSousSecteurTransport,
  fabrication: ValeursSousSecteurFabrication,
};
export const groupementsSecteursParSousSecteurs: Record<
  SecteursAvecSousSecteurs,
  readonly SousSecteursActivites[]
> = {
  energie: ValeursSousSecteurEnergie,
  transports: ValeursSousSecteurTransport,
  fabrication: ValeursSousSecteurFabrication,
};
export type DetailsSousSecteurUnique<
  T extends SousSecteurEnergie | SousSecteurFabrication | SousSecteurTransport,
> = Record<T, string>;
export const estUnSecteurAvecDesSousSecteurs = (secteur: string) =>
  ValeursSecteursAvecSousSecteurs.includes(secteur as SecteursAvecSousSecteurs);
export const contientSousSecteur = (
  secteur: string,
  sousSecteur: SousSecteursActivites,
) =>
  sousSecteursParSecteur[secteur as SecteursAvecSousSecteurs].includes(
    sousSecteur,
  );
export const fabriqueSecteurContientLeSousSecteur =
  (secteur: SecteursAvecSousSecteurs) =>
  ([sousSecteur]: [SousSecteursActivites, string]) =>
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
    ] as SousSecteursActivites[];
    return donneesSecteursActivite.some(
      (sousSecteur) =>
        fabriqueListeChampsPourValeur(valeurGroupement)?.includes(sousSecteur),
    );
  };
