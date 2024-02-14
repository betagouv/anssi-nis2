import {
  SecteurActivite,
  SecteursAvecSousSecteurs,
} from "./SecteurActivite.definitions";
import {
  DescriptionSecteur,
  SousSecteurActivite,
} from "./SousSecteurActivite.definitions";

export const ValeursSousSecteurEnergie = [
  "electricite",
  "gaz",
  "hydrogene",
  "petrole",
  "reseauxChaleurFroid",
  "autreSousSecteurEnergie",
] as const;
export const ValeursSousSecteurTransport = [
  "transportsAeriens",
  "transportsFerroviaires",
  "transportsParEau",
  "transportsRoutiers",
  "autreSousSecteurTransports",
] as const;
export const ValeursSousSecteurFabrication = [
  "fabricationDispositifsMedicaux",
  "fabricationEquipementsElectroniques",
  "fabricationFabricationProduitsInformatiquesElectroniquesOptiques",
  "fabricationMachinesEquipements",
  "constructionVehiculesAutomobiles",
  "fabricationAutresMaterielTransports",
  "autreSousSecteurFabrication",
] as const;

export const ValeursSousSecteursActivites = [
  ...ValeursSousSecteurEnergie,
  ...ValeursSousSecteurFabrication,
  ...ValeursSousSecteurTransport,
] as const;

export const sousSecteursParSecteur: Record<
  Extract<SecteurActivite, SecteursAvecSousSecteurs>,
  DescriptionSecteur
> = {
  energie: ValeursSousSecteurEnergie,
  transports: ValeursSousSecteurTransport,
  fabrication: ValeursSousSecteurFabrication,
};

export const groupementsSecteursParSousSecteurs: Record<
  SecteursAvecSousSecteurs,
  readonly SousSecteurActivite[]
> = {
  energie: ValeursSousSecteurEnergie,
  transports: ValeursSousSecteurTransport,
  fabrication: ValeursSousSecteurFabrication,
};
