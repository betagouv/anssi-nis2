import { DonneesFormulaireSimulateur } from "../DonneesFormulaire/DonneesFormulaire.definitions";
import { FabriqueInformationsStructure } from "../../InformationsStructure.fabrique";
import {
  ReponseEtatAppartenancePaysUnionEuropeenne,
  ReponseEtatDesignationOperateurServicesEssentiels,
  ReponseEtatStructure,
} from "./ReponseEtat.definitions";

export const ConvertisseurDonneesBrutesVersEtatDonneesSimulateur = {
  designationOperateurServicesEssentiels: (
    donnees: DonneesFormulaireSimulateur
  ): ReponseEtatDesignationOperateurServicesEssentiels => ({
    _tag: "DesignationOperateurServicesEssentiels",
    DesignationOperateurServicesEssentiels: {
      designationOperateurServicesEssentiels:
        donnees.designationOperateurServicesEssentiels[0],
    },
  }),

  appartenancePaysUnionEuropeenne: (
    donnees: DonneesFormulaireSimulateur
  ): ReponseEtatAppartenancePaysUnionEuropeenne => ({
    ...ConvertisseurDonneesBrutesVersEtatDonneesSimulateur.designationOperateurServicesEssentiels(
      donnees
    ),
    _tag: "AppartenancePaysUnionEuropeenne",
    AppartenancePaysUnionEuropeenne: {
      appartenancePaysUnionEuropeenne:
        donnees.appartenancePaysUnionEuropeenne[0],
    },
  }),

  structure: (donnees: DonneesFormulaireSimulateur): ReponseEtatStructure => ({
    ...ConvertisseurDonneesBrutesVersEtatDonneesSimulateur.appartenancePaysUnionEuropeenne(
      donnees
    ),
    _tag: "Structure",
    Structure: FabriqueInformationsStructure.structure(donnees),
  }),
};
