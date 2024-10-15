import {
  DetailsSousSecteurUnique,
  SousSecteurActivite,
  SousSecteurEnergie,
  SousSecteurFabrication,
  SousSecteurTransport,
} from "./SousSecteurActivite.definitions";

export const libellesSousSecteursEnergie: DetailsSousSecteurUnique<SousSecteurEnergie> =
  {
    electricite: "Électricité",
    gaz: "Gaz",
    hydrogene: "Hydrogène",
    petrole: "Pétrole",
    reseauxChaleurFroid: "Réseaux de chaleur et de froid",
    autreSousSecteurEnergie: "Autre sous-secteur",
  };

export const libellesSousSecteurFabrication: DetailsSousSecteurUnique<SousSecteurFabrication> =
  {
    constructionVehiculesAutomobiles:
      "Construction de véhicules automobiles, remorques et semi- remorques",
    fabricationAutresMaterielTransports:
      "Fabrication d'autres matériels de transport",
    fabricationDispositifsMedicaux:
      "Fabrication de dispositifs médicaux et de dispositifs médicaux de diagnostic in vitro",
    fabricationEquipementsElectroniques:
      "Fabrication d'équipements électriques", // Ici, on note une coquille entre le libellé 'électrique' et l'ID 'Electronique'
    fabricationProduitsInformatiquesElectroniquesOptiques:
      "Fabrication de produits informatiques, électroniques et optiques",
    fabricationMachinesEquipements:
      "Fabrication de machines et équipements n.c.a.",
    autreSousSecteurFabrication: "Autre sous-secteur",
  };

export const libellesSousSecteurTransports: DetailsSousSecteurUnique<SousSecteurTransport> =
  {
    transportsAeriens: "Aériens",
    transportsFerroviaires: "Ferroviaires",
    transportsParEau: "Par eau",
    transportsRoutiers: "Routiers",
    autreSousSecteurTransports: "Autre sous-secteur",
  };

export const libellesSousSecteursActivite: Record<SousSecteurActivite, string> =
  {
    ...libellesSousSecteursEnergie,
    ...libellesSousSecteurFabrication,
    ...libellesSousSecteurTransports,
  };
