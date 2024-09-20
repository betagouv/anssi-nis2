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
import { SousSecteurActivite } from "anssi-nis2-core/src/Domain/Simulateur/SousSecteurActivite.definitions.ts";
import {
  estSecteurAutre,
  estUnSecteurAvecDesSousSecteurs,
} from "../../../commun/core/src/Domain/Simulateur/services/SecteurActivite/SecteurActivite.predicats.ts";
import { estSousSecteurAutre } from "../../../commun/core/src/Domain/Simulateur/services/SousSecteurActivite/SousSecteurActivite.predicats.ts";
import {
  certains,
  tous,
} from "../../../commun/utils/services/arrays.predicats.ts";
import {
  contientUnParmi,
  ou,
} from "../../../commun/utils/services/commun.predicats.ts";
import { ActionQuestionnaire } from "./actions.ts";
import { ActionUndo } from "./quiSupporteUndo.ts";

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

const contientActiviteFournisseurNumeriquePublic = contientUnParmi(
  "fournisseurReseauxCommunicationElectroniquesPublics",
  "fournisseurServiceCommunicationElectroniquesPublics",
);
const contientUnSecteurTicOuFournisseurNumerique = contientUnParmi(
  "gestionServicesTic",
  "fournisseursNumeriques",
);
const contientActiviteFournisseurServicesNumeriques = contientUnParmi(
  "registresNomsDomainesPremierNiveau",
  "fournisseurServicesDNS",
  "fournisseurServicesInformatiqueNuage",
  "fournisseurServiceCentresDonnees",
  "fournisseurReseauxDiffusionContenu",
);

const vaVers = (
  etape: TypeEtape,
  detailsQuestionnaire?: Partial<EtatQuestionnaire>,
) => ({
  ...detailsQuestionnaire,
  etapeCourante: etape,
});

const valideEtape = (
  action: ActionQuestionnaire | ActionUndo,
  etat: EtatQuestionnaire,
) => {
  switch (action.type) {
    case "VALIDE_ETAPE_PREALABLE":
      return vaVers("designationOperateurServicesEssentiels");

    case "VALIDE_ETAPE_DESIGNATION":
      return vaVers("appartenanceUnionEuropeenne", {
        designationOperateurServicesEssentiels: action.designations,
      });

    case "VALIDE_ETAPE_APPARTENANCE_UE":
      return vaVers("typeStructure", {
        appartenancePaysUnionEuropeenne: action.appartenances,
      });

    case "VALIDE_ETAPE_TYPE_STRUCTURE":
      return vaVers("tailleEntitePrivee", {
        typeStructure: action.types,
      });

    case "VALIDE_ETAPE_TAILLE_ENTITE_PRIVEE":
      return vaVers("secteursActivite", {
        trancheNombreEmployes: action.nombreEmployes,
        trancheChiffreAffaire: action.chiffreAffaire,
      });

    case "VALIDE_ETAPE_SECTEURS_ACTIVITE":
      return vaVers(
        tous(estSecteurAutre)(action.secteurs)
          ? "resultat"
          : certains(estUnSecteurAvecDesSousSecteurs)(action.secteurs)
          ? "sousSecteursActivite"
          : "activites",
        { secteurActivite: action.secteurs },
      );

    case "VALIDE_ETAPE_SOUS_SECTEURS_ACTIVITE":
      return vaVers(
        etat.secteurActivite.every(
          ou(estSecteurAutre, estUnSecteurAvecDesSousSecteurs),
        ) && action.sousSecteurs.every(estSousSecteurAutre)
          ? "resultat"
          : "activites",
        { sousSecteurActivite: action.sousSecteurs },
      );

    case "VALIDE_ETAPE_ACTIVITES":
      return vaVers(
        contientUnSecteurTicOuFournisseurNumerique(etat.secteurActivite) ||
          contientActiviteFournisseurServicesNumeriques(action.activites)
          ? "localisationEtablissementPrincipal"
          : contientActiviteFournisseurNumeriquePublic(action.activites)
          ? "localisationFournitureServicesNumeriques"
          : "resultat",
        { activites: action.activites },
      );

    case "VALIDE_ETAPE_LOCALISATION_ETABLISSEMENT_PRINCIPAL":
      return vaVers("resultat", {
        paysDecisionsCyber: action.paysDecision,
        paysOperationsCyber: action.paysOperation,
        paysPlusGrandNombreSalaries: action.paysSalaries,
      });

    case "VALIDE_ETAPE_LOCALISATION_SERVICES_NUMERIQUES":
      return vaVers("resultat", {
        localisationFournitureServicesNumeriques: action.pays,
      });

    default:
      return {};
  }
};

export const reducerQuestionnaire = (
  etat: EtatQuestionnaire,
  action: ActionQuestionnaire | ActionUndo,
): EtatQuestionnaire => ({
  ...etat,
  ...valideEtape(action, etat),
});
