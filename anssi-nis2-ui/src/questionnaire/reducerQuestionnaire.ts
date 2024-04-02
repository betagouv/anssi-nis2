import {
  AppartenancePaysUnionEuropeenne,
  DesignationOperateurServicesEssentiels,
  TrancheChiffreAffaire,
  TrancheNombreEmployes,
  TypeEntitePublique,
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
import { Activite } from "anssi-nis2-core/src/Domain/Simulateur/Activite.definitions.ts";
import { estSousSecteurAutre } from "anssi-nis2-core/src/Domain/Simulateur/services/SousSecteurActivite/SousSecteurActivite.predicats.ts";
import { contientUnParmi } from "../../../commun/utils/services/commun.predicats.ts";

export interface EtatQuestionnaire {
  etapeCourante: TypeEtape;
  designationOperateurServicesEssentiels: DesignationOperateurServicesEssentiels[];
  appartenancePaysUnionEuropeenne: AppartenancePaysUnionEuropeenne[];
  typeStructure: TypeStructure[];
  trancheNombreEmployes: TrancheNombreEmployes[];
  trancheChiffreAffaire: TrancheChiffreAffaire[];
  secteurActivite: SecteurActivite[];
  sousSecteurActivite: SousSecteurActivite[];
  activites: Activite[];
  typeEntitePublique: TypeEntitePublique[];
  localisationFournitureServicesNumeriques: AppartenancePaysUnionEuropeenne[];
  paysDecisionsCyber: AppartenancePaysUnionEuropeenne[];
  paysOperationsCyber: AppartenancePaysUnionEuropeenne[];
  paysPlusGrandNombreSalaries: AppartenancePaysUnionEuropeenne[];
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
  activites: [],
  typeEntitePublique: [],
  localisationFournitureServicesNumeriques: [],
  paysDecisionsCyber: [],
  paysOperationsCyber: [],
  paysPlusGrandNombreSalaries: [],
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
        etapeCourante:
          etat.secteurActivite.every(estSecteurAutre) &&
          action.sousSecteurs.every(estSousSecteurAutre)
            ? "resultat"
            : "activites",
      };

    case "VALIDE_ETAPE_ACTIVITES": {
      const versEtablissementPrincipal =
        contientUnParmi(...etat.secteurActivite)([
          "gestionServicesTic",
          "fournisseursNumeriques",
        ]) ||
        contientUnParmi(...action.activites)([
          "registresNomsDomainesPremierNiveau",
          "fournisseurServicesDNS",
          "fournisseurServicesInformatiqueNuage",
          "fournisseurServiceCentresDonnees",
          "fournisseurReseauxDiffusionContenu",
        ]);

      const versFournitureServicesNumeriques = contientUnParmi(
        ...action.activites,
      )([
        "fournisseurReseauxCommunicationElectroniquesPublics",
        "fournisseurServiceCommunicationElectroniquesPublics",
      ]);

      return {
        ...etat,
        activites: action.activites,
        etapeCourante: versEtablissementPrincipal
          ? "localisationEtablissementPrincipal"
          : versFournitureServicesNumeriques
          ? "localisationFournitureServicesNumeriques"
          : "resultat",
      };
    }

    case "VALIDE_ETAPE_LOCALISATION_ETABLISSEMENT_PRINCIPAL": {
      const versFournitureServicesNumeriques = contientUnParmi(
        ...etat.activites,
      )([
        "fournisseurReseauxCommunicationElectroniquesPublics",
        "fournisseurServiceCommunicationElectroniquesPublics",
      ]);

      return {
        ...etat,
        paysDecisionsCyber: action.paysDecision,
        paysOperationsCyber: action.paysOperation,
        paysPlusGrandNombreSalaries: action.paysSalaries,
        etapeCourante: versFournitureServicesNumeriques
          ? "localisationFournitureServicesNumeriques"
          : "resultat",
      };
    }

    case "VALIDE_ETAPE_LOCALISATION_SERVICES_NUMERIQUES": {
      const versEtablissementPrincipal =
        contientUnParmi(...etat.secteurActivite)([
          "gestionServicesTic",
          "fournisseursNumeriques",
        ]) ||
        contientUnParmi(...etat.activites)([
          "registresNomsDomainesPremierNiveau",
          "fournisseurServicesDNS",
          "fournisseurServicesInformatiqueNuage",
          "fournisseurServiceCentresDonnees",
          "fournisseurReseauxDiffusionContenu",
        ]);

      return {
        ...etat,
        localisationFournitureServicesNumeriques: action.pays,
        etapeCourante: versEtablissementPrincipal
          ? "localisationEtablissementPrincipal"
          : "resultat",
      };
    }
    case "VIDE":
    default:
      return etat;
  }
};
