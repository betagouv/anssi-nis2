import {
  AppartenancePaysUnionEuropeenne,
  DesignationOperateurServicesEssentiels,
  TrancheChiffreAffaire,
  TrancheNombreEmployes,
  TypeStructure,
} from "anssi-nis2-core/src/Domain/Simulateur/ChampsSimulateur.definitions.ts";
import { TypeEtape } from "anssi-nis2-core/src/Domain/Simulateur/InformationsEtape.ts";
import { ActionQuestionnaire } from "./actions.ts";
import { SecteurActivite } from "anssi-nis2-core/src/Domain/Simulateur/SecteurActivite.definitions.ts";
import {
  estSecteurAutre,
  estUnSecteurAvecDesSousSecteurs,
} from "anssi-nis2-core/src/Domain/Simulateur/services/SecteurActivite/SecteurActivite.predicats.ts";
import { SousSecteurActivite } from "anssi-nis2-core/src/Domain/Simulateur/SousSecteurActivite.definitions.ts";

export interface EtatQuestionnaire {
  etapeCourante: TypeEtape;
  designationOperateurServicesEssentiels: DesignationOperateurServicesEssentiels[];
  appartenancePaysUnionEuropeenne: AppartenancePaysUnionEuropeenne[];
  typeStructure: TypeStructure[];
  trancheNombreEmployes: TrancheNombreEmployes[];
  trancheChiffreAffaire: TrancheChiffreAffaire[];
  secteurActivite: SecteurActivite[];
  sousSecteurActivite: SousSecteurActivite[];
}

export const etatParDefaut: EtatQuestionnaire = {
  etapeCourante: "prealable",
  designationOperateurServicesEssentiels: [],
  appartenancePaysUnionEuropeenne: [],
  typeStructure: [],
  trancheNombreEmployes: [],
  trancheChiffreAffaire: [],
  secteurActivite: [],
  sousSecteurActivite: [],
};

export const reducerQuestionnaire = (
  etat: EtatQuestionnaire = etatParDefaut,
  action: ActionQuestionnaire,
): EtatQuestionnaire => {
  switch (action.type) {
    case "VALIDE_ETAPE_PREALABLE":
      return {
        ...etat,
        etapeCourante: "designationOperateurServicesEssentiels",
      };

    case "VALIDE_ETAPE_DESIGNATION":
      return {
        ...etat,
        designationOperateurServicesEssentiels: action.designations,
        etapeCourante: "appartenanceUnionEuropeenne",
      };

    case "VALIDE_ETAPE_APPARTENANCE_UE":
      return {
        ...etat,
        appartenancePaysUnionEuropeenne: action.appartenances,
        etapeCourante: "typeStructure",
      };

    case "VALIDE_ETAPE_TYPE_STRUCTURE":
      return {
        ...etat,
        typeStructure: action.types,
        etapeCourante: "tailleEntitePrivee",
      };

    case "VALIDE_ETAPE_TAILLE_ENTITE_PRIVEE":
      return {
        ...etat,
        trancheNombreEmployes: action.nombreEmployes,
        trancheChiffreAffaire: action.chiffreAffaire,
        etapeCourante: "secteursActivite",
      };

    case "VALIDE_ETAPE_SECTEURS_ACTIVITE":
      return {
        ...etat,
        secteurActivite: action.secteurs,
        etapeCourante: action.secteurs.every(estSecteurAutre)
          ? "resultat"
          : action.secteurs.some(estUnSecteurAvecDesSousSecteurs)
          ? "sousSecteursActivite"
          : "activites",
      };

    case "VALIDE_ETAPE_SOUS_SECTEURS_ACTIVITE":
      return {
        ...etat,
        sousSecteurActivite: action.sousSecteurs,
      };

    case "VIDE":
    default:
      return etat;
  }
};
