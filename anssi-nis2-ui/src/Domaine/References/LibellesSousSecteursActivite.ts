import {
  TValeursSousSecteurEnergie,
  TValeursSousSecteurFabrication,
  TValeursSousSecteursActivites,
  TValeursSousSecteurTransport,
} from "../Simulateur/ValeursCles.ts";
import { DetailsSousSecteurUnique } from "../Simulateur/Secteurs";

export const libellesSousSecteursEnergie: DetailsSousSecteurUnique<TValeursSousSecteurEnergie> =
  {
    electricite: "Électricité",
    gaz: "Gaz",
    hydrogene: "Hydrogène",
    petrole: "Pétrole",
    reseauxChaleurFroid: "Réseaux de chaleur et de froid",
    autreSousSecteurEnergie: "Autre sous-secteur",
  };

export const libellesSousSecteurFabrication: DetailsSousSecteurUnique<TValeursSousSecteurFabrication> =
  {
    constructionVehiculesAutomobiles:
      "Construction de véhicules automobiles, remorques et semi- remorques",
    fabricationAutresMaterielTransports:
      "Fabrication d’autres matériels de transport",
    fabricationDispositifsMedicaux:
      "Fabrication de dispositifs médicaux et de dispositifs médicaux de diagnostic in vitro",
    fabricationEquipementsElectroniques:
      "Fabrication de produits informatiques, électroniques et optiques",
    fabricationFabricationProduitsInformatiquesElectroniquesOptiques:
      "Fabrication de produits informatiques, électroniques et optiques",
    fabricationMachinesEquipements:
      "Fabrication de machines et équipements n.c.a.",
    autreSousSecteurFabrication: "Autre sous-secteur",
  };

export const libellesSousSecteurTransports: DetailsSousSecteurUnique<TValeursSousSecteurTransport> =
  {
    transportsAeriens: "Aériens",
    transportsFerroviaires: "Ferroviaires",
    transportsParEau: "Par eau",
    transportsRoutiers: "Routiers",
    autreSousSecteurTransport: "Autre sous-secteur",
  };

export const libellesSousSecteursActivite: Record<
  TValeursSousSecteursActivites,
  string
> = {
  ...libellesSousSecteursEnergie,
  ...libellesSousSecteurFabrication,
  ...libellesSousSecteurTransports,
};
