import { SecteurActivite } from "./SecteurActivite.definition.ts";
import {
  DescriptionSecteur,
  SecteursAvecSousSecteurs,
  SousSecteurActivite,
} from "./SousSecteurActivite.definition.ts";

export const ValeursSecteursAvecSousSecteurs = [
  "energie",
  "transports",
  "fabrication",
] as const;
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
  "autreSousSecteurTransport",
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
