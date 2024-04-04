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
import { tous } from "../../../commun/utils/services/arrays.predicats.ts";
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
  etapeCourante: etape,
  ...detailsQuestionnaire,
});
export const reducerQuestionnaire = (
  etat: EtatQuestionnaire,
  actionTraitee: ActionQuestionnaire | ActionUndo,
): EtatQuestionnaire => ({
  ...etat,
  ...match(actionTraitee)
    .with({ type: "VALIDE_ETAPE_PREALABLE" }, () =>
      vaVers("designationOperateurServicesEssentiels"),
    )
    .with({ type: "VALIDE_ETAPE_DESIGNATION" }, (action) =>
      vaVers("appartenanceUnionEuropeenne", {
        designationOperateurServicesEssentiels: action.designations,
      }),
    )
    .with({ type: "VALIDE_ETAPE_APPARTENANCE_UE" }, (action) =>
      vaVers("typeStructure", {
        appartenancePaysUnionEuropeenne: action.appartenances,
      }),
    )
    .with({ type: "VALIDE_ETAPE_TYPE_STRUCTURE" }, (action) =>
      vaVers("tailleEntitePrivee", {
        typeStructure: action.types,
      }),
    )
    .with({ type: "VALIDE_ETAPE_TAILLE_ENTITE_PRIVEE" }, (action) =>
      vaVers("secteursActivite", {
        trancheNombreEmployes: action.nombreEmployes,
        trancheChiffreAffaire: action.chiffreAffaire,
      }),
    )
    .with(
      {
        type: "VALIDE_ETAPE_SECTEURS_ACTIVITE",
        secteurs: P.when(tous(estSecteurAutre)),
      },
      (action) =>
        vaVers("resultat", {
          secteurActivite: action.secteurs,
        }),
    )
    .with(
      {
        type: "VALIDE_ETAPE_SECTEURS_ACTIVITE",
        secteurs: P.when(tous(estUnSecteurAvecDesSousSecteurs)),
      },
      (action) =>
        vaVers("sousSecteursActivite", {
          secteurActivite: action.secteurs,
        }),
    )
    .with(
      {
        type: "VALIDE_ETAPE_SECTEURS_ACTIVITE",
      },
      (action) =>
        vaVers("activites", {
          secteurActivite: action.secteurs,
        }),
    )
    .with({ type: "VALIDE_ETAPE_SOUS_SECTEURS_ACTIVITE" }, (action) =>
      vaVers(
        etat.secteurActivite.every(
          ou(estSecteurAutre, estUnSecteurAvecDesSousSecteurs),
        ) && action.sousSecteurs.every(estSousSecteurAutre)
          ? "resultat"
          : "activites",
        {
          sousSecteurActivite: action.sousSecteurs,
        },
      ),
    )
    .with(
      {
        type: "VALIDE_ETAPE_ACTIVITES",
        activites: P.when(contientActiviteFournisseurNumeriquePublic),
      },
      (action) =>
        vaVers("localisationFournitureServicesNumeriques", {
          activites: action.activites,
        }),
    )
    .with({ type: "VALIDE_ETAPE_ACTIVITES" }, (action) =>
      vaVers(
        contientUnSecteurTicOuFournisseurNumerique(etat.secteurActivite) ||
          contientActiviteFournisseurServicesNumeriques(action.activites)
          ? "localisationEtablissementPrincipal"
          : "resultat",
        {
          activites: action.activites,
        },
      ),
    )
    .with(
      { type: "VALIDE_ETAPE_LOCALISATION_ETABLISSEMENT_PRINCIPAL" },
      (action) =>
        vaVers(
          contientActiviteFournisseurNumeriquePublic(etat.activites)
            ? "localisationFournitureServicesNumeriques"
            : "resultat",
          {
            paysDecisionsCyber: action.paysDecision,
            paysOperationsCyber: action.paysOperation,
            paysPlusGrandNombreSalaries: action.paysSalaries,
          },
        ),
    )
    .with({ type: "VALIDE_ETAPE_LOCALISATION_SERVICES_NUMERIQUES" }, (action) =>
      vaVers(
        contientUnSecteurTicOuFournisseurNumerique(etat.secteurActivite) ||
          contientActiviteFournisseurServicesNumeriques(etat.activites)
          ? "localisationEtablissementPrincipal"
          : "resultat",
        {
          localisationFournitureServicesNumeriques: action.pays,
        },
      ),
    )
    .otherwise(() => {}),
});
