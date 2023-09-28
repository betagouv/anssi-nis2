import {
  TValeursSousSecteurEnergie,
  TValeursSousSecteurFabrication,
  TValeursSousSecteursActivites,
  TValeursSousSecteurTransport,
} from "./ValeursCles.ts";
import { DetailsSousSecteurUnique } from "./Secteurs";

export const libellesSousSecteursEnergie: DetailsSousSecteurUnique<TValeursSousSecteurEnergie> =
  {
    electricite: "Électricité",
    gaz: "Gaz",
    hydrogene: "Hydrogène",
    petrole: "Pétrole",
    reseauxChaleurFroid: "Réseaux de chaleur et de froid",
  };

export const libellesSousSecteurFabrication: DetailsSousSecteurUnique<TValeursSousSecteurFabrication> =
  {
    fabricationFabricationProduitsInformatiquesElectroniquesOptiques:
      "Fabrication de produits informatiques, électroniques et optiques",
    constructionVehiculesAutomobiles:
      "Construction de véhicules automobiles, remorques et semi- remorques",
    fabricationAutresMaterielTransports:
      "Fabrication d’autres matériels de transport",
    fabricationDispositifsMedicaux:
      "Fabrication de dispositifs médicaux et de dispositifs médicaux de diagnostic in vitro",
    fabricationEquipementsElectroniques:
      "Fabrication de produits informatiques, électroniques et optiques",
    fabricationMachinesEquipements:
      "Fabrication de machines et équipements n.c.a.",
  };

export const libellesSousSecteurTransports: DetailsSousSecteurUnique<TValeursSousSecteurTransport> =
  {
    transportsAeriens: "Aériens",
    transportsFerroviaires: "Ferroviaires",
    transportsParEau: "Par eau",
    transportsRoutiers: "Routiers",
  };

export const libellesSousSecteursActivite: Record<
  TValeursSousSecteursActivites,
  string
> = {
  ...libellesSousSecteursEnergie,
  ...libellesSousSecteurFabrication,
  ...libellesSousSecteurTransports,
};
