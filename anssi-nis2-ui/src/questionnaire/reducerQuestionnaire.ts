import { Activite } from "anssi-nis2-core/src/Domain/Simulateur/Activite.definitions.ts";
import {
  AppartenancePaysUnionEuropeenne,
  DesignationOperateurServicesEssentiels,
  TrancheChiffreAffaire,
  TrancheNombreEmployes,
  TypeEntitePublique,
  TypeStructure,
} from "anssi-nis2-core/src/Domain/Simulateur/ChampsSimulateur.definitions.ts";
import { TypeEtape } from "anssi-nis2-core/src/Domain/Simulateur/InformationsEtape.ts";
import { SecteurActivite } from "anssi-nis2-core/src/Domain/Simulateur/SecteurActivite.definitions.ts";
import {
  estSecteurAutre,
  estUnSecteurAvecDesSousSecteurs,
} from "anssi-nis2-core/src/Domain/Simulateur/services/SecteurActivite/SecteurActivite.predicats.ts";
import { estSousSecteurAutre } from "anssi-nis2-core/src/Domain/Simulateur/services/SousSecteurActivite/SousSecteurActivite.predicats.ts";
import { SousSecteurActivite } from "anssi-nis2-core/src/Domain/Simulateur/SousSecteurActivite.definitions.ts";
import { match, P } from "ts-pattern";
import { contientUnParmi } from "../../../commun/utils/services/commun.predicats.ts";
import { ActionQuestionnaire } from "./actions.ts";

export type EtatQuestionnaire = {
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
};

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

export const reducerQuestionnaireMatch = (
  etat: EtatQuestionnaire = etatParDefaut,
  actionTraitee: ActionQuestionnaire,
): EtatQuestionnaire => ({
  ...etat,
  ...match(actionTraitee)
    .with({ type: "VALIDE_ETAPE_PREALABLE" }, () => ({
      etapeCourante: "designationOperateurServicesEssentiels" as TypeEtape,
    }))
    .with({ type: "VALIDE_ETAPE_DESIGNATION" }, (action) => ({
      designationOperateurServicesEssentiels: action.designations,
      etapeCourante: "appartenanceUnionEuropeenne" as TypeEtape,
    }))
    .with({ type: "VALIDE_ETAPE_APPARTENANCE_UE" }, (action) => ({
      appartenancePaysUnionEuropeenne: action.appartenances,
      etapeCourante: "typeStructure" as TypeEtape,
    }))
    .with({ type: "VALIDE_ETAPE_TYPE_STRUCTURE" }, (action) => ({
      typeStructure: action.types,
      etapeCourante: "tailleEntitePrivee" as TypeEtape,
    }))
    .with({ type: "VALIDE_ETAPE_TAILLE_ENTITE_PRIVEE" }, (action) => ({
      trancheNombreEmployes: action.nombreEmployes,
      trancheChiffreAffaire: action.chiffreAffaire,
      etapeCourante: "secteursActivite" as TypeEtape,
    }))
    .with(
      {
        type: "VALIDE_ETAPE_SECTEURS_ACTIVITE",
        secteurs: P.when((s) => s.every(estSecteurAutre)),
      },
      (action) => ({
        secteurActivite: action.secteurs,
        etapeCourante: "resultat" as TypeEtape,
      }),
    )
    .with(
      {
        type: "VALIDE_ETAPE_SECTEURS_ACTIVITE",
        secteurs: P.when((s) => s.every(estUnSecteurAvecDesSousSecteurs)),
      },
      (action) => ({
        secteurActivite: action.secteurs,
        etapeCourante: "sousSecteursActivite" as TypeEtape,
      }),
    )
    .with(
      {
        type: "VALIDE_ETAPE_SECTEURS_ACTIVITE",
      },
      (action) => ({
        secteurActivite: action.secteurs,
        etapeCourante: "activites" as TypeEtape,
      }),
    )
    .with({ type: "VALIDE_ETAPE_SOUS_SECTEURS_ACTIVITE" }, (action) => ({
      sousSecteurActivite: action.sousSecteurs,
      etapeCourante: (etat.secteurActivite.every(estSecteurAutre) &&
      action.sousSecteurs.every(estSousSecteurAutre)
        ? "resultat"
        : "activites") as TypeEtape,
    }))
    .with({ type: "VALIDE_ETAPE_ACTIVITES" }, (action) => {
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
        activites: action.activites,
        etapeCourante: (versEtablissementPrincipal
          ? "localisationEtablissementPrincipal"
          : versFournitureServicesNumeriques
          ? "localisationFournitureServicesNumeriques"
          : "resultat") as TypeEtape,
      };
    })
    .with(
      { type: "VALIDE_ETAPE_LOCALISATION_ETABLISSEMENT_PRINCIPAL" },
      (action) => {
        const versFournitureServicesNumeriques = contientUnParmi(
          ...etat.activites,
        )([
          "fournisseurReseauxCommunicationElectroniquesPublics",
          "fournisseurServiceCommunicationElectroniquesPublics",
        ]);

        return {
          paysDecisionsCyber: action.paysDecision,
          paysOperationsCyber: action.paysOperation,
          paysPlusGrandNombreSalaries: action.paysSalaries,
          etapeCourante: (versFournitureServicesNumeriques
            ? "localisationFournitureServicesNumeriques"
            : "resultat") as TypeEtape,
        };
      },
    )
    .with(
      { type: "VALIDE_ETAPE_LOCALISATION_SERVICES_NUMERIQUES" },
      (action) => {
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
          localisationFournitureServicesNumeriques: action.pays,
          etapeCourante: versEtablissementPrincipal
            ? "localisationEtablissementPrincipal"
            : ("resultat" as TypeEtape),
        };
      },
    )
    .otherwise(() => {}),
});

export const reducerQuestionnaire = reducerQuestionnaireMatch;
